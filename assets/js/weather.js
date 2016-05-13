$(document).ready(function() {
  const API_KEY = "9354bd8e32d316c74ba6bdb932b6a446";
  var city, coordsLat, coordsLon;
  var temp, tempCelsius, tempFahrenheit;

  const locURL = "http://ip-api.com/json";

  // Get location information
  $.ajax( {
    url: locURL,
    success: function(data) {
      // Get city name and coordinates
      city = data["city"];
      coordsLat = data["lat"];
      coordsLon = data["lon"];

      var weatherURL = "http://api.openweathermap.org/data/2.5/weather?lat=" + coordsLat + "&lon=" + coordsLon + "&appid=" + API_KEY;

      // Get Temperature
      $.ajax({
        url: weatherURL,
        success: function(data) {
          temp = data["main"]["temp"]; // Temp in Kelvin (K)
          tempCelsius = (temp - 273.15).toFixed(1); // Kelvin to Celsius
          tempFahrenheit = Math.floor(temp * (9/5) - 459.67); // Kelvin to Fahrenheit

          var tempDescription = data["weather"][0]["description"];
          var icon;

          // Select weather icon based on current conditions
          switch(tempDescription) {
            case "clear sky":
              icon = "sunny";
              break;
            case "mist":
            case "few clouds":
            case "scattered clouds":
            case "broken clouds":
              icon = "cloudy";
              break;
            case "shower rain":
            case "rain":
              icon = "rainy";
              break;
            case "thunderstorm":
              icon = "thunder-storm";
              break;
            case "snow":
              icon = "flurries";
              break;
          }

          $("." + icon).removeClass("hide");

          $("#city").text(city);

          $("#celsius").html('<span id="temp-val">' + tempCelsius +
                             '</span> <span id="temp-scale"><a href="#">&deg;C</a></span>');

          $("#fahrenheit").html('<span id="temp-val">' + tempFahrenheit +
                             '</span> <span id="temp-scale"><a href="#">&deg;F</a></span>');

          $("#status").text(tempDescription);

          $("#temp-scale a").click(function() {
            toggleTemps();
          });
        }
      });
    }
  });

  function toggleTemps() {
    $("#celsius, #fahrenheit").toggle();
  }

});
