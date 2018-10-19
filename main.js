import 'ol/ol.css'; 
import Overlay from 'ol/Overlay';
import {apply} from 'ol-mapbox-style';

const map =  apply('map-container', './data/bright.json');

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