// date and time

let now = new Date();

let days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];
let day = days[now.getDay()];

let date = now.getDate();

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];

let hours = now.getHours();
let minutes = now.getMinutes();
if (hours < 10) {
  hours = `0${hours}`;
}
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let displayDateAndTime = document.querySelector("#display-date-and-time");
displayDateAndTime.innerHTML = `${day} ${date} ${month} ${hours}:${minutes}`;

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}
// info

function showWeather(response) {
  console.log(response);
  let currentCityName = response.data.name;
  let displayCityName = document.querySelector("#display-city-name");
  displayCityName.innerHTML = currentCityName;

  celsiusTemp = response.data.main.temp;

  let currentCityCelsiusTemp = Math.round(celsiusTemp);

  let displayCityTemp = document.querySelector("#display-city-temp");
  displayCityTemp.innerHTML = `${currentCityCelsiusTemp}°C`;

  let currentCityHumidity = response.data.main.humidity;
  let displayHumidity = document.querySelector("#display-humidity");
  displayHumidity.innerHTML = `${currentCityHumidity}%`;

  let currentCityWind = response.data.wind.speed;
  let displayWind = document.querySelector("#display-wind");
  displayWind.innerHTML = `${currentCityWind}mph`;

  let currentDescription = response.data.weather[0].description;
  currentCapitalisedDescription =
    currentDescription.charAt(0).toUpperCase() + currentDescription.slice(1);

  let displayWeatherDescription = document.querySelector(
    "#display-weather-description"
  );
  displayWeatherDescription.innerHTML = currentCapitalisedDescription;

  let icon = response.data.weather[0].icon;
  let displayIcon = document.querySelector("#display-icon");
  displayIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${icon}@2x.png`
  );
}

function displayForecast(response) {
  let forecast = null;
  let forecastElement = document.querySelector(`#forecast`);
  forecastElement.innerHTML = null;
  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += ` 
      <div class="col-2">
        <strong>
          ${formatHours(forecast.dt * 1000)}
          </strong>
        <img class="forecast-icon" src="http://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png" />
        <div class="weather-forecast-temp">
          <strong> ${Math.round(forecast.main.temp_max)}°</strong> ${Math.round(
      forecast.main.temp_min
    )}°
        </div>
     
    </div>`;
  }
}

function search(city) {
  apiKey = `f15c99b37dfa1cbb83fb8a2b0c300b09`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

//Search Engine
function handleSubmit(event) {
  event.preventDefault();
  let input = document.querySelector(".enter-city");
  let cityInput = input.value.trim();
  search(cityInput);
}

let form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

// change Temp

function changeFahrenheit(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  fahrenheit = Math.round((celsiusTemp * 9) / 5 + 32);
  let displayCityTemp = document.querySelector("#display-city-temp");
  displayCityTemp.innerHTML = `${fahrenheit}°F`;
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", changeFahrenheit);

function changeCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  celsius = Math.round(celsiusTemp);
  let displayCityTemp = document.querySelector("#display-city-temp");
  displayCityTemp.innerHTML = `${celsius}°C`;
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", changeCelsius);

let celsiusTemp = null;

// Default
search("London");
