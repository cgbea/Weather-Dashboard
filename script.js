// var APIKey = "c91d97b6ecd2f9c86a0a9473a725de0c"

// var geoQueryUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${APIkey}`;
// var weatherQueryURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}`;
// var search = $("#search-button")
// // data.coord.lat
// //  data.coord.lon

// fetch(geoQueryUrl)
// .then(function (response) {
//   // Calling .json() to access the json data stored inside the returned promise
//   return response.json();
// })
// // We store all of the retrieved data inside of an object called "data"
// .then(function (data) {
//   // Log the queryURL
//     console.log(geoQueryUrl)
// });


//  fetch(weatherQueryURL)
//   .then(function (response) {
//     // Calling .json() to access the json data stored inside the returned promise
//     return response.json();
//   })
//   // We store all of the retrieved data inside of an object called "data"
//   .then(function (data) {
//     // Log the queryURL
 
//   });

//   search.on("click", function(event){
//     event.preventDefault();
//     var searchCity = $("#search-input").val();
//     localStorage.setItem("City", searchCity)

//   })

var APIKey = "c91d97b6ecd2f9c86a0a9473a725de0c";

var search = $("#search-button");
var buttonHistory = $("#history");

// Add click functionality to search button.
search.on("click", function(event) {
  event.preventDefault();

  // Save searchCity to local storage
  var searchCity = $("#search-input").val();


  localStorage.setItem("City", searchCity);

  // Construct the URLs using the searchCity value
  fetchFetch()

});

var geoQueryUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${searchCity}&limit=1&appid=${APIKey}`;
  
function fetchFetch() {
  // Make the fetch request for geo data
  fetch(geoQueryUrl)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      // Log or use the data as needed
      console.log(data);
      
      // Assuming data[0] contains latitude and longitude information
      var lat = data[0].lat;
      var lon = data[0].lon;
        console.log(lat)
      // Construct the weather query URL using lat and lon
      var weatherQueryURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}`;

      // Make the fetch request for weather data
      fetch(weatherQueryURL)
        .then(function(response) {
          return response.json();
        })
        .then(function(weatherData) {
          // Log or use the weather data as needed
          console.log(weatherData);
        });
    });}

    //Creating a new button for the input
    function cityButtonList() {
        var cityButton = $("<button>").attr("type", "searchedCity")
        var namedCityButton = cityButton.text(searchCity);
        $("#history").append(namedCityButton)
    }