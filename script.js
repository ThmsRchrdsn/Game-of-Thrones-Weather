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
  'url("./gallery/The Eyrie.jpg")',
  'url("./gallery/The Iron Islands.jpg")',
  'url("./gallery/Casterly Rock.jpg")',
  'url("./gallery/Kings Landing.jpg")',
  'url("./gallery/Highgarden.jpg")',
  'url("./gallery/Meereen.jpg")',
  'url("./gallery/Astapor.jpg")',
  'url("./gallery/Qarth.jpg")',
];
const comparedCities = [
  "Hardhome",
  "Crasters Keep",
  "The Wall",
  "Winterfell",
  "The Eyrie",
  "The Iron Islands",
  "Casterly Rock",
  "Kings Landing",
  "Highgarden",
  "Meereen",
  "Astapor",
  "Qarth",
];
const comparedCitiesQuotes = [
  '"Hardhome is an unholy place, its said. Cursed. " —Othell Yarwyck to Jon Snow',
  '"Your uncle could tell you of the times Crasters Keep made the difference between life and death for our rangers." —Jeor Mormont to Jon Snow',
  '"The Wall can stop an army, but not a man alone." —Mance Rayder to Jon Snow',
  '"The Lord of Winterfell would always be a Stark. —thoughts of Tyrion Lannister"',
  '"Those years we spent in the Eyrie ... gods, those were good years." —Robert I Baratheon to Eddard Stark',
  '"The Iron Islands lived in the past; the present was too hard and bitter to be borne." —thoughts of Theon Greyjoy',
  '"Stone, I must be stone, I must be Casterly Rock, hard and unmovable." —thoughts of Tyrion Lannister',
  '"Kings Landing is a pit of snakes." —Doran Martell to Nymeria Sand',
  '"The war had not touched the fabled bounty of Highgarden." —thoughts of Catelyn Stark',
  '"Meereen had been rich beyond imagining." —thoughts of Daenerys Targaryen',
  '"Even a modest khalasar could crack this Astapor like a nut and spill out the rotted meat inside." —Daenerys Targaryen to Jorah Mormont',
  '"These are strange times in Qarth. And strange times are bad for trade." —Xaro Xhoan Daxos to Daenerys Targaryen',
];

check.addEventListener("click", () => {
  fireEvent();
});

document.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    fireEvent();
  }
});

function fireEvent(){
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
}

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
  fictionalCityQuote.innerText = comparedCitiesQuotes[cityNumber];
}
