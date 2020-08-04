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

  for (i = 0; i < busLocations.length; i++) {
    var marker = new google.maps.Marker({
      position: {
        lat: parseFloat(busLocations[i].LATITUDE),
        lng: parseFloat(busLocations[i].LONGITUDE),
      },
      map: map,
      icon: {
        url:
          "https://icon-library.com/images/google-maps-bus-icon/google-maps-bus-icon-14.jpg",
        scaledSize: new google.maps.Size(40, 40), // pixels
      },
      title: "Bus Stop",
    });
  }

  // change pin to bus icon and show user icon

  //*****//
}
