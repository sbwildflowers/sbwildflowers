var subSightings = [[-119.585,34.4915],[-119.783,34.5494],[-119.64,34.4833],[-120.013,34.7402],[-119.631,34.4781],[-119.592,34.4749],[-119.65,34.4605],[-119.644,34.4629],[-119.639,34.475],[-119.594,34.4725],[-119.649,34.4595],[-119.605,34.5071],[-119.644,34.4641],[-119.745,34.4849],[-119.591,34.4745],[-119.594,34.4722],[-119.645,34.4639],[-119.639,34.4831],[-119.602,34.4723],[-119.649,34.4592],[-119.588,34.455],[-119.638,34.4802],[-119.708,34.4732],[-119.639,34.4829],[-119.644,34.4639],[-119.638,34.4801],[-119.644,34.4628],[-119.639,34.4835],[-119.783,34.5485],[-119.639,34.4833],[-119.639,34.4834],[-119.321,34.696],[-119.601,34.5121],[-119.649,34.4601],[-119.639,34.4749],[-119.638,34.4799],[-119.745,34.485],[-119.653,34.4616],[-119.594,34.4718],[-119.639,34.4747],[-119.644,34.4645],[-119.611,34.477],[-119.639,34.4832],[-119.593,34.4751],[-119.649,34.459],[-119.659,34.4657],[-119.653,34.4606],[-119.639,34.483],[-119.631,34.478],[-119.605,34.5073],[-119.591,34.4748],[-119.649,34.4594],[-119.702,34.4732],[-119.609,34.4769],[-119.642,34.4627],[-119.754,34.5989],[-119.592,34.4728],[-119.635,34.4826],[-119.638,34.48],[-119.65,34.4577],[-119.639,34.4806],[-119.632,34.4813],[-119.602,34.4633],[-119.633,34.5051],[-119.65,34.4634],[-119.598,34.4652],[-119.638,34.4822],[-119.639,34.4803],[-119.754,34.599],[-119.783,34.549],[-119.653,34.4605],[-119.649,34.4599],[-119.587,34.4701],[-119.594,34.4727],[-119.636,34.4957],[-119.644,34.4626],[-119.782,34.5504],[-119.633,34.4817],[-119.641,34.463],[-119.593,34.4732],[-119.702,34.4733],[-119.496,34.4816],[-119.649,34.4596],[-119.644,34.4637],[-119.633,34.4816],[-119.65,34.4606],[-119.594,34.4728],[-119.589,34.4664],[-119.633,34.4799],[-119.638,34.4854],[-119.592,34.475],[-119.644,34.4636],[-119.645,34.4644],[-119.966,34.814],[-119.769,34.5627],[-119.649,34.4591],[-119.633,34.4819],[-119.644,34.4638],[-119.699,34.4771],[-119.321,34.5963],[-119.638,34.4803],[-119.636,34.492],[-119.573,34.4877],[-119.594,34.4719],[-119.642,34.4626],[-119.753,34.5979],[-119.638,34.4824],[-119.653,34.5199],[-119.645,34.4638],[-119.699,34.4913],[-119.594,34.4724],[-119.638,34.4768],[-119.653,34.4611],[-119.146,34.7233],[-119.644,34.464],[-119.588,34.4782],[-119.645,34.4646],[-119.639,34.4751],[-119.699,34.4768]];
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