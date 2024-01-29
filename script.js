var APIKey = "c91d97b6ecd2f9c86a0a9473a725de0c";
var storedCities = JSON.parse(localStorage.getItem("city")) || [];
var search = $("#search-button");
var clear = $("#clear-button");

// A user can click search to find weather for their inputed city
search.on("click", function (event) {
  event.preventDefault();

  var searchCity = $("#search-input").val().trim();

  if (searchCity === "") {
    alert("Please enter a city name.");
    return;
  } else {
    storedCities.push(searchCity);

    // Saving the updated array of serached cities back to localStorage
    localStorage.setItem("city", JSON.stringify(storedCities));
    var geoQueryUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${searchCity}&limit=1&appid=${APIKey}`;

    fetchFetch(geoQueryUrl);
    renderCities();
    forecastCards(data);
  }
});

// Add optional clear button if the user wants to start again.
clear.on("click", function () {
  localStorage.clear();
  storedCities = [];
  $("#history").empty();
  $("#today").empty();
  $("#forecast").empty();
});

// Buttons for previously searched cities can be clicked to trigger a similar function as to when search is clicked.
$("#history").on("click", ".btn-secondary", function () {
  console.log("Button Clicked");
  var thisCity = $(this).attr("name");
  var geoQueryUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${thisCity}&limit=1&appid=${APIKey}`;

  // Make the fetch request for geo data since we are initially searching by city name, not coordinates.
  fetch(geoQueryUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // lat and lon values can be found using the data from the first fetch request
      var lat = data[0].lat;
      var lon = data[0].lon;

      // Construct the weather query URL using lat and lon
      var weatherQueryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${APIKey}`;

      // Make the fetch request for weather data
      fetch(weatherQueryURL)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          var today = $("#today").addClass("border border-dark");
          today.empty();
          var date = dayjs().format("DD/MM/YYYY");
          var h2 = $("<h2>");
          h2.attr("id", "todayHead")
            .addClass("h3")
            .text(thisCity + " (" + date + ") ");
          today.append(h2);
          // Apply the weather data to get icon temp, wind and humidity;
          var iconURL = `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}.png`;
          var icon = $("<img alt='weather icon'>");
          icon.attr("src", iconURL);
          $("#todayHead").append(icon);
          var temp = $("<p>");
          temp.text(`Temp: ${data.list[0].main.temp}°C`);
          $("#today").append(temp);
          var wind = $("<p>");
          wind.text(`Wind: ${data.list[0].wind.speed} KPH`);
          $("#today").append(wind);
          var humidity = $("<p>");
          humidity.text(`Humidity: ${data.list[0].main.humidity}%`);
          $("#today").append(humidity);
          forecastCards(data);
        });
    });
});

function fetchFetch(geoQueryUrl) {
  // Make the fetch request for geo data since we are initially searching by city name, not coordinates.
  fetch(geoQueryUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // lat and lon values can be found using the data from the first fetch request
      var lat = data[0].lat;
      var lon = data[0].lon;

      // Construct the weather query URL using lat and lon
      var weatherQueryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${APIKey}`;

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
          icon.attr("src", iconURL);
          $("#todayHead").append(icon);
          var temp = $("<p>");
          temp.text(`Temp: ${data.list[0].main.temp}°C`);
          $("#today").append(temp);
          var wind = $("<p>");
          wind.text(`Wind: ${data.list[0].wind.speed} KPH`);
          $("#today").append(wind);
          var humidity = $("<p>");
          humidity.text(`Humidity: ${data.list[0].main.humidity}%`);
          $("#today").append(humidity);
          forecastCards(data);
        });
    });
}

// Get previously searched cities from localstorage. Make sure this information isn't duplicated.
function renderCities() {
  var searchedCities = $("#history");
  searchedCities.empty();

  // Loop through the array and display each city
  for (var i = 0; i < storedCities.length; i++) {
    searchedCities.append(
      `<button type='button' name='${storedCities[i]}' class='btn btn-secondary m-2'>${storedCities[i]}</button>`
    );
  }
}
// Create a card showing current weather conditions for the most recently selected city.
function todayCard() {
  var today = $("#today").addClass("border border-dark");
  today.empty();
  var date = dayjs().format("DD/MM/YYYY");
  var h2 = $("<h2>");
  h2.attr("id", "todayHead")
    .addClass("h3")
    .text(storedCities[storedCities.length - 1] + " (" + date + ") ");
  today.append(h2);
}

// Add future forecasts below today card
function forecastCards(data) {
  var forcast = $("#forecast");
  forcast.empty();
  var fiveDayHead = $("<h3>");
  fiveDayHead.addClass("h4").text("5-Day Forecast");
  forcast.append(fiveDayHead);
  forcast.append("<div class= 'cards'></div>");

  // Loop through the forecast data and generate forecast cards for 5 days ahaed.
  for (var i = 1; i < 6; i++) {
    var formattedDate = dayjs().add([i], "day").format("DD/MM/YYYY");

    // Create a card for each day
    var card = $("<div>").addClass("card col-sm-2 m-1 text-white bg-info");
    var cardBody = $("<div>").addClass("card-body");
    var cardTitle = $("<h6>").addClass("card-title").text(formattedDate);
    var iconURL = `https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}.png`;
    var icon = $("<img alt='weather icon'>");
    icon.attr("src", iconURL);
    console.log(data);
    cardBody.append(cardTitle);
    card.append(cardBody);
    card.append(icon);
    var temp = $("<p>");
    temp.text(`Temp: ${data.list[i].main.temp}°C`);
    card.append(temp);
    var wind = $("<p>");
    wind.text(`Wind: ${data.list[i].wind.speed} KPH`);
    card.append(wind);
    var humidity = $("<p>");
    humidity.text(`Humidity: ${data.list[i].main.humidity}%`);
    card.append(humidity);
    $(".cards").append(card);
  }
}

// Call renderCities initially to display any existing cities
renderCities();
