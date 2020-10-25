var geolocs = [[-119.706,34.4748],[-119.716,34.4923],[-119.717,34.4861],[-119.715,34.4944],[-119.714,34.4822],[-119.715,34.4939],[-119.714,34.4827],[-119.715,34.4938],[-119.717,34.486],[-119.715,34.4854],[-119.717,34.4874],[-119.716,34.4932],[-119.717,34.4865],[-119.706,34.4753],[-119.716,34.4923],[-119.717,34.4861],[-119.717,34.4865],[-119.717,34.486],[-119.716,34.4862],[-119.716,34.4924],[-119.717,34.4892],[-119.711,34.4798],[-119.716,34.4899],[-119.716,34.4864],[-119.717,34.4875],[-119.715,34.4944],[-119.716,34.4855],[-119.716,34.4912],[-119.717,34.4874],[-119.717,34.4894],[-119.717,34.486],[-119.714,34.4828],[-119.717,34.4861],[-119.715,34.4853],[-119.715,34.4853],[-119.717,34.4892],[-119.714,34.4946],[-119.715,34.4845],[-119.714,34.4821],[-119.715,34.4936],[-119.713,34.482],[-119.717,34.4868],[-119.714,34.4821],[-119.716,34.4908],[-119.717,34.4871],[-119.717,34.4861],[-119.715,34.4827],[-119.716,34.4898],[-119.715,34.4938],[-119.716,34.4897],[-119.716,34.4926],[-119.715,34.4945],[-119.717,34.487],[-119.716,34.4858],[-119.717,34.4885],[-119.717,34.4861],[-119.716,34.4862],[-119.707,34.4774],[-119.716,34.4897],[-119.716,34.4923],[-119.717,34.4866],[-119.716,34.4864],[-119.717,34.4865],[-119.714,34.4839],[-119.717,34.4892],[-119.716,34.4932],[-119.716,34.4862],[-119.706,34.4757],[-119.717,34.486],[-119.716,34.493],[-119.714,34.4834],[-119.714,34.482],[-119.716,34.4901],[-119.709,34.4786],[-119.715,34.4849],[-119.717,34.4891],[-119.714,34.4821]];
var species = [2232,2276,1910,1998,1999,1615,1600,1674,2265,2270,2271,2277,2074,2458,1963,2334,2320,1670,1610,1649,1650,1970,2087,1972,1851,2147,1667,1811,2013,2192,2193,2524,1617,1618,1622,1986,2241,1612,2285,1748,1750,2103,2260,2275,2185,2034,1883,1696,1607,1953,1826,2027,1703,1683,2379];

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