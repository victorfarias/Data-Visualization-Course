var map = L.map('map').setView([-15,-52], 4.5);

// map.createPane('labels');
// map.getPane('labels').style.zIndex = 650;
// map.getPane('labels').style.pointerEvents = 'none';



map.touchZoom.disable();
map.doubleClickZoom.disable();
map.scrollWheelZoom.disable();
map.boxZoom.disable();
map.keyboard.disable();
map.dragging.disable();

// control that shows state info on hover
var info = L.control();

info.onAdd = function (map) {
	this._div = L.DomUtil.create('div', 'info');
	this.update();
	return this._div;
};

info.update = function (props) {
	this._div.innerHTML = '<h4>Quantidade de votos</h4>' +  (props ?
		'<h2 style="color:"#02008b;"> '    + props.name  +
		'<h3 style="color:#3288bd;">Sim: ' + props.sim +
		'<h3 style="color:#d53e4f;">Não: ' + props.nao
		: 'Selecione um estado');
};

info.addTo(map);	


var y = d3.scale.linear()
  .domain([-7,0,7])
  .range(["#d53e4f", "#d8d1d1", "#12048b"]);
  //.range(["#b2182b", "#ef8a62", "#fddbc7", "#f7f7f7", "#d1e5f0", "#67a9cf", "#2166ac"]);

function style(feature) {
	return {
		weight: 1,
		opacity: 1,
		color: 'white',
		dashArray: '2',
		fillOpacity: 0.6,
		//fillColor: getColor(feature.properties.sim - feature.properties.nao)
		fillColor: y(feature.properties.sim - feature.properties.nao)
	};
}

L.geoJson(cidadesBrasil, {style: style}).addTo(map);

function highlightFeature(e) {

	map.eachLayer(function (layer) {
		layer.setStyle({
		weight: 1,
		opacity: 1,
		color: 'white',
		dashArray: '2',
		fillOpacity: 0.6
		});
	});

	var layer = e.target;

	layer.setStyle({
		weight: 5,
		color: 'white',
		dashArray: '',
		fillOpacity: 0.7
	});

	if (!L.Browser.ie && !L.Browser.opera) {
		layer.bringToFront();
	}

	info.update(layer.feature.properties);
}

var geojson;

function resetHighlight(e) {
	geojson.resetStyle(e.target);
	info.update();
}

function zoomToFeature(e) {
	map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
	layer.on({
		//mouseover: highlightFeature,
		//mouseout: resetHighlight,
		//click: zoomToFeature
		click: highlightFeature
	});
}

geojson = L.geoJson(cidadesBrasil, {
	style: style,
	onEachFeature: onEachFeature
}).addTo(map);

map.attributionControl.addAttribution('Population data &copy; <a href="http://census.gov/">US Census Bureau</a>');

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

	var div = L.DomUtil.create('div', 'info legend'),
		grades = [-7,0,5,10,20],
		labels = [],
		from, to;

	for (var i = 0; i < grades.length; i++) {
		from = grades[i];
		to = grades[i + 1];

		labels.push(
			'<i style="background:' + y(from + 1) + '"></i> ' +
			from + (to ? '&ndash;' + to : '+'));
	}

	div.innerHTML = labels.join('<br>');
	return div;
};

legend.addTo(map);
















