var geolocs = [[-119.956,34.7906],[-119.948,34.8043],[-119.953,34.7975],[-119.959,34.7857],[-119.948,34.805],[-119.95,34.8016],[-119.958,34.784],[-119.949,34.8037],[-119.956,34.7819],[-119.959,34.7875],[-119.957,34.7813],[-119.956,34.7822],[-119.952,34.7981],[-119.946,34.8055],[-119.954,34.7944],[-119.956,34.7926],[-119.957,34.789],[-119.739,34.5691],[-119.951,34.7985],[-119.739,34.5692],[-119.949,34.801],[-119.947,34.8056],[-119.959,34.7845],[-119.946,34.8065],[-119.957,34.7812],[-119.951,34.7985],[-119.956,34.7913],[-119.947,34.8065],[-119.949,34.7991],[-119.953,34.7968],[-119.953,34.7977],[-119.955,34.794],[-119.947,34.8065],[-119.958,34.784],[-119.952,34.7981],[-119.958,34.7835],[-119.738,34.5685],[-119.951,34.8028],[-119.957,34.7824],[-119.952,34.798],[-119.957,34.7809],[-119.953,34.7979],[-119.959,34.7869],[-119.96,34.7862],[-119.956,34.7933],[-119.739,34.5692],[-119.956,34.7925],[-119.954,34.7944]];
var species = [2231,2276,1678,1937,2266,2269,2271,2277,1752,2080,2171,2072,2074,1963,2336,2320,1670,2026,1649,1650,1967,2088,1772,2142,2323,2177,2013,1701,1702,1779,2151,2191,2041,1838,2396,2037,1622,2182,1922,2257,1822,1880,1883,1696,1953,1833];

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