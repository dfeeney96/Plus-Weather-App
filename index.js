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

navigator.geolocation.getCurrentPosition(getPosition);

function getPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  apiKey = `8ae2e00cca1079e06d3703b612c640a1`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  function defaultCurrentPosition(response) {
    console.log(response);
    let currentCityName = response.data.name;
    let displayCityName = document.querySelector("#display-city-name");
    displayCityName.innerHTML = currentCityName;

    let currentCityTemp = Math.round(response.data.main.temp);

    let displayCityTemp = document.querySelector("#display-city-temp");
    displayCityTemp.innerHTML = `${currentCityTemp}°C`;
  }

  axios.get(apiUrl).then(defaultCurrentPosition);
}
