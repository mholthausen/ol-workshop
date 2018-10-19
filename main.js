import 'ol/ol.css'; 
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZSource from 'ol/source/XYZ';
import {fromLonLat} from 'ol/proj';


new Map({
    target: 'map-container',
    layers: [
        new TileLayer({
            source: new XYZSource({
                url: 'http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg'
            })
        })
    ],
    // Startposition und Zoomstufe angeben
    view: new View({
        center: fromLonLat([6.936111, 50.9275]),
        zoom: 16,
    })
})
