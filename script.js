let country = document.querySelector("#country");
let city = document.querySelector("#city");
let check = document.querySelector("#check");
let weatherCountry = document.querySelector("#weatherCountry");
let weatherDescription = document.querySelector("#weatherDescription");
let fictionalComparedCity = document.querySelector("#fictionalComparedCity");
let fictionalCityQuote = document.querySelector("#fictionalCityQuote");
let temperatureDescription = "";
const temperatureDescriptorArray = [
  "Freezing Cold",
  "Cold",
  "Chilly",
  "Mild",
  "Hot",
  "Scorching Hot",
];
const backgroundImages = [
  'url("./gallery/Hardhome.jpg")',
  'url("./gallery/Crasters Keep.jpg")',
  'url("./gallery/The Wall.jpg")',
  'url("./gallery/Winterfell.jpg")',
  'url("./gallery/The Erie.jpg")',
  'url("./gallery/The Iron Islands.jpg")',
  'url("./gallery/Casterly Rock.jpg")',
  'url("./gallery/Kings Landing.jpg")',
  'url("./gallery/Highgarden.jpg")',
  'url("./gallery/Sunspear.jpg")',
  'url("./gallery/Tyrosh.jpg")',
  'url("./gallery/Qarth.jpg")',
];
const comparedCities = [
  "Hardhome",
  "Crasters Keep",
  "The Wall",
  "Winterfell",
  "The Erie",
  "The Iron Islands",
  "Casterly Rock",
  "Kings Landing",
  "Highgarden",
  "Sunspear",
  "Tyrosh",
  "Qarth",
];
const comparedCitiesQuotes = [
  '"The Lord of Winterfell would always be a Stark. —thoughts of Tyrion Lannister"',
  '"Stone, I must be stone, I must be Casterly Rock, hard and unmovable." —thoughts of Tyrion Lannister',
  '"Kings Landing is a pit of snakes." —Doran Martell to Nymeria Sand',
  '"Dorne is sand and scorpions, and bleak red mountains baking in the sun." —Reznak mo Reznak to Skahaz mo Kandaq',
  '"These are strange times in Qarth. And strange times are bad for trade." —Xaro Xhoan Daxos to Daenerys Targaryen',
];

check.addEventListener("click", () => {
  let key = `25283bed1fbb2e944c3914b6a2782899`;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value},${country.value}&lang=en&units=metric&appid=${key}`;

  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // console.log(data.clouds.all);
      weatherCountry.innerText = `${data.name} / ${data.sys.country}`;
      getCityFromDescription(data.main.temp, data.clouds.all);
      weatherDescription.innerText =
        temperatureDescription +
        " and " +
        data.weather[0].description +
        ", it's like...";
    });
  country.value = "";
  city.value = "";
});

function getCityFromDescription(temperature, cloudCoverage) {
  let cityNumber;
  let cityNumbers = [];
  if (temperature <= -10) {
    cityNumbers = [0, 1];
  } else if (temperature > -10 && temperature <= 0) {
    cityNumbers = [2, 3];
  } else if (temperature > 0 && temperature <= 10) {
    cityNumbers = [4, 5];
  } else if (temperature > 10 && temperature <= 20) {
    cityNumbers = [6, 7];
  } else if (temperature > 20 && temperature <= 30) {
    cityNumbers = [8, 9];
  } else if (temperature > 30) {
    cityNumbers = [10, 11];
  }
  if (cloudCoverage >= 50) {
    cityNumber = cityNumbers[0];
  } else if (cloudCoverage < 50) {
    cityNumber = cityNumbers[1];
  }

  temperatureDescription = temperatureDescriptorArray[Math.floor(cityNumber/2)];
  document.getElementById("container").style.backgroundImage =
    backgroundImages[cityNumber];
  fictionalComparedCity.innerText = comparedCities[cityNumber];
  // fictionalCityQuote.innerText = comparedCitiesQuotes[cityNumber];
}
