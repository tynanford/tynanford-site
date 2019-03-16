require('./base.js');
import '../../node_modules/leaflet/dist/leaflet.css';
require('../../node_modules/leaflet/dist/leaflet.js');
require('../../node_modules/bulma-carousel/dist/js/bulma-carousel.min.js');
import bulmaCarousel from '../../node_modules/bulma-carousel/dist/js/bulma-carousel.min.js';
require('./SnakeAnim.js');


if (process.env.NODE_ENV === 'development') {
  require('../views/adventure.pug');
  require('../views/includes/nav.pug');
  require('../views/layout.pug');
  require('../views/includes/head.pug');
  require('../views/includes/footer.pug');
  require('../views/includes/adventure-page.pug');
}

var map_initialized = false;

$(document).ready(function() { 
  var carousels = bulmaCarousel.attach();
  $("#mapModalButton").click(function(){
    setTimeout(function() {
      map.invalidateSize();
    }, 10);
    // lazy load json files since they're pretty huge
    if (!map_initialized) {
      import(/* webpackChunkName: "westTrip" */ './westTrip.json').then( module => {
          var westTrip = module;
          import(/* webpackChunkName: "westTripMarkers" */ './westTripMarkers.json').then( module => {
            initmap(westTrip, module);
          });
      });
      map_initialized = true;
    }
    openModal("mapModal");
  });
});


function initmap(lineJson, markersJson) {
  // set up the map
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('../../node_modules/leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('../../node_modules/leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('../../node_modules/leaflet/dist/images/marker-shadow.png')
  });
	var map = new L.Map('map', {
    center: [40.7, -104.5],
    zoom: 4.85,
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

  L.geoJSON(lineJson, {
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

  L.geoJSON(markersJson, {
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

function closeModal(e, modal) {
  e.preventDefault();
  modal.classList.remove('is-active');
  html.classList.remove('is-clipped');
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
    closeModal(e, modal);
  });
  modal.querySelector('#close-modal').addEventListener('click', function(e) {
    closeModal(e, modal);
  });
}
