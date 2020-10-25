var geolocs = [[-119.79,34.5395],[-119.789,34.5378],[-119.79,34.5364],[-119.789,34.5374],[-119.791,34.5342],[-119.791,34.5316],[-119.79,34.5354],[-119.79,34.5355],[-119.793,34.5271],[-119.791,34.5327],[-119.79,34.5355],[-119.789,34.5368],[-119.79,34.5395],[-119.792,34.542],[-119.792,34.5284],[-119.789,34.5374],[-119.79,34.5407],[-119.797,34.5248],[-119.791,34.5321],[-119.792,34.5405],[-119.793,34.5208],[-119.798,34.5256],[-119.793,34.5269],[-119.79,34.5356],[-119.797,34.527],[-119.789,34.5374],[-119.794,34.5196],[-119.789,34.5387],[-119.79,34.5366],[-119.789,34.5381],[-119.797,34.526],[-119.79,34.5397],[-119.79,34.5364],[-119.791,34.5314],[-119.79,34.537],[-119.792,34.5406],[-119.791,34.5337],[-119.79,34.5391],[-119.791,34.5343],[-119.791,34.5328],[-119.79,34.5354],[-119.791,34.5342],[-119.79,34.5367],[-119.793,34.5272],[-119.791,34.5324],[-119.79,34.5388],[-119.797,34.5262],[-119.789,34.5381],[-119.792,34.5277],[-119.79,34.5345],[-119.797,34.526],[-119.794,34.5221],[-119.792,34.5409],[-119.793,34.5269],[-119.789,34.5374],[-119.79,34.5366],[-119.791,34.5339],[-119.792,34.5407],[-119.792,34.542],[-119.793,34.5404],[-119.79,34.5356],[-119.797,34.5263],[-119.79,34.5348],[-119.793,34.541],[-119.789,34.5377],[-119.796,34.5267],[-119.79,34.5398],[-119.791,34.541],[-119.794,34.5224],[-119.794,34.5194],[-119.791,34.5307],[-119.79,34.5357],[-119.791,34.5314],[-119.797,34.5267]];
var species = [1835,2276,1621,1955,2531,2584,1998,1600,1715,1716,1668,1671,1674,1678,1679,1937,2118,1895,2265,2270,2272,2277,1798,1800,2363,2165,2074,2332,1718,1942,1700,2334,2026,1610,2029,1649,2087,2088,1731,1667,2280,1811,2125,1915,1872,1793,2013,2191,1838,2021,2037,1617,1991,1922,2317,1612,2285,1749,2254,2257,2259,2260,1822,2185,1877,1883,1843,1695,1696,1829,2392,2188,1888,2339,1788];

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