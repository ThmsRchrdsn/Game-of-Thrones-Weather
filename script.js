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
  "Mild",
  "Hot",
  "Scorching Hot",
];
const backgroundImages = [
  'url("./gallery/The Wall.jpg")',
  'url("./gallery/Winterfell.jpg")',
  'url("./gallery/Casterly Rock.jpg")',
  'url("./gallery/Kings Landing.jpg")',
  'url("./gallery/Sunspear.jpg")',
  'url("./gallery/Qarth.jpg")',
];
const comparedCities = [
  "The Wall",
  "Winterfell",
  "Casterly Rock",
  "Kings Landing",
  "Sunspear",
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
      getCityFromDescription(data.main.temp);
      weatherDescription.innerText =
        temperatureDescription +
        " and " +
        data.weather[0].description +
        ", it's like...";
    });
  country.value = "";
  city.value = "";
});

function getCityFromDescription(temperature) {
  let cityNumber;
  if (temperature <= -10) {
    cityNumber = 0;
  } else if (temperature > -10 && temperature <= 0) {
    cityNumber = 1;
  } else if (temperature > 0 && temperature <= 10) {
    cityNumber = 2;
  } else if (temperature > 10 && temperature <= 20) {
    cityNumber = 3;
  } else if (temperature > 20 && temperature <= 30) {
    cityNumber = 4;
  } else if (temperature > 30) {
    cityNumber = 5;
  }
  temperatureDescription = temperatureDescriptorArray[cityNumber];
  document.getElementById("container").style.backgroundImage =
    backgroundImages[cityNumber];
  fictionalComparedCity.innerText = comparedCities[cityNumber];
  // fictionalCityQuote.innerText = comparedCitiesQuotes[cityNumber];
}
