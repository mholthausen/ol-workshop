// Import der benötigten Pakete und StyleSources aus "ol"
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZSource from 'ol/source/XYZ';

// Generierung der Instanz "Map", die eine Konstruktorfunktion besitzt und den Typ der Objektinstanz spezifiziert
new Map({
    //target gibt das Ziel an, hier den map-container in index.html
    target: 'map-container',
    //layers konfiguriert die Karte mit einem in Kacheln (tiles) unterteilten TileLayer und
    //einer XYZSource
    layers: [
        new TileLayer({
            source: new XYZSource({
                url: 'http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg'
            })
        })
    ],
    //view definiert die intialen center und zoom - Positionen
    view: new View({
       center: [0,0], 
       zoom: 2
    })
});
