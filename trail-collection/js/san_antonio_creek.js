var geolocs = [[-119.745,34.4928],[-119.748,34.4895],[-119.747,34.4908],[-119.747,34.4912],[-119.747,34.491],[-119.747,34.4915],[-119.745,34.4932],[-119.745,34.4927],[-119.751,34.5021],[-119.751,34.502],[-119.747,34.4909],[-119.751,34.5021],[-119.745,34.4927],[-119.747,34.4903],[-119.747,34.4903],[-119.749,34.5004],[-119.748,34.4893],[-119.745,34.4928],[-119.747,34.491],[-119.747,34.4909],[-119.751,34.5021],[-119.747,34.4912],[-119.748,34.4894],[-119.747,34.4909],[-119.745,34.4927],[-119.751,34.502],[-119.749,34.4881],[-119.776,34.4616],[-119.747,34.4915],[-119.748,34.4892]];
var species = [1716,1717,2118,2270,2171,2335,1670,1902,2173,2087,2516,1851,2553,2237,2624,1845,1779,2490,1991,2035,2036,1843,1696,1928,1869,1829,2027,1846,2339,2403];

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