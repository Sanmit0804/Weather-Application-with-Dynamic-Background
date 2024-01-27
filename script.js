const container = document.querySelector(".container");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const search = document.querySelector(".search-box button");
const searchEnter = document.querySelector(".search-box input");
const error404 = document.querySelector(".not-found");

search.addEventListener("click", performSearch);

searchEnter.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    performSearch();
  }
});

function performSearch() {
  const APIKey = "9de255685d6643d5a772a7fb41f9138c";
  const city = document.querySelector(".search-box input").value;

  if (city == "") return;

  // fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit={limit}&appid=${APIkey}`)
  //   fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid={API key}`)

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9de255685d6643d5a772a7fb41f9138c`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod == "404") {
        container.style.height = "400px";
        weatherBox.classList.remove("active");
        weatherDetails.classList.remove("active");
        error404.classList.add("active");
        return;
      }

      container.style.height = "555px";
      weatherBox.classList.add("active");
      weatherDetails.classList.add("active");
      error404.classList.remove("active");

      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temperature");
      const description = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(
        ".weather-details .humidity span"
      );
      const wind = document.querySelector(".weather-details .wind span");

      switch (json.weather[0].main) {
        case "Clear":
          image.src = "images/clear.png";
          break;

        case "Rain":
          image.src = "images/rain.png";
          break;

        case "Snow":
          image.src = "images/snow.png";
          break;

        case "Clouds":
          image.src = "images/cloud.png";
          break;

        case "Mist":
          image.src = "images/mist.png";
          break;

        case "Haze":
          image.src = "images/mist.png";
          break;

        default:
          image.src = "images/cloud.png";
      }

      console.log(json.main);

      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}<span>%</span>`;
      wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
    });

  const body = document.body;
  const apiUrl = `https://source.unsplash.com/1600x900/?${city}`;

  // Fetch image from the API
  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.url;
    })
    .then((imageUrl) => {
      // Set the background image of the cityImageContainer
      body.style.backgroundImage = `url(${imageUrl})`;
    })
    .catch((error) => {
      console.error("Error fetching city image:", error);
      // You can display an error message to the user if needed
    });
}
