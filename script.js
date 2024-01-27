
var APIKey = "c91d97b6ecd2f9c86a0a9473a725de0c";
var storedCities = JSON.parse(localStorage.getItem("city")) || [];
var search = $("#search-button");

// Click event handler for the search button
search.on("click", function (event) {
  event.preventDefault();

  // Get the value from the input field with id 'search-input'
  var searchCity = $("#search-input").val().trim();

  if (searchCity === "") {
    alert("Please enter a city name.");
    return;
  } else {
    storedCities.push(searchCity);

    // Save the updated array back to localStorage
    localStorage.setItem("city", JSON.stringify(storedCities));

    // Construct the URLs using the searchCity value
    var geoQueryUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${searchCity}&limit=1&appid=${APIKey}`;

    fetchFetch(geoQueryUrl);
    renderCities();
  }
});

function fetchFetch(geoQueryUrl) {
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
}

function renderCities() {
  var searchedCities = $("#history");
  searchedCities.empty(); // Clear previous cities

  // Loop through the array and display each city
  for (var i = 0; i < storedCities.length; i++) {
    searchedCities.append(`<button type='button' class='btn btn-secondary m-2'>${storedCities[i]}</button>`);
  }
}

// Call renderCities initially to display any existing cities
renderCities();

