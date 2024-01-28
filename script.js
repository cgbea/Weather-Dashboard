var APIKey = "c91d97b6ecd2f9c86a0a9473a725de0c";
var storedCities = JSON.parse(localStorage.getItem("city")) || [];
var search = $("#search-button");
var clear = $("#clear-button");


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

clear.on("click", function () {
  localStorage.clear();
  storedCities = [];
  $("#history").empty();
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
      var weatherQueryURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${APIKey}`;

      // Make the fetch request for weather data
      fetch(weatherQueryURL)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
         
          console.log(data);
          todayCard();
           // Apply the weather data to get icon temp, wind and humidity;
          var iconURL = `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}.png`;
          var icon = $("<img alt='weather icon'>");
          icon.attr('src', iconURL);
          $("#todayHead").append(icon);
          var temp = $("<p>");
          temp.text(`Temp: ${data.list[0].main.temp}°C`)
          $("#today").append(temp);
          var wind = $("<p>");
          wind.text(`Wind: ${data.list[0].wind.speed} KPH`)
          $("#today").append(wind);
          var humidity = $("<p>");
          humidity.text(`Humidity: ${data.list[0].main.humidity}%`)
          $("#today").append(humidity);
        });
    });
}

function renderCities() {
  var searchedCities = $("#history");
  searchedCities.empty(); // Clear previous cities

  // Loop through the array and display each city
  for (var i = 0; i < storedCities.length; i++) {
    searchedCities.append(
      `<button type='button' class='btn btn-secondary m-2'>${storedCities[i]}</button>`
    );
  }
}

function todayCard() {
 
  var today = $("#today").addClass("border border-dark");
  today.empty();
  var date = dayjs().format("DD/MM/YYYY");
  var h2 = $("<h2>");
  h2.attr("id", "todayHead").addClass("h3").text(
    storedCities[storedCities.length - 1] + " (" + date + ") "
  );
  today.append(h2);
}
// Call renderCities initially to display any existing cities
renderCities();
