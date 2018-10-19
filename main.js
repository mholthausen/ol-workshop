import 'ol/ol.css'; 
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZSource from 'ol/source/XYZ';
import {fromLonLat} from 'ol/proj';

// Default public key from mapbox.com
const key = "pk.eyJ1IjoibWhvbHRoYXVzZW4iLCJhIjoiY2puZnp1M2x4MDU3ajN2cW41dWc1emJ0YiJ9.HsBhoZy9z5WeQuyuVJgY1g"

// Terrain-RGB 
const elevation = new XYZSource({
    url: 'https://api.mapbox.com/v4/mapbox.terrain-rgb/{z}/{x}/{y}.pngraw?access_token=' + key,
    crossOrigin: 'anonymous'
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

        new TileLayer({
            opacity: 0.8,
            source: elevation
          }),
    ],
    // Startposition und Zoomstufe angeben
    view: new View({
        center: fromLonLat([6.936111, 50.9275]),
        zoom: 16,
    })
})
