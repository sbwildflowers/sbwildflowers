var subSightings = [[-119.758,34.5681],[-119.756,34.5726],[-119.753,34.5048],[-119.626,34.5345],[-119.611,34.4973],[-119.754,34.5071],[-119.621,34.5365],[-119.755,34.5076],[-119.756,34.5724],[-119.755,34.5075],[-119.756,34.5725],[-119.755,34.5078],[-119.753,34.5726],[-119.753,34.5727],[-119.755,34.5727],[-119.754,34.507],[-119.752,34.5731],[-120.044,34.742],[-119.758,34.568],[-119.752,34.573],[-119.609,34.5023],[-119.351,34.6035],[-119.756,34.5728],[-119.755,34.5079],[-119.757,34.5691],[-119.76,34.5666],[-119.321,34.6959],[-119.751,34.6071],[-119.754,34.5072],[-119.755,34.5074],[-119.609,34.5024],[-119.75,34.5734],[-119.634,34.5101],[-119.622,34.5362],[-119.753,34.5049],[-119.755,34.5077]];
$(document).ready(function() {
	var vectorSource = new ol.source.Vector({
      //create empty vector
    });

	//create a bunch of icons and add to source vector
	subSightings.forEach(function(item,index) {
		var iconFeature = new ol.Feature({
		          geometry: new  
		            ol.geom.Point(ol.proj.fromLonLat(item)),
		        name: 'Flower'
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

	$('.sightings-wrapper tbody tr .locate').click(function() {
		$('.sightings-wrapper tr').each(function() {
			$(this).removeClass('active');
		});
		$(this).parent('tr').addClass('active');
		lat = parseFloat($(this).siblings('.lat').text());
		lon = parseFloat($(this).siblings('.lon').text());
        map.getView().animate({
          center: ol.proj.fromLonLat([lon,lat]),
          duration: 2000,
          zoom: 18
        });
        var elmnt = document.getElementById('map-wrapper');
		elmnt.scrollIntoView();
    });

	var extent = vectorLayer.getSource().getExtent();
	map.getView().fit(extent, map.getSize());

	$('.map-wrapper button').click(function() {
		map.getView().fit(extent, map.getSize());
	});
});