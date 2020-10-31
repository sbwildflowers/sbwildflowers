var geolocs = [[-119.966,34.7359],[-119.974,34.7487],[-119.96,34.757],[-119.966,34.7496],[-119.969,34.7303],[-119.966,34.7534],[-119.968,34.74],[-119.966,34.7359],[-119.969,34.7301],[-119.956,34.7582],[-119.972,34.7501],[-119.969,34.7299],[-119.969,34.7304],[-119.975,34.7472],[-119.966,34.7485],[-119.966,34.736],[-119.969,34.7437],[-119.968,34.7523],[-119.971,34.7453],[-119.967,34.7365],[-119.967,34.7365],[-119.966,34.7486],[-119.971,34.7301],[-119.97,34.7299],[-119.966,34.7332],[-119.974,34.7488],[-119.966,34.7486],[-119.968,34.7433],[-119.956,34.7584],[-119.968,34.7517],[-119.968,34.7398],[-119.974,34.7504],[-119.966,34.7486],[-119.973,34.7505],[-119.967,34.7525],[-119.974,34.7504],[-119.969,34.7314],[-119.974,34.7463],[-119.966,34.7486],[-119.96,34.757],[-119.968,34.7394],[-119.975,34.7483],[-119.974,34.7504],[-119.971,34.7453],[-119.965,34.7545],[-119.97,34.7298],[-119.972,34.7299],[-119.968,34.7517],[-119.975,34.7461],[-119.955,34.7584],[-119.97,34.7442],[-119.975,34.7474],[-119.964,34.7555],[-119.966,34.7496],[-119.971,34.7444],[-119.966,34.7502],[-119.964,34.7553],[-119.966,34.7518],[-119.976,34.7463],[-119.967,34.7511],[-119.968,34.7327],[-119.966,34.7497],[-119.968,34.7404],[-119.964,34.7555],[-119.966,34.7496],[-119.971,34.7301],[-119.966,34.7502],[-119.965,34.7543],[-119.969,34.7306],[-119.966,34.7532],[-119.968,34.7408],[-119.971,34.7301],[-119.959,34.7571],[-119.968,34.7427],[-119.97,34.7299],[-119.974,34.7464],[-119.965,34.7332],[-119.971,34.7502],[-119.97,34.7506],[-119.972,34.7501],[-119.967,34.7513],[-119.966,34.7496],[-119.967,34.7331],[-119.954,34.7578],[-119.966,34.7534],[-119.972,34.7503],[-119.969,34.7306],[-119.957,34.7575],[-119.966,34.7417],[-119.968,34.7395],[-119.955,34.7584]];
var species = [2189,1705,1621,1804,2252,1955,1998,1999,1715,1932,2266,2268,2074,2332,1913,2334,2335,2336,2320,1670,2026,1610,1726,1970,2087,2142,1905,1972,2273,1890,1857,1859,1863,2280,1811,2553,2198,2013,1682,2040,1745,1702,2217,2224,2191,2242,2041,1973,1689,2037,1617,1622,1983,1985,1987,1991,2181,1612,2400,2358,1614,2254,2257,2259,1822,2337,2034,2035,2288,1877,1882,1843,1696,1697,1953,2135,2188,2339,2291,2310];

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