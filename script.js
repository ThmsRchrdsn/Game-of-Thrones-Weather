let country = document.querySelector("#country");
let city = document.querySelector("#city");
let check = document.querySelector("#check");
let weatherCountry = document.querySelector("#weatherCountry");
let weatherDescription = document.querySelector("#weatherDescription");
let fictionalComparedCity = document.querySelector("#fictionalComparedCity");
let temperatureDescription = "";
const temperatureDescriptorArray = [
  "Freezing Cold",
  "Cold",
  "Mild",
  "Hot",
  "Scorching Hot",
];
const backgroundImages = [
  'url("/gallery/Winterfell.png")',
  'url("/gallery/Casterly Rock.png")',
  'url("/gallery/Kings Landing.png")',
  'url("/gallery/Dorne.png")',
  'url("/gallery/The Dothraki Sea.png")',
];

check.addEventListener("click", () => {
  let key = `25283bed1fbb2e944c3914b6a2782899`;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value},${country.value}&lang=en&units=metric&appid=${key}`;

  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      //   console.log(data);
      weatherCountry.innerText = `${data.name} / ${data.sys.country}`;
      fictionalComparedCity.innerText = getCityFromDescription(data.main.temp);
      temperatureDescription =
        temperatureDescriptorArray[getTemperatureDescriptor(data.main.temp)];
      weatherDescription.innerText =
        temperatureDescription +
        " and " +
        data.weather[0].description +
        ", it's like...";
    });
  country.value = "";
  city.value = "";
});

function getTemperatureDescriptor(temperature) {
  if (temperature <= 0) {
    return 0;
  } else if (temperature > 0 && temperature <= 10) {
    return 1;
  } else if (temperature > 10 && temperature <= 20) {
    return 2;
  } else if (temperature > 20 && temperature <= 30) {
    return 3;
  } else {
    return 4;
  }
}

function getCityFromDescription(temperature) {
  if (temperature <= 0) {
    document.getElementById("container").style.backgroundImage =
      backgroundImages[0];
    return "Winterfell";
  } else if (temperature > 0 && temperature <= 10) {
    console.log(backgroundImages[1]);
    document.getElementById("container").style.backgroundImage =
      backgroundImages[1];
    return "Casterly Rock";
  } else if (temperature > 10 && temperature <= 20) {
    document.getElementById("container").style.backgroundImage =
      backgroundImages[2];
    return "Kings Landing";
  } else if (temperature > 20 && temperature <= 30) {
    document.getElementById("container").style.backgroundImage =
      backgroundImages[3];
    return "Dorne";
  } else {
    document.getElementById("container").style.backgroundImage =
      backgroundImages[4];
    return "The Dothraki Sea";
  }
}
