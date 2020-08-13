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

// info

function showWeather(response) {
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

function search(city) {
  apiKey = `3001a9177c11baf6a479219948afbc38`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

//Search Engine
function handleSubmit(event) {
  event.preventDefault();
  let input = document.querySelector(".enter-city");
  let cityInput = input.value.trim();
  console.log(cityInput);
  search(cityInput);
}

search("London");

let form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);
