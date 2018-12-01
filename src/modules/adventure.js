require('./base.js');
import '../../node_modules/leaflet/dist/leaflet.css';
require('../../node_modules/leaflet/dist/leaflet.js');
require('../../node_modules/bulma-carousel/dist/js/bulma-carousel.min.js');
import bulmaCarousel from '../../node_modules/bulma-carousel/dist/js/bulma-carousel.min.js';
require('./SnakeAnim.js');
import westTrip from './westTrip.json';
import westTripMarkers from './westTripMarkers.json';

if (process.env.NODE_ENV === 'development') {
  require('../views/adventure.pug')
  require('../views/layout.pug')
  require('../views/includes/head.pug')
  require('../views/includes/footer.pug')
  require('../views/includes/adventure-page.pug')
}


$(document).ready(function() { 
  var carousels = bulmaCarousel.attach();
});

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

  var myStyle = {
      "color": "#f18805",
      "weight": 3,
      "opacity": 0.65,
      "snakingSpeed": 500
  };

  L.geoJSON(westTrip, {
    style: myStyle 
  }).addTo(map).snakeIn();

var geojsonMarkerOptions = {
    radius: 8,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

  L.geoJSON(westTripMarkers, {
      onEachFeature: onEachFeature,
      pointToLayer: function (feature, latlng) {
          return L.marker(latlng, geojsonMarkerOptions);
      }
  }).addTo(map);

}; 


function onEachFeature(feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties && feature.properties.popupContent) {
        layer.bindPopup($('<a href="#" class="speciallink">'+feature.properties.popupContent+'</a>').click(function(event){
          event.preventDefault();
          openModal(feature.properties.modal);
        })[0]);
    }
}

function openModal(modalID) {
  $('.lazy_load').each(function(){
      var img = $(this);
      img.attr('src', img.data('src'));
  });
  var modal = document.querySelector('#' + modalID);
  var html = document.querySelector('html');
  modal.classList.add('is-active');
  html.classList.add('is-clipped');

  modal.querySelector('.modal-background').addEventListener('click', function(e) {
    e.preventDefault();
    modal.classList.remove('is-active');
    html.classList.remove('is-clipped');
  });
  modal.querySelector('#close-modal').addEventListener('click', function(e) {
    e.preventDefault();
    modal.classList.remove('is-active');
    html.classList.remove('is-clipped');
  });


}

initmap()
