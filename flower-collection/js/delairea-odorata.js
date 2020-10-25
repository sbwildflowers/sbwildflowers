var subSightings = [[-119.727,34.4738],[-119.598,34.4574],[-119.656,34.4613],[-119.652,34.4563],[-119.81,34.4254],[-119.81,34.4253],[-119.623,34.4578],[-119.726,34.4749],[-119.636,34.4572],[-119.726,34.4753],[-119.81,34.4251],[-119.653,34.4567],[-119.729,34.4723],[-119.592,34.4596],[-119.65,34.4572],[-119.651,34.4562],[-119.815,34.4234],[-119.732,34.462],[-119.65,34.457],[-119.611,34.4554],[-119.593,34.4569],[-119.726,34.4752],[-119.654,34.4574],[-119.729,34.471],[-119.65,34.4571],[-119.728,34.4592],[-119.612,34.4528],[-119.826,34.4225],[-119.81,34.4255],[-119.652,34.4561],[-119.597,34.4574],[-119.726,34.475],[-119.586,34.4548],[-119.811,34.4249],[-119.653,34.456],[-119.651,34.456],[-119.65,34.4581],[-119.726,34.4751],[-119.808,34.4279],[-119.31,34.2771],[-119.312,34.2778],[-119.592,34.4594],[-119.657,34.4638],[-119.653,34.4566],[-119.632,34.4588],[-119.816,34.4237],[-119.592,34.4597],[-119.652,34.4625],[-119.611,34.4529],[-119.649,34.4636],[-119.635,34.4606],[-119.654,34.4569],[-119.591,34.4533],[-119.597,34.4577],[-119.65,34.4575],[-119.61,34.4551],[-119.725,34.4762],[-119.639,34.4549],[-119.654,34.4588],[-119.611,34.4492],[-119.64,34.4629],[-119.811,34.4248],[-119.728,34.4608],[-119.314,34.2794],[-119.639,34.4602],[-119.611,34.4545],[-119.652,34.4562],[-119.728,34.4731],[-119.728,34.4727],[-119.65,34.4574],[-119.727,34.4739],[-119.611,34.4552],[-119.653,34.4562],[-119.65,34.4582],[-119.729,34.4722],[-119.65,34.4576],[-119.612,34.4547],[-119.64,34.463],[-119.654,34.4571],[-119.609,34.4547],[-119.729,34.4608]];
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