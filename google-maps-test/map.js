let map;

function initMap() {
  const center = { lat: 40.760780, lng: -111.891045 };
  
  const localContextMapView = new google.maps.localContext.LocalContextMapView({
    element: document.getElementById("map"),
    placeTypePreferences: [{ type: "movie_theater" }], // A list of supported places can be found here: https://developers.google.com/maps/documentation/javascript/local-context/supported-types
    maxPlaceCount: 12,
    directionsOptions: { origin: center },
  });

  map = localContextMapView.map;
  new google.maps.Marker({ position: center, map: map });
  map.setOptions({
    center: center,
    zoom: 16,
  });
}

/** 
Supported place types are
atm
bakery
bank
bar
book_store
cafe
clothing_store
convenience_store
department_store
drugstore
electronics_store
hospital
jewelry_store
movie_theater
night_club
park
pharmacy
primary_school
restaurant
secondary_school
shoe_store
shopping_mall
stadium
supermarket
tourist_attraction
university
 * 
 *  **/