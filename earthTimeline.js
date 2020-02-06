// import * as lib from './node_modules/@aaronpkelly/libradoodle-javascript/javascript.js';

var map;
var myJson;
var currYear = -9605;
var yearIncrement = 100;
var markers = [];
var markersActive = new Map();

const INPUT_FILE="input.json"

function checkYear() {
	for (var key in myJson) {
		if (myJson.hasOwnProperty(key)) {
			var founded = myJson[key].founded;
			var abandoned = myJson[key].abandoned;
		
			if ((currYear >= founded) && (currYear <= abandoned)) {
				var marker = createMarker(key);
				markers.push(marker);
				setMarkerBoolean(key, true);
				appendMessage(myJson[key].city + " is standing");
			} else {
				setMarkerBoolean(key, false);
			}
		}
	}
	redrawMarkers();
}

function clearMessage() {
	var messageArea = document.getElementById('messageArea');
	messageArea.innerHTML = '';
}

function createMarker(key) {
        var myLatLng = {lat: myJson[key].lat, lng: myJson[key].lng};

	var marker = new google.maps.Marker({
		label: myJson[key].city,
		position: myLatLng,
		map: map,
		title: myJson[key].name
	});
	return marker;
}



function hasMarker(marker) {
	for (var e in markers ) {
		if (e === marker) {
			return true;
		}
	}
	return false;
}

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 31.52,
      lng: 35.26
    },
    draggable: true,
    keyboardShortcuts: false,
    zoom: 6
  });
}

function keyCode(event) {
	
	clearMessage();
	
    var x = event.keyCode;
    if (x == 38) {
		yearIncrement *= 10;
		appendMessage("Year incremenent is now: " + yearIncrement);
    }
    if (x == 39) { // ->
		currYear += yearIncrement;
    }
    if (x == 40) {
		yearIncrement /= 10;
		appendMessage("Year incremenent is now: " + yearIncrement);
    }
    if (x == 37) { // <-
		currYear -= yearIncrement;
    }
    appendMessage("The year is now: " + currYear);
    checkYear();
}

function redrawMarkers() {
	for (var i = 0; i < markers.length; i++) {
		markers[i].setMap(null);
	}

	markers = [];

	for (var key in myJson) {
		if (markersActive[myJson[key].city] == true) {
			var marker = createMarker(key);
			markers.push(marker);
		}
	}
}
		
function saveJson(json) {
	myJson = json;
}

function appendMessage(message) {
	var messageArea = document.getElementById('messageArea');
	messageArea.innerHTML = messageArea.innerHTML + '<br>' + message;
}

function setMarkerBoolean(key, bool) {
	markersActive[myJson[key].city] = bool;
}

myJson = getJSONFromLocalFile(INPUT_FILE);