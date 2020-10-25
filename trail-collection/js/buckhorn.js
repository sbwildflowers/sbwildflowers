var geolocs = [[-119.717,34.5849],[-119.735,34.6073],[-119.715,34.5888],[-119.727,34.5918],[-119.719,34.586],[-119.715,34.5889],[-119.72,34.5907],[-119.721,34.5835],[-119.723,34.59],[-119.723,34.5845],[-119.731,34.5755],[-119.717,34.5849],[-119.715,34.5888],[-119.715,34.5829],[-119.715,34.5829],[-119.721,34.5835],[-119.735,34.6052],[-119.719,34.59],[-119.724,34.5809],[-119.73,34.5768],[-119.721,34.5848],[-119.735,34.6054],[-119.723,34.5833],[-119.732,34.5712],[-119.717,34.5845],[-119.733,34.6096],[-119.728,34.5908],[-119.717,34.5855],[-119.732,34.5708],[-119.721,34.5868],[-119.735,34.5999],[-119.727,34.5772],[-119.732,34.5976],[-119.732,34.6108],[-119.721,34.5835],[-119.721,34.5835],[-119.717,34.5856],[-119.722,34.5846],[-119.724,34.5815],[-119.732,34.6105],[-119.717,34.5845],[-119.715,34.5834],[-119.734,34.5993],[-119.719,34.586],[-119.717,34.5849],[-119.723,34.5899],[-119.715,34.5889],[-119.733,34.5988],[-119.72,34.5905],[-119.717,34.5848],[-119.729,34.5767],[-119.723,34.591],[-119.732,34.5716],[-119.717,34.5856],[-119.732,34.5974],[-119.732,34.5961],[-119.713,34.588],[-119.724,34.5809],[-119.732,34.5968],[-119.724,34.5894],[-119.733,34.5979],[-119.72,34.5905],[-119.723,34.5899],[-119.721,34.5835],[-119.732,34.5976],[-119.729,34.5767],[-119.733,34.6102],[-119.722,34.5852],[-119.724,34.5809],[-119.724,34.5897],[-119.716,34.5837],[-119.732,34.5708],[-119.721,34.5868],[-119.732,34.5769],[-119.733,34.5989]];
var species = [1835,2276,1804,1998,1707,1715,2113,1759,1673,2266,2270,2277,1718,2320,1610,1649,1719,1968,2083,2087,2088,1972,2177,1890,1857,1850,1731,1667,2280,1735,2353,1914,2013,1845,2404,2151,1817,2191,2396,1617,1917,1983,1986,2355,2285,2358,2254,2260,2185,2034,1880,1882,1883,1843,1794,1826,1829,1683,2339];

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