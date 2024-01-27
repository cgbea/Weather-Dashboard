var APIKey = "c91d97b6ecd2f9c86a0a9473a725de0c"

var geoQueryUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${APIkey}`;
var weatherQueryURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}`;

// data.coord.lat
//  data.coord.lon

 fetch(queryURL)
  .then(function (response) {
    // Calling .json() to access the json data stored inside the returned promise
    return response.json();
  })
  // We store all of the retrieved data inside of an object called "data"
  .then(function (data) {
    // Log the queryURL
    console.log(queryURL);

    // Log the resulting object
    console.log(data);


  });
