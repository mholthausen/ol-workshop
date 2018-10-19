import 'ol/ol.css'; 
import Map from 'ol/Map'; 
import View from 'ol/View'; 
import MVT from 'ol/format/MVT'; 
import VectorTileLayer from 'ol/layer/VectorTile'; 
import VectorTileSource from 'ol/source/VectorTile'; 
import Overlay from 'ol/Overlay';

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

// Overlay
const overlay = new Overlay({
    element: document.getElementById('popup-container'),
    positioning: 'bottom-center',
    offset: [0, -10],
    autoPan: true,
});
map.addOverlay(overlay);

// Schließen des Overlay bei 'click'
overlay.getElement().addEventListener('click', function() {
    overlay.setPosition(); // undefinierte Position, führt dazu, dass das Overlay "verschwindet"
})

// Anzeigen des Overlay bei 'click' auf die Karte
map.on('click', function(e) {
    let markup = '';
    // Iteration aller Features an der geklickten Position
    map.forEachFeatureAtPixel(e.pixel, function(feature){
        // Aufbau einer eigenen Tabelle
        markup += `${markup && '<hr>'}<table>`;

        // Iteration über alle Properties eines jeden Features
        const properties = feature.getProperties();
        for (const property in properties)  {
            // Hinzufügen einer Zeile innerhalb der Tabelle für jede Property
            markup += `<tr><th>${property}</th><td>${properties[property]}</td></tr>`;
        }
        markup += '</table>';
        // hitTolerance um es leichter zu gestalten auf eine Linie klicken
    }, {hitTolerance: 1}) ;
    if(markup)  {
        document.getElementById('popup-content').innerHTML = markup;
        overlay.setPosition(e.coordinate);
    } else {
        overlay.setPosition();
    }
});

map.addLayer(layer); 