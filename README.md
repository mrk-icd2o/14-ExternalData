# Lab 14 - External Data

You will be writing your code in `sketch.js` within the main folder - not the `example/` folder.

The `data/` folder contains `planets.csv`, `planets.json` and `words.txt`.

## Part 1 - Planet Bar Chart

- Use `loadTable()` in `preload()` to load `data/planets.csv`.

- Use a loop to draw a **bar chart** of the planets' diameters, with each planet's name under its bar.

- Scale the bars so the largest planet fits on the screen. Don't type any planet values into your code, they must all come from the file.

- Display the name of the largest planet, found with your code.

## Part 2 - Weather

- Use `loadJSON()` with a callback to get the current temperature from the [Open-Meteo API](https://api.open-meteo.com/v1/forecast?latitude=43.59&longitude=-79.64&current=temperature_2m,wind_speed_10m).

- Display the temperature, and write a function that **returns** a background colour based on the temperature (for example blue when it's below 0, red when it's above 25).

Challenge:

- Find the latitude and longitude of another city, and display both cities' temperatures.

Remember to:

- Update the header

- Include comments
