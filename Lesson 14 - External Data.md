# Lesson 14 - External Data

So far, all of the data in our programs has been typed directly into the code. Real programs usually get their data from somewhere else: a file, a database, or a website. Keeping data separate from code means the data can change (or grow to millions of rows) without rewriting the program.

## Files and preload()

Loading a file takes time. If we tried to use the data in `setup()` before it finished loading, it wouldn't be there yet. p5.js solves this with `preload()`, a function that runs **before** `setup()` and waits until every file has finished loading.

```javascript
let words;

function preload() {
  words = loadStrings("data/words.txt");
}

function setup() {
  createCanvas(600, 600);
  // words is ready to use here
}
```

Organize your external in a separate folder.  This lesson uses a  `data/` folder.

## Three Types of Files

### Text: loadStrings()

Returns an **array** of strings, one for each line of the file.

```javascript
// words.txt has one word per line
words = loadStrings("data/words.txt");

text(words[0], 20, 40);            // the first line
text(random(words), 20, 70);       // a random line
```

### Spreadsheets: loadTable()

CSV (comma-separated values) files are spreadsheets saved as plain text. The first line is usually the column names (the header).

```
name,diameter_km,distance_million_km
Mercury,4879,57.9
Venus,12104,108.2
```

```javascript
let planetTable;

function preload() {
  planetTable = loadTable("data/planets.csv", "csv", "header");
}

function setup() {
  for (let row = 0; row < planetTable.getRowCount(); row += 1) {
    let name = planetTable.getString(row, "name");
    let diameter = planetTable.getNum(row, "diameter_km");
    console.log(name, diameter);
  }
}
```

### JSON: loadJSON()

JSON (JavaScript Object Notation) stores data as **objects and arrays**, exactly like the objects from Lesson 12.

```json
{
  "planets": [
    { "name": "Mercury", "diameter": 4879 },
    { "name": "Venus", "diameter": 12104 }
  ]
}
```

```javascript
let planetData;

function preload() {
  planetData = loadJSON("data/planets.json");
}

function setup() {
  // planetData.planets is an array of objects
  for (let i = 0; i < planetData.planets.length; i += 1) {
    console.log(planetData.planets[i].name);
  }
}
```

## APIs: Data from Websites

An **API** (Application Programming Interface) lets a program ask another computer for data. Many APIs are just a web address that returns JSON. Try opening this link in your browser:

[https://api.open-meteo.com/v1/forecast?latitude=43.59&longitude=-79.64&current=temperature_2m,wind_speed_10m](https://api.open-meteo.com/v1/forecast?latitude=43.59&longitude=-79.64&current=temperature_2m,wind_speed_10m)

That's the current weather in Mississauga, as JSON. The part after the `?` gives the API information (where, and what data we want). Look at the result to find where each value is stored:

```json
{
  "current": {
    "temperature_2m": 8.4,
    "wind_speed_10m": 12.1
  }
}
```

So the temperature is at `weather.current.temperature_2m`.

Data from the internet can be slow, or fail. Instead of `preload()`, we can give `loadJSON()` a **callback**: a function that runs once the data arrives.

```javascript
let weather;
let url = "https://api.open-meteo.com/v1/forecast?latitude=43.59&longitude=-79.64&current=temperature_2m,wind_speed_10m";

function setup() {
  createCanvas(600, 600);
  // when the data arrives, gotWeather() is called
  loadJSON(url, gotWeather);
}

function gotWeather(data) {
  weather = data;
}

function draw() {
  background(220);
  // weather is undefined until the data arrives
  if (weather) {
    text(`It is ${weather.current.temperature_2m} degrees`, 20, 40);
  }
  else {
    text("Loading weather...", 20, 40);
  }
}
```

You can also give `loadJSON()` a second function that runs if the data **can't** be loaded (no internet, or the site is down): `loadJSON(url, gotWeather, weatherFailed)`. The example code shows this.

> **AP CSP:** Using data to find patterns and answer questions is Big Idea 2 (Data). Many Create Task projects use a list of data loaded this way.
