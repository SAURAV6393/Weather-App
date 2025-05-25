const apiKey = "4556a3bcd82ded1835de5ef2ab95e0f2";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherInfo = document.querySelector(".weather-info");
const errorText = document.querySelector(".error");

const weatherIcons = {
  Thunderstorm: "thunderstorm.png",
  Drizzle: "drizzle.png",
  Rain: "rain.png",
  Snow: "snow.png",
  Mist: "mist.png",
  Smoke: "smoke.png",
  Haze: "haze.png",
  Dust: "dust.png",
  Fog: "fog.png",
  Sand: "sand.png",
  Ash: "ash.png",
  Squall: "squall.png",
  Tornado: "tornado.png",
  Clear: "clear.png",
  Clouds: "clouds.png",
};

async function checkWeather(city) {
  const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);

  if (!response.ok) {
    errorText.classList.remove("hidden");
    weatherInfo.classList.add("hidden");
    return;
  }

  const data = await response.json();
  errorText.classList.add("hidden");
  weatherInfo.classList.remove("hidden");

  document.querySelector(
    ".city"
  ).textContent = `${data.name}, ${data.sys.country}`;
  document.querySelector(".temp").textContent = `${Math.round(
    data.main.temp
  )}°C`;
  document.querySelector(".description").textContent =
    data.weather[0].description;
  document.querySelector(".humidity").textContent = `${data.main.humidity}%`;
  document.querySelector(".wind").textContent = `${data.wind.speed} km/h`;

  const mainWeather = data.weather[0].main;
  weatherIcon.src = `images/${weatherIcons[mainWeather] || "clear.png"}`;
}

// Load default city
checkWeather("New York");

searchBtn.addEventListener("click", () => {
  const city = searchBox.value.trim();
  if (city) checkWeather(city);
});

searchBox.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    const city = searchBox.value.trim();
    if (city) checkWeather(city);
  }
});
