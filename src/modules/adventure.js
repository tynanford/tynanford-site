require('./base.js');
import '../../node_modules/leaflet/dist/leaflet.css';
import '../../node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.css';
require('../../node_modules/leaflet/dist/leaflet.js');
require('../../node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.js');
import westTrip from './westTrip.json';

if (process.env.NODE_ENV === 'development') {
  require('../adventure.html')
}

var map;
var ajaxRequest;
var plotlist;
var plotlayers=[];

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('../../node_modules/leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('../../node_modules/leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('../../node_modules/leaflet/dist/images/marker-shadow.png')
});

function initmap() {
  
	// set up the map
	map = new L.Map('map', {
    center: [39.5, -96.5],
    zoom: 4.5,
    zoomSnap: 0
  });

  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: 'pk.eyJ1IjoidHluYW5mb3JkIiwiYSI6ImNqbWd5OG4wbTdhY2szcHA0ZTQycjQxN2sifQ.j-Q0ol0KCdnQcjky7ULD0g'
  }).addTo(map);

  //var marker = L.marker([39.5, -97]).addTo(map);
  //marker.bindPopup("Tynan Ford");

  L.geoJSON(westTrip).addTo(map);

}; 


initmap()
