var subSightings = [[-119.769,34.5482],[-119.837,34.4154],[-119.75,34.5981],[-119.83,34.4188],[-119.85,34.4079],[-119.741,34.4049],[-119.85,34.4077],[-119.731,34.4632],[-119.733,34.5456],[-119.708,34.5297],[-119.878,34.4073],[-119.761,34.5995],[-119.751,34.529],[-119.037,34.0837],[-119.778,34.5512],[-119.85,34.4075],[-119.773,34.5464],[-119.757,34.601],[-119.772,34.5455],[-119.765,34.5607],[-119.74,34.4047],[-119.722,34.5846],[-119.73,34.5216],[-120.242,34.489],[-119.779,34.551],[-119.738,34.5383],[-119.769,34.5486],[-119.741,34.4047],[-119.77,34.5437],[-119.882,34.4125],[-119.724,34.5262],[-119.755,34.5988],[-119.707,34.5288],[-120.228,34.4714],[-119.885,34.4153],[-120.23,34.4719],[-119.755,34.5773],[-119.772,34.5457],[-119.732,34.5457],[-119.769,34.5483],[-119.747,34.568],[-120.032,34.4642],[-119.664,34.4182],[-119.879,34.4077],[-119.731,34.4633],[-119.754,34.575],[-119.772,34.5456],[-119.738,34.5382],[-120.069,34.5119],[-119.75,34.598],[-119.722,34.5222],[-119.851,34.4113],[-119.751,34.598],[-120.23,34.4718],[-119.874,34.4175],[-119.831,34.4292],[-119.763,34.5413],[-120.231,34.48],[-119.528,34.3984],[-119.322,34.2845],[-119.755,34.5771],[-119.762,34.5411],[-119.812,34.5044],[-119.721,34.5835],[-119.769,34.5431],[-119.779,34.5507],[-119.751,34.5977],[-119.732,34.5459],[-119.769,34.5484],[-119.723,34.5233],[-119.708,34.5305],[-119.695,34.4071],[-119.759,34.5271],[-119.748,34.6127],[-119.83,34.4187],[-119.486,34.3837],[-119.731,34.463],[-119.708,34.5291],[-119.665,34.418],[-119.77,34.5438],[-119.837,34.4156],[-119.759,34.5267],[-119.74,34.5689],[-119.731,34.4638],[-119.771,34.5459],[-119.602,34.4787],[-120.03,34.464],[-119.85,34.4115],[-119.311,34.2765],[-119.758,34.5418],[-119.762,34.5407],[-119.664,34.4178],[-119.369,34.3191],[-120.07,34.4637],[-119.747,34.4054],[-119.603,34.4785],[-119.666,34.4174],[-119.508,34.3868],[-120.041,34.4646],[-119.738,34.4223],[-119.846,34.4089],[-119.707,34.5287],[-119.77,34.5436],[-119.765,34.5606],[-119.723,34.5226],[-119.751,34.5978],[-119.731,34.4631],[-119.664,34.4181],[-119.527,34.3967],[-120.23,34.4723],[-119.528,34.4002],[-119.85,34.4078],[-119.748,34.5678],[-119.455,34.3704],[-119.749,34.6043],[-119.752,34.5978],[-119.364,34.3165],[-119.851,34.4112],[-119.731,34.4629],[-119.752,34.5977],[-119.848,34.411],[-119.751,34.5291],[-119.762,34.5409],[-119.754,34.5989],[-119.748,34.5959],[-119.844,34.407],[-119.836,34.4155],[-119.882,34.4124],[-119.74,34.4049],[-119.851,34.4105],[-119.739,34.4045],[-119.721,34.5851],[-119.664,34.418],[-119.748,34.5956],[-119.779,34.5508],[-119.601,34.4776],[-119.734,34.4513],[-119.848,34.4069],[-119.737,34.5376],[-119.753,34.5978],[-119.727,34.5776],[-119.769,34.5436],[-119.754,34.5749],[-119.762,34.5408],[-119.879,34.4078],[-119.724,34.5237],[-119.882,34.4126],[-119.769,34.5476],[-119.664,34.4179],[-120.029,34.4639],[-119.756,34.5417],[-119.9,34.4215],[-119.773,34.5465],[-119.707,34.5302],[-119.738,34.4051],[-119.738,34.4048],[-119.722,34.5224],[-119.747,34.5928],[-119.498,34.3872],[-119.702,34.4006],[-119.755,34.5992],[-119.749,34.5957],[-119.882,34.4127],[-119.314,34.2785],[-119.708,34.5296],[-119.708,34.5299],[-119.739,34.5383],[-119.742,34.541],[-119.315,34.2786],[-119.795,34.4916],[-119.847,34.4066],[-119.83,34.4186],[-119.751,34.5975],[-119.664,34.4177],[-120.23,34.4717],[-119.729,34.4715],[-119.708,34.5295],[-119.755,34.599]];
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