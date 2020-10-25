var geolocs = [[-119.983,34.757],[-120.044,34.742],[-119.986,34.7348],[-120.064,34.7368],[-119.963,34.7588],[-119.959,34.7587],[-120.012,34.7375],[-120.009,34.738],[-120.064,34.7366],[-119.957,34.7612],[-120.064,34.7366],[-119.962,34.7585],[-119.985,34.7341],[-119.969,34.7602],[-119.986,34.7352],[-119.969,34.7226],[-119.959,34.7588],[-119.969,34.7226],[-120.044,34.743],[-119.969,34.7226],[-120.058,34.7403],[-119.959,34.7589],[-119.976,34.7315],[-119.961,34.7587],[-120.065,34.7369],[-120.062,34.741],[-119.969,34.7226],[-120.065,34.7368],[-120.013,34.7402],[-120.008,34.7376],[-119.983,34.7561],[-119.976,34.7591],[-120.044,34.742],[-119.957,34.7592],[-119.969,34.7225],[-119.972,34.7304],[-120.065,34.7368],[-119.966,34.76],[-119.957,34.7612],[-119.966,34.76],[-120.013,34.7413],[-120.064,34.7368],[-119.974,34.7586],[-120.044,34.742],[-119.956,34.7596],[-119.957,34.7612],[-119.948,34.7152],[-119.963,34.7606],[-120.009,34.738],[-119.957,34.7592],[-120.001,34.735],[-119.976,34.7571],[-119.963,34.7585],[-119.962,34.7599],[-119.997,34.7364],[-120.034,34.7432],[-119.974,34.7586],[-120.01,34.7392],[-119.959,34.7606],[-119.974,34.7592],[-120.043,34.7428],[-120.001,34.7352],[-119.96,34.7597],[-119.995,34.7367],[-119.995,34.7369],[-119.962,34.7586],[-119.965,34.7601],[-119.984,34.7334],[-119.987,34.7363],[-119.966,34.76],[-120.064,34.7372],[-120.034,34.7434],[-119.989,34.736],[-119.957,34.7592],[-119.997,34.7364],[-120.064,34.7368],[-120.044,34.742],[-120.009,34.7387],[-119.967,34.7604],[-119.997,34.736],[-119.995,34.7368],[-120.058,34.7404],[-120.033,34.7432],[-120.014,34.741],[-119.973,34.7598],[-120,34.7353],[-120.058,34.7408],[-120.009,34.738],[-119.964,34.7609],[-120.001,34.7352],[-119.956,34.7599],[-119.995,34.7367],[-119.995,34.7369],[-119.99,34.7361],[-119.959,34.7588],[-119.996,34.7361],[-120.066,34.74],[-119.995,34.7367],[-120.06,34.7387],[-119.961,34.7592],[-119.976,34.759],[-120.013,34.7413],[-120.034,34.7432],[-120.044,34.742],[-119.984,34.7565],[-119.966,34.76],[-119.982,34.7578],[-119.994,34.737],[-119.956,34.7608],[-120.065,34.737],[-119.957,34.7612],[-120.008,34.7375],[-120.011,34.7409],[-119.976,34.7572],[-120.034,34.7434],[-119.959,34.7599],[-120.058,34.7408],[-119.963,34.7589],[-119.983,34.757],[-120.064,34.7372],[-120.008,34.7375],[-119.947,34.7128],[-119.957,34.7609],[-120.066,34.74],[-119.962,34.7585],[-120.065,34.7369],[-120.001,34.7352],[-119.983,34.7562],[-119.96,34.7593],[-120.058,34.7401],[-119.957,34.7592],[-119.958,34.7593],[-120.008,34.7374],[-120.064,34.737],[-119.96,34.7595],[-120.008,34.7371],[-119.966,34.76],[-119.983,34.7562],[-120.06,34.7382],[-120.058,34.7402],[-119.998,34.7364],[-120.022,34.7412],[-119.983,34.7562],[-120.064,34.7368],[-119.963,34.7607],[-120.013,34.7402],[-119.968,34.76],[-120.033,34.7432],[-119.959,34.7603],[-120.058,34.7402],[-119.956,34.7604],[-120.062,34.7411]];
var species = [2189,2230,2233,2234,1835,2276,1662,1664,1955,2531,1909,1998,1999,1854,1640,1668,2069,1672,1673,1932,1937,2162,2163,2117,2118,1892,1895,2121,2266,2271,2277,1752,2080,1799,2074,2332,1913,2444,1961,1963,2336,2320,1670,2026,1650,1967,1970,2087,2088,1772,2142,2124,2323,2324,2177,1890,1857,1859,1863,2011,2012,2125,2732,2731,2353,1915,1814,1653,1773,1774,2198,2013,2016,1755,2040,1702,2213,2217,2219,2224,2226,2227,2228,2404,2191,2242,2020,1689,1622,1985,1987,1991,2182,2355,1922,2330,2285,2254,2257,2258,2259,1822,2368,2337,2034,1877,1880,1882,1885,1843,1695,1696,2061,2133,1684,1953,2690,1703,2135,2188,1683,1888,1833,2310];

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