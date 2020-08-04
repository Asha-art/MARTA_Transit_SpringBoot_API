package com.win.martatransitapi.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import com.win.martatransitapi.model.Bus;
import com.win.martatransitapi.model.BusComparator;
import com.win.martatransitapi.model.BusRequest;
import com.win.martatransitapi.model.DistanceResponse;
import com.win.martatransitapi.model.GeocodingResponse;
import com.win.martatransitapi.model.Location;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class TransitService {
    // add @Value annotations to import everything from application.properties
    @Value("${transit_url}")
    public String transitUrl;

    @Value("${geocoding_url}")
    public String geocodingUrl;

    @Value("${distance_url}")
    public String distanceUrl;

    @Value("${google_api_key}")
    public String googleApiKey;

    private List<Bus> getBuses() {
        RestTemplate restTemplate = new RestTemplate();
        Bus[] buses = restTemplate.getForObject(transitUrl, Bus[].class);
        return Arrays.asList(buses);

    }

    private Location getCoordinates(String description) {
        description = description.replace(" ", "+");
        String url = geocodingUrl + description + "+GA&key=" + googleApiKey;
        RestTemplate restTemplate = new RestTemplate();
        GeocodingResponse response = restTemplate.getForObject(url, GeocodingResponse.class);
        return response.results.get(0).geometry.location;
    }

    // this method use the Distance Matrix API to find the distance between two
    // coordinates
    private double getDistance(Location origin, Location destination) {
        String url = distanceUrl + "origins=" + origin.lat + ", " + origin.lng + "&destinations=" + destination.lat
                + "," + destination.lng + "&key=" + googleApiKey;
        // Since the API returns the distance in meters, we perform a conversion to
        // miles.
        RestTemplate restTemplate = new RestTemplate();
        DistanceResponse response = restTemplate.getForObject(url, DistanceResponse.class);
        return response.rows.get(0).elements.get(0).distance.value * 0.000621371;
    }

    // GetNearbyBuses method ties all of our API calls together to do something
    // useful
    public List<Bus> getNearbyBuses(BusRequest request) {
        List<Bus> allBuses = this.getBuses();
        // it gets the location of the person based on what they pass in through the
        // request object
        Location personLocation = this.getCoordinates(request.address + " " + request.city);
        List<Bus> nearbyBuses = new ArrayList<>();
        // For each bus in the system, we need to determine if it is close to user or
        // not. So, we start by building a Location object from fields in the Bus object
        for (Bus bus : allBuses) {
            Location busLocation = new Location();
            busLocation.lat = bus.LATITUDE;
            busLocation.lng = bus.LONGITUDE;
            // distance comparison between each bus and the user
            double latDistance = Double.parseDouble(busLocation.lat) - Double.parseDouble(personLocation.lat);
            double lngDistance = Double.parseDouble(busLocation.lng) - Double.parseDouble(personLocation.lng);

            if (Math.abs(latDistance) <= 0.02 && Math.abs(lngDistance) <= 0.02) {
                // if actual distance is less than a mile, consider it a nearby bus and add to
                // the list
                double distance = getDistance(busLocation, personLocation);
                if (distance <= 1) {
                    bus.distance = (double) Math.round(distance * 100) / 100;
                    nearbyBuses.add(bus);
                }
            }

        }
        Collections.sort(nearbyBuses, new BusComparator());
        return nearbyBuses;
    }
}
