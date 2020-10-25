var geolocs = [[-119.826,34.4217],[-119.826,34.4213],[-119.826,34.4213],[-119.826,34.4218],[-119.824,34.4228],[-119.824,34.4227],[-119.834,34.4171],[-119.825,34.4223],[-119.829,34.421],[-119.833,34.4174],[-119.826,34.4218],[-119.829,34.421],[-119.831,34.4176],[-119.829,34.4175],[-119.826,34.4222],[-119.824,34.4228],[-119.834,34.4171],[-119.824,34.4226],[-119.824,34.4226],[-119.826,34.4215],[-119.831,34.4179],[-119.831,34.418],[-119.824,34.4224],[-119.826,34.4218],[-119.831,34.4176],[-119.826,34.4219],[-119.826,34.4218],[-119.83,34.4205],[-119.826,34.4217],[-119.826,34.4218],[-119.825,34.422],[-119.825,34.4223]];
var species = [1764,2409,2421,2422,1708,1715,2114,2119,1941,1766,2364,2068,2420,1966,1733,2125,1814,2151,2424,1987,2427,2418,1749,2184,2290,2055,1949,2392,1931];

$(document).ready(function() {
	var vectorSource = new ol.source.Vector({
      //create empty vector
    });

	//create a bunch of icons and add to source vector
	geolocs.forEach(function(item,index) {
		var iconFeature = new ol.Feature({
		          geometry: new  
		            ol.geom.Point(ol.proj.fromLonLat(item)),
		        name: 'Flower',
		        coords: 'hi' 
		});
		vectorSource.addFeature(iconFeature);
	});

    //create the style
    var iconStyle = new ol.style.Style({
      image: new ol.style.Icon( ({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        opacity: 0.75,
        src: '../flower.png'
      }))
    });

    //add the feature vector to the layer vector, and apply a style to whole layer
    var vectorLayer = new ol.layer.Vector({
      source: vectorSource,
      style: iconStyle
    });

	var attribution = new ol.control.Attribution({
	     collapsible: false
	 });

	 var map = new ol.Map({
	     controls: ol.control.defaults({attribution: false}).extend([attribution]),
	     layers: [
	         new ol.layer.Tile({
	             source: new ol.source.OSM()
	         }),
	         vectorLayer
	     ],
	     target: 'map',
	     view: new ol.View({
	         center: ol.proj.fromLonLat([-119.644, 34.5158]),
	         zoom: 15,
	         maxZoom: 20
	     })
	 });

	// display popup on click
	map.on('click', function (evt) {
	  var feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
	    return feature;
	  });
	  console.log($(element));
	  if (feature) {
	    var coordinates = feature.getGeometry().getCoordinates();
	    var lonlat = ol.proj.transform(coordinates, 'EPSG:3857', 'EPSG:4326');
	    console.log(lonlat);
	  }
	});

	var extent = vectorLayer.getSource().getExtent();
	map.getView().fit(extent, map.getSize());
});