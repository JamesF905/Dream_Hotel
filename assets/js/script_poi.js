let pOfInterests = []; // array created for multiple searched POIs
let poiData = document.getElementById("poiData");

//Waiting for the user to click search button
poiData.addEventListener("click", function(event) {
  event.preventDefault();
  let poiCategory = document.getElementById("poiCategory").value;

  console.log(poiCategory);
  //Store to localStorage inside an array of POIs
  localStorage.setItem("profile", poiCategory);
  pOfInterests.push(poiCategory);
  localStorage.setItem("pOfInterests", JSON.stringify(pOfInterests));

  //Retrieve from localStorage
  let searchedQuery = JSON.parse(localStorage.getItem("pOfInterests"));
  if (searchedQuery) {
    pOfInterests = searchedQuery
    console.log(pOfInterests);
  } else {
    pOfInterests = [];
  }

  // Fetch from API the first POI
  let urlApi1 = "https://api.tomtom.com/search/2/categorySearch/" + poiCategory + ".json?key=ATDmTEMA82kkXDY008OR9gDpffe3Z0Gf&lat=21.1743&lon=-86.8466";
  fetch(urlApi1)
    .then(function(response) {
      if (!response.ok) {
        throw response.json();
      }
      return response.json();
    })
    .then(function(data) {
      console.log(data);
      document.getElementById("displayName").innerHTML = "Search Query is: " + poiCategory;
      document.getElementById("displayPoiName").innerHTML = "Name: " + data.results[0].poi.name;
      document.getElementById("displayPoiPhone").innerHTML = "Phone: " + data.results[0].poi.phone;
      document.getElementById("displayPoiAddress").innerHTML = "Address: " + data.results[0].address.freeformAddress;
      document.getElementById("displayPoiDistance").innerHTML = "Distance: " + (Number(data.results[0].dist).toFixed(2))/100 + " km";
    })
    .catch(function(error) {
      console.log(error);
    });

  // Fetch from API the remaining POIs
  let urlApi2 = "https://api.tomtom.com/search/2/categorySearch/" + poiCategory + ".json?key=ATDmTEMA82kkXDY008OR9gDpffe3Z0Gf&lat=21.1743&lon=-86.8466";
  fetch(urlApi2)
    .then(function(response) {
      if (!response.ok) {
        throw response.json();
      }
      return response.json();
    })
    .then(function(data) {
      console.log(data);
      for (i = 1; i < 10; i++) {
        document.getElementById("dispPoiName" + (i)).innerHTML = "Name: " + data.results[i].poi.name;
      }
      for (i = 1; i < 10; i++) {
        document.getElementById("dispPoiPhone" + (i)).innerHTML = "Phone: " + data.results[i].poi.phone;
      }
      for (i = 1; i < 10; i++) {
        document.getElementById("dispPoiAddress" + (i)).innerHTML = "Address: " + data.results[i].address.freeformAddress;
      }
      for (i = 1; i < 10; i++) {
        document.getElementById("dispPoiDistance" + (i)).innerHTML = "Distance: " + (Number(data.results[i].dist).toFixed(2))/100 + " km";
      }
    })
    .catch(function(error) {
      console.log(error);
    });

});
