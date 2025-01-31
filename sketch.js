let weatherJSON 
let minTemp = Infinity
let maxTemp = -Infinity
let images = {}
let dx
function preload() {
  weatherJSON = loadJSON("https://api.weather.gov/gridpoints/OKX/33,37/forecast")  
}

function setup() {
  createCanvas(600, 400);
  background(220);
  noLoop(); // Prevent draw from running repeatedly
  
if (weatherJSON && weatherJSON.properties && weatherJSON.properties.periods) {
    dx = width / (weatherJSON.properties.periods.length + 2);
  
   for (const p of weatherJSON.properties.periods) {
      minTemp = min(p.temperature, minTemp);
      maxTemp = max(p.temperature, maxTemp);
    }
  }
}

function draw() {
  background(220);
  textSize(16);
  fill(0);

 if (weatherJSON && weatherJSON.properties && weatherJSON.properties.periods) {
    let forecast = weatherJSON.properties.periods;
    let px = dx;
    let py = map(forecast[0].temperature, minTemp, maxTemp, 0.8 * height, 0.2 * height);
    
     for (let i = 1; i < forecast.length; i++) {
      let cx = dx * (i + 1);
      let cy = map(forecast[i].temperature, minTemp, maxTemp, 0.8 * height, 0.2 * height);
      line(px, py, cx, cy);
      px = cx;
      py = cy;
   }
  } else {
    text("Failed to load weather data.", 20, 20);
  }
}
