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

//realtime data

city = `london`;
apiKey = `8ae2e00cca1079e06d3703b612c640a1`;
apiInputCityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
function searchLocation(response) {
  console.log(response);
  let currentCityName = response.data.name;
  let displayCityName = document.querySelector("#display-city-name");
  displayCityName.innerHTML = currentCityName;

  let currentCityTemp = Math.round(response.data.main.temp);

  let displayCityTemp = document.querySelector("#display-city-temp");
  displayCityTemp.innerHTML = `${currentCityTemp}°C`;

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

axios.get(apiInputCityUrl).then(searchLocation);

navigator.geolocation.getCurrentPosition(getPosition);

function getPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  apiKey = `8ae2e00cca1079e06d3703b612c640a1`;
  let apiCurrentLocationUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  function defaultCurrentPosition(response) {
    console.log(response);
    let currentCityName = response.data.name;
    let displayCityName = document.querySelector("#display-city-name");
    displayCityName.innerHTML = currentCityName;

    let currentCityTemp = Math.round(response.data.main.temp);

    let displayCityTemp = document.querySelector("#display-city-temp");
    displayCityTemp.innerHTML = `${currentCityTemp}°C`;

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

  axios.get(apiCurrentLocationUrl).then(defaultCurrentPosition);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getPosition);
