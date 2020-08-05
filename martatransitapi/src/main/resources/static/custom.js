var map;
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: {
      lat: parseFloat(busLocations[0].LATITUDE),
      lng: parseFloat(busLocations[0].LONGITUDE),
    },
    zoom: 15,
    scrollwheel: false,
  });

  /************************ */

  // function attachMessage(marker, contentString){
  // var infowindow = new google.maps.InfoWindow({
  //   content: contentString,
  // });
  /**************************** */

  for (i = 0; i < busLocations.length; i++) {
    // var contentString = "${bus.VEHICLE}";
    var marker = new google.maps.Marker({
      position: {
        lat: parseFloat(busLocations[i].LATITUDE),
        lng: parseFloat(busLocations[i].LONGITUDE),
      },
      map: map,
      icon: {
        url:
          "https://icon-library.com/images/google-maps-bus-icon/google-maps-bus-icon-14.jpg",
        scaledSize: new google.maps.Size(32, 32), // pixels
      },

      title: "Bus Stop",
    });
    for (j = 0; j < contentString.length; j++) {
      attachMessage(marker, contentString);

      function attachMessage(marker, contentString) {
        var infowindow = new google.maps.InfoWindow({
          content: contentString,
        });

        /***************/
        marker.addListener("click", () => {
          infowindow.open(map, marker);
        });
      }
    }
    /******************* */
    // var iconBase = "http://maps.google.com/mapfiles/kml/shapes";

    // var icons = {
    //   busLocations: {
    //     icon: iconBase + "bus.png",
    //   },
    //   person: {
    //     icon: iconBase + "sunny.png",
    //   },
    // };

    // var features = [
    //   {
    //     position: busLocations.ROUTE,
    //     type: "person",
    //   },
    //   {
    //     position: {
    //       lat: parseFloat(busLocations[i].LATITUDE),
    //       lng: parseFloat(busLocations[i].LONGITUDE),
    //       type: "busLocations",
    //     },
    //   },
    // ];

    // for (i = 0; i < busLocations.length; i++) {
    //   var marker = new google.maps.Marker({
    //     position: features[i].position,
    //     icon: icons[features[i].type].icon,
    //     map: map,
    //     title: "Bus Stop",
    //   });

    //var image =
    // "https://developers.google.com/maps/documentation/javascript/examples/full/images/";

    ////////////////
    // const geocoder = new google.maps.Geocoder();
    // const infowindow = new google.maps.InfoWindow();
    // document.getElementById("submit").addEventListener("click", () => {
    //   geocodePlaceId(geocoder, map, infowindow);
    // });
    // function geocodePlaceId(geocoder, map, infowindow) {
    //   const placeId = document.getElementById("address").field;
    //   geocoder.geocode({ placeId: placeId }, (results, status) => {
    //     if (status === "OK") {
    //       if (results[0]) {
    //         map.setZoom(11);
    //         map.setCenter(results[0].geometry.location);
    //         const marker = new google.maps.Marker({
    //           map,
    //           position: results[0].geometry.location,
    //         });
    //         infowindow.setContent(results[0].formatted_address);
    //         infowindow.open(map, marker);
    //       } else {
    //         window.alert("No results found");
    //       }
    //     } else {
    //       window.alert("Geocoder failed due to: " + status);
    //     }
    //   });
    //on click
    // var infowindow = new google.maps.infowindow()
    // ({
    //   content: "${Bus.ROUTE}",
    // });
    // marker.addListener("click", function () {
    //   infowindow.open(map, marker);
    // });

    // change pin to bus icon and show user icon

    //*****//
  }
}
