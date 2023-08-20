const weather = document.querySelector("#weather span:nth-child(2)");
const city = document.querySelector("#weather span:last-child");
const API_KEY = "apikey";
let savedApiKey = localStorage.getItem(API_KEY);

if (savedApiKey === null || savedApiKey === "null" || savedApiKey.length !== 32) {
  let apiKey = prompt("Please write OpenWeather Key", "5316b0c6aa14b11aebf545883b68e63b");
  localStorage.setItem(API_KEY, apiKey);
  savedApiKey = localStorage.getItem(API_KEY);
}

function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  console.log("You live in", lat, lon);
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${savedApiKey}&units=metric`;
  fetch(url)
  .then((response) => response.json())
  .then((data) => {
    const iconCode = data.weather[0].icon;
    const icon = document.createElement("img");
    icon.src = `http://openweathermap.org/img/w/${iconCode}.png`;
    document.querySelector("#weather span:first-child").append(icon);
    city.innerText = data.name;
    weather.innerText = `${data.weather[0].main} / ${data.main.temp}`;

  });

}

function onGetError() {
  alert("Can't find you. No weather for you.")
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGetError);

