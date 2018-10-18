// Import der benötigten Pakete und StyleSources aus "ol"
import 'ol/ol.css';
import GeoJSON from 'ol/format/GeoJSON'
import Map from 'ol/Map';
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import View from 'ol/View';
import sync from 'ol-hashed';

// Generierung der Instanz "Map", die eine Konstruktorfunktion besitzt und den Typ der 
// Objektinstanz spezifiziert, Zuordnung der Karte der Konstante "map"
let map = new Map({
    //target gibt das Ziel an, hier den map-container in index.html
    target: 'map-container',
    //layers konfiguriert die Karte mit einem in Kacheln (tiles) unterteilten TileLayer und
    //einer XYZSource
    layers: [
        new VectorLayer({
            source: new VectorSource({
                format: new GeoJSON(),
                url: './data/countries.json',
            })
        })
    ],
    //view definiert die intialen 'center' und 'zoom' - Positionen
    view: new View({
       center: [0,0], 
       zoom: 2
    })
});

sync(map);