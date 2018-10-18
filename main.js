import 'ol/ol.css'; 
import Map from 'ol/Map'; 
import View from 'ol/View'; 
import MVT from 'ol/format/MVT'; 
import VectorTileLayer from 'ol/layer/VectorTile'; 
import VectorTileSource from 'ol/source/VectorTile'; 

// See https://openmaptiles.com/hosting/ for terms and access key
// Account wird benötigt!
// Account: holthausen@terrestris.de

const key = 'PHdRrAPXc1836rUb5eC9';

// Map
const map = new Map({
    target: 'map-container',
    view: new View({
        center: [0, 0],
        zoom: 2
    })
});


// VectorTileLayer
const layer = new VectorTileLayer({ 
    source: new VectorTileSource({ 
        attributions: [
            '<a href="http://www.openmaptiles.org/" target="_blank">&copy; OpenMapTiles</a>', 
            '<a href="http://www.openstreetmap.org/about/" target="_blank">&copy; OpenStreetMap contributors</a>'
        ], 
        format: new MVT(),
        url: `https://free-{1-3}.tilehosting.com/data/v3/{z}/{x}/{y}.pbf.pict?key=${key}`, 
        maxZoom: 14 
    }) 
}); 


map.addLayer(layer); 

console.log(layer.source.url);