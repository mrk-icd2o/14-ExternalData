/*
   Description: Lesson 14 - External Data example
   Author: Mr. Kowalczewski
   Date of last edit: Novembe 23, 2026
*/

// the data files are in the shared data/ folder, one level up
let words, planetTable, planetData;

// weather data from an API
let weather;
let weatherUrl = "https://api.open-meteo.com/v1/forecast?latitude=43.59&longitude=-79.64&current=temperature_2m,wind_speed_10m";

// ----- preload() -----
// runs before setup(), and waits for every file to finish loading
function preload() {
  // text file: an array of strings, one per line
  words = loadStrings("../data/words.txt");

  // CSV file: a table with a header row
  planetTable = loadTable("../data/planets.csv", "csv", "header");

  // JSON file: objects and arrays
  planetData = loadJSON("../data/planets.json");
}

function setup() {
  createCanvas(800, 600);
  textSize(16);
  //console.log(words);
  console.log(planetTable);
  // ----- API with a callback -----
  // gotWeather() runs when the data arrives
  // weatherFailed() runs if it can't be loaded (no internet, site down)
  loadJSON(weatherUrl, gotWeather, weatherFailed);

  // ----- Reading a table -----
  for (let row = 0; row < planetTable.getRowCount(); row += 1) {
    let name = planetTable.getString(row, "name");
    let diameter = planetTable.getNum(row, "diameter_km");
    console.log(`${name}: ${diameter} km`);
  }
}

function draw() {
  background(220);
  fill(0);

  // ----- Text file -----
  text(`First word: ${words[0]}   Number of words: ${words.length}`, 20, 30);

  // ----- JSON file -----
  // planetData.planets is an array of objects
  let planets = planetData.planets;
  for (let i = 0; i < planets.length; i += 1) {
    let x = 60 + i * 95;
    // scale the diameter down to fit on screen
    let size = planets[i].diameter / 1500;

    fill(100, 150, 255);
    circle(x, 250, size);
    fill(0);
    textAlign(CENTER);
    text(planets[i].name, x, 350);
    textAlign(LEFT);
  }

  // ----- API data -----
  // weather is undefined until the data arrives
  if (weather == "failed") {
    text("Weather is unavailable right now", 20, 450);
  }
  else if (weather) {
    text(`Mississauga right now: ${weather.current.temperature_2m} °C, wind ${weather.current.wind_speed_10m} km/h`, 20, 450);
  }
  else {
    text("Loading weather...", 20, 450);
  }
}

// callback: runs once the API sends back its data
function gotWeather(data) {
  weather = data;
  console.log(weather);
}

// error callback: runs if the API can't be reached
function weatherFailed(error) {
  weather = "failed";
  console.log(error);
}
