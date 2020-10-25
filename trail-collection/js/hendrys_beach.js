var geolocs = [[-119.752,34.4048],[-119.77,34.4108],[-119.752,34.4046],[-119.752,34.4048],[-119.743,34.4025],[-119.765,34.4093],[-119.765,34.4093],[-119.765,34.4093],[-119.775,34.4163],[-119.752,34.4046],[-119.786,34.4168],[-119.764,34.4091],[-119.755,34.4058],[-119.771,34.4108],[-119.743,34.4025],[-119.756,34.4061],[-119.743,34.4038],[-119.765,34.4093],[-119.743,34.404],[-119.743,34.404],[-119.765,34.4093],[-119.775,34.4162],[-119.765,34.4093]];
var species = [2075,1763,2421,2048,2049,2390,2114,2116,1808,2333,1648,1766,2094,1818,1947,2426,2184,2288,2056,1843,1949,2057,2045,2291,1840];

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