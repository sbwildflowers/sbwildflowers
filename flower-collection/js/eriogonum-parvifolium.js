var subSightings = [[-119.848,34.4068],[-119.788,34.4171],[-119.794,34.4186],[-119.788,34.4174],[-119.85,34.4084],[-119.8,34.4188],[-119.837,34.4156],[-120.23,34.4739],[-119.798,34.4184],[-119.797,34.4188],[-119.798,34.4185],[-119.794,34.4183],[-119.837,34.4155],[-119.786,34.4168],[-119.495,34.3855],[-119.796,34.4187],[-119.846,34.4089],[-119.847,34.4062],[-119.845,34.406],[-120.23,34.4738],[-119.788,34.4172],[-119.849,34.4081],[-119.799,34.4185],[-119.847,34.4067],[-119.801,34.4188],[-119.834,34.4163],[-119.83,34.4186],[-119.845,34.4061],[-119.848,34.4069],[-119.794,34.4184],[-119.837,34.4154],[-119.764,34.4091],[-119.83,34.4188],[-119.849,34.4079],[-119.789,34.4178],[-119.8,34.4185],[-119.798,34.4183],[-119.8,34.4186],[-119.844,34.4069],[-119.85,34.4073],[-120.07,34.4638],[-119.787,34.4173],[-119.847,34.4064],[-119.848,34.4067],[-119.849,34.4072],[-119.8,34.4183],[-119.836,34.4155],[-119.795,34.4187],[-119.741,34.4048],[-119.797,34.4185],[-119.801,34.4187],[-119.799,34.4183],[-119.799,34.4184],[-119.787,34.417],[-119.8,34.4184],[-119.847,34.4065],[-119.847,34.4063],[-119.796,34.4188],[-119.844,34.407],[-119.847,34.4061],[-119.794,34.4185],[-119.8,34.4187],[-119.799,34.4186],[-119.83,34.4187],[-119.835,34.4162],[-119.797,34.419],[-119.797,34.4189],[-120.23,34.4742],[-119.844,34.4061],[-119.847,34.4066]];
$(document).ready(function() {
	var vectorSource = new ol.source.Vector({
      //create empty vector
    });

	//create a bunch of icons and add to source vector
	subSightings.forEach(function(item,index) {
		var iconFeature = new ol.Feature({
		          geometry: new  
		            ol.geom.Point(ol.proj.fromLonLat(item)),
		        name: 'Flower',
		        population: 4000,
		        rainfall: 500
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
        src: 'flower.png'
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