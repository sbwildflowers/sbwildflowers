var geolocs = [[-119.5,34.3876],[-119.528,34.3965],[-119.486,34.3837],[-119.528,34.4003],[-119.527,34.3969],[-119.499,34.3869],[-119.5,34.3878],[-119.528,34.4002],[-119.496,34.3857],[-119.528,34.3965],[-119.527,34.3981],[-119.499,34.3865],[-119.499,34.3862],[-119.5,34.3878],[-119.496,34.3857],[-119.528,34.3964],[-119.506,34.3854],[-119.5,34.3878],[-119.487,34.3844],[-119.495,34.3855],[-119.5,34.3878],[-119.528,34.3964],[-119.528,34.4003],[-119.487,34.3844],[-119.486,34.3838],[-119.486,34.3837],[-119.528,34.4002],[-119.488,34.3847],[-119.528,34.3965],[-119.487,34.3844],[-119.487,34.3844],[-119.506,34.3855],[-119.499,34.3869],[-119.496,34.3857],[-119.506,34.3854],[-119.5,34.3878],[-119.528,34.3965],[-119.528,34.3964],[-119.527,34.3974],[-119.528,34.4003],[-119.495,34.3855],[-119.529,34.4003],[-119.499,34.3864],[-119.499,34.3862],[-119.529,34.4004],[-119.5,34.386],[-119.5,34.3878],[-119.497,34.3856]];
var species = [2231,1764,2584,1707,1708,2048,1715,1717,2069,1649,1766,1725,2094,2158,1727,2068,1733,1735,1737,2151,2244,2179,2402,2184,2288,2290,2055,1882,1885,1795,1949,2064,2441];

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