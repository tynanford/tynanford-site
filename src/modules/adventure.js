require('./base.js');
import '../../node_modules/leaflet/dist/leaflet.css';
require('../../node_modules/leaflet/dist/leaflet.js');

if (process.env.NODE_ENV === 'development') {
  require('../adventure.html')
}

var map;
var ajaxRequest;
var plotlist;
var plotlayers=[];

function initmap() {
  
	// set up the map
	map = new L.Map('map');

	// create the tile layer with correct attribution
	var osmUrl='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	var osmAttrib='Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';
	var osm = new L.TileLayer(osmUrl, {minZoom: 1, maxZoom: 15, attribution: osmAttrib});		

	// start the map in lat long location 
	map.setView(new L.LatLng(39.5, -98.350),4);
	map.addLayer(osm);
}

initmap()
