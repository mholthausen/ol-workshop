// Import der benötigten Pakete und StyleSources aus "ol"
import 'ol/ol.css';
import GeoJSON from 'ol/format/GeoJSON'
import Map from 'ol/Map';
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import View from 'ol/View';
import sync from 'ol-hashed';
import DragAndDrop from 'ol/interaction/DragAndDrop';
import Modify from 'ol/interaction/Modify';
import Draw from 'ol/interaction/Draw';
import Snap from 'ol/interaction/Snap';

// Generierung der Instanz "Map", die eine Konstruktorfunktion besitzt und den Typ der 
// Objektinstanz spezifiziert, Zuordnung der Karte der Konstante "map"
const map = new Map({
    //target gibt das Ziel an, hier den map-container in index.html
    target: 'map-container',
    //view definiert die intialen 'center' und 'zoom' - Positionen
    view: new View({
       center: [0,0], 
       zoom: 2
    })
});

// Vektor-Quelle ohne Daten um sie per Drag&Drop hinzufügen zu können
const source = new VectorSource();

// Neuer Layer mit der leeren Vektor-Quelle
// Layer der Karte map hinzufügen
const layer = new VectorLayer({
    source: source
  });
map.addLayer(layer);

// Drag & Drop Interaktion
map.addInteraction(new DragAndDrop({ 
    source: source, 
    formatConstructors: [GeoJSON] 
})); 

// Modify Interaction
map.addInteraction(new Modify({
    source: source,
}))

// Draw Interaction
map.addInteraction(new Draw({
    type: "Polygon",
    source: source,
}))

// Snap Interaction
map.addInteraction(new Snap({
    source: source,
}))

// Clear Interaction
const clear = document.getElementById('clear');
clear.addEventListener('click', function() {
    source.clear();
})

// Download Data (GeoJSON)
const format = new GeoJSON({featureProjection: 'EPSG:3857'});
const download = document.getElementById('download');
source.on('change', function() {
    const features = source.getFeatures();
    const json = format.writeFeatures(features);
    download.href = 'data:text/json;charset=utf-8,' + json;
});
