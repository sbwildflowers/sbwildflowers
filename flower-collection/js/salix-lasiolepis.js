var subSightings = [[-119.786,34.5538],[-119.62,34.5388],[-119.623,34.4582],[-119.807,34.4363],[-119.811,34.4248],[-119.653,34.4562],[-119.593,34.4576],[-119.592,34.457],[-119.917,34.6832],[-120.056,34.757],[-119.591,34.4637],[-119.636,34.4868],[-120.231,34.4972],[-119.592,34.4915],[-119.61,34.5008],[-119.578,34.489],[-119.731,34.4553],[-119.63,34.4953],[-119.738,34.4267],[-119.807,34.4237],[-119.727,34.4742],[-119.808,34.4271],[-119.612,34.4538],[-119.623,34.4568],[-119.788,34.4304],[-119.761,34.5399],[-119.636,34.4869],[-119.756,34.5733],[-119.74,34.4076],[-119.8,34.4185],[-119.727,34.474],[-119.622,34.4514],[-119.591,34.458],[-119.794,34.4286],[-119.791,34.418],[-119.789,34.4305],[-119.729,34.4726],[-119.614,34.4954],[-119.82,34.4236],[-119.22,34.4768],[-119.774,34.4179],[-119.452,34.4915],[-119.314,34.2795],[-119.908,34.7765],[-119.761,34.5659],[-119.631,34.5191],[-119.633,34.5155],[-119.688,34.514],[-119.761,34.6327],[-119.766,34.632],[-120.069,34.4706],[-119.6,34.5138],[-119.608,34.4947],[-119.806,34.4392],[-119.757,34.5151],[-119.652,34.4626],[-119.627,34.5234],[-119.797,34.4264],[-119.766,34.4377],[-119.542,34.4865],[-119.633,34.5072],[-119.587,34.4824],[-119.675,34.4692],[-119.315,34.2799],[-119.652,34.4625],[-119.436,34.4908],[-119.631,34.5214],[-119.734,34.4479],[-119.732,34.4537],[-119.74,34.4203],[-119.632,34.5148],[-119.564,34.4801],[-119.728,34.458],[-119.615,34.51],[-120.22,34.5032],[-119.787,34.4206],[-119.813,34.4245],[-119.384,34.5094],[-119.731,34.4552],[-119.587,34.47],[-119.687,34.5141],[-119.81,34.4252],[-119.614,34.4953],[-119.635,34.4868],[-119.776,34.4356],[-119.321,34.5959],[-119.631,34.5106],[-119.654,34.4561],[-119.766,34.6321],[-119.751,34.4354],[-119.77,34.561],[-119.717,34.4732],[-119.63,34.5303],[-119.62,34.539],[-119.74,34.4051],[-120.007,34.8081],[-119.785,34.5538],[-119.956,34.7795],[-119.728,34.4584],[-119.629,34.5213],[-119.63,34.5302],[-119.807,34.4294],[-119.829,34.4209]];
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