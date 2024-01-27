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
var storedCities = JSON.parse(localStorage.getItem("city")) || [];
var search = $("#search-button");

// Click event handler for the search button
search.on("click", function (event) {
  event.preventDefault();

  // Get the value from the input field with id 'search-input'
  var searchCity = $("#search-input").val();

  storedCities.push(searchCity);

  // Save the updated array back to localStorage
  localStorage.setItem("city", JSON.stringify(storedCities));

 renderCities();

  // Construct the URLs using the searchCity value
  var geoQueryUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${searchCity}&limit=1&appid=${APIKey}`;

  // Make the fetch request for geo data
  fetch(geoQueryUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Log or use the data as needed
      console.log(data);

      // Assuming data[0] contains latitude and longitude information
      var lat = data[0].lat;
      var lon = data[0].lon;

      // Construct the weather query URL using lat and lon
      var weatherQueryURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}`;

      // Make the fetch request for weather data
      fetch(weatherQueryURL)
        .then(function (response) {
          return response.json();
        })
        .then(function (weatherData) {
          // Log or use the weather data as needed
          console.log(weatherData);
        });
    });
});

function renderCities() {
    var searchedCities = $("#history");
    searchedCities.empty(); // Clear previous cities
  
    // Loop through the array and display each city
    for (var i = 0; i < storedCities.length; i++) {
      searchedCities.append(`<button type='button' class='btn btn-info m-2'>${storedCities[i]}</button>`);
    }
  }
  
  // Call renderCities initially to display any existing cities
  renderCities();

// var cityButton = $("<button>").attr("type", "searchedCity").addClass("btn btn-info");

// var namedCityButton = cityButton.text(searchCity);

// $("#history").append(namedCityButton);

// console.log(namedCityButton);

// //Creating a new button for the input
// function cityButtonList() {
//     var cityButton = $("<button>").attr("type", "searchedCity")
//     var namedCityButton = cityButton.text(searchCity);
//     $("#history").append(namedCityButton);
//     console.log(namedCityButton)
// }
