import 'ol/ol.css'; 
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZSource from 'ol/source/XYZ';
import {fromLonLat} from 'ol/proj';
import ImageLayer from 'ol/layer/Image';
import RasterSource from 'ol/source/Raster';

// Default public key from mapbox.com
const key = "pk.eyJ1IjoibWhvbHRoYXVzZW4iLCJhIjoiY2puZnp1M2x4MDU3ajN2cW41dWc1emJ0YiJ9.HsBhoZy9z5WeQuyuVJgY1g"

// Flood-Function
function flood(pixels, data)    {
    const pixel = pixels[0];
    if(pixel[3])    {
        // R, G, B values as elevation
        const height = -10000 + ((pixel[0] * 256 * 256 + pixel[1] * 256 + pixel[2]) * 0.1);
        if(height <= data.level)    {
            // sea blue
            pixel[0] = 145; // red
            pixel[1] = 175; // green
            pixel[2] = 186; // blue
            pixel[3] = 255; // alpha
        }   else {
            pixel[3] = 0; // transparent
        }
    }
    return pixel;
}

// Terrain-RGB 
const elevation = new XYZSource({
    url: 'https://api.mapbox.com/v4/mapbox.terrain-rgb/{z}/{x}/{y}.pngraw?access_token=' + key,
    crossOrigin: 'anonymous'
  });

// Raster source (elevation data), configured with flood operation
const raster = new RasterSource({
    sources: [elevation],
    operation: flood
  });

// Aktionen des Slider beobachten und Rasteroperationen erneut ausführen bei Änderungen
const control = document.getElementById('level');
const output = document.getElementById('output');
control.addEventListener('input', function() {
  output.innerText = control.value;
  raster.changed();
});
output.innerText = control.value;

raster.on('beforeoperations', function(event) {
    event.data.level = control.value;
  });

// Neuer Tile Layer, der die Terrain-Quelle 'elevation' nutzt

new Map({
    target: 'map-container',
    layers: [
        new TileLayer({
            source: new XYZSource({
                url: 'http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg'
            })
        }),

        new ImageLayer({
            opacity: 0.8,
            source: raster
        }),
    ],
    // Startposition und Zoomstufe angeben
    view: new View({
        center: fromLonLat([6.936111, 50.9275]),
        zoom: 16,
    })
})
