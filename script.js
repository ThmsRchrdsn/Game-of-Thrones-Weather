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
  'url("./gallery/Winterfell.jpg")',
  'url("./gallery/Casterly Rock.jpg")',
  'url("./gallery/Kings Landing.jpg")',
  'url("./gallery/Dorne.jpg")',
  'url("./gallery/Qarth.jpg")',
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
  if (temperature <= 0) {
    temperatureDescription = temperatureDescriptorArray[0];
    document.getElementById("container").style.backgroundImage =
      backgroundImages[0];
    fictionalComparedCity.innerText = "Winterfell";
    fictionalCityQuote.innerText = '"The Lord of Winterfell would always be a Stark. —thoughts of Tyrion Lannister"';

  } else if (temperature > 0 && temperature <= 10) {
    temperatureDescription = temperatureDescriptorArray[1];
    console.log(backgroundImages[1]);
    document.getElementById("container").style.backgroundImage =
      backgroundImages[1];
    fictionalComparedCity.innerText = "Casterly Rock";
    fictionalCityQuote.innerText = '"Stone, I must be stone, I must be Casterly Rock, hard and unmovable." —thoughts of Tyrion Lannister';

  } else if (temperature > 10 && temperature <= 20) {
    temperatureDescription = temperatureDescriptorArray[2];
    document.getElementById("container").style.backgroundImage =
      backgroundImages[2];
    fictionalComparedCity.innerText = 'King'+"'"+'s Landing';
    fictionalCityQuote.innerText = '"King'+"'"+'s Landing is a pit of snakes." —Doran Martell to Nymeria Sand';

  } else if (temperature > 20 && temperature <= 30) {
    temperatureDescription = temperatureDescriptorArray[3];
    document.getElementById("container").style.backgroundImage =
      backgroundImages[3];
    fictionalComparedCity.innerText = "Dorne";
    fictionalCityQuote.innerText = '"Dorne is sand and scorpions, and bleak red mountains baking in the sun." —Reznak mo Reznak to Skahaz mo Kandaq';

  } else {
    temperatureDescription = temperatureDescriptorArray[4];
    document.getElementById("container").style.backgroundImage =
      backgroundImages[4];
    fictionalComparedCity.innerText = "Qarth";
    fictionalCityQuote.innerText = '"These are strange times in Qarth. And strange times are bad for trade." —Xaro Xhoan Daxos to Daenerys Targaryen';
  }
}
