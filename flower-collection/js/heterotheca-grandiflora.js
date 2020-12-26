var subSightings = [[-119.586,34.4547],[-119.847,34.4066],[-119.739,34.4061],[-119.729,34.4543],[-119.734,34.4636],[-119.797,34.4186],[-119.322,34.2845],[-119.845,34.4059],[-119.8,34.4188],[-119.806,34.5439],[-119.787,34.4205],[-119.92,34.436],[-119.681,34.4784],[-119.726,34.5011],[-119.8,34.4186],[-119.883,34.4122],[-119.741,34.4759],[-120.065,34.4847],[-120.243,34.5006],[-119.724,34.5012],[-119.796,34.4187],[-119.797,34.4188],[-119.787,34.4208],[-119.8,34.4193],[-119.681,34.5158],[-119.824,34.4226],[-119.74,34.4752],[-120.226,34.5061],[-120.033,34.4643],[-119.68,34.4778],[-119.735,34.4677],[-119.747,34.5382],[-119.995,34.531],[-119.674,34.4558],[-119.802,34.4196],[-119.742,34.5395],[-119.76,34.4614],[-119.315,34.2823],[-120.232,34.4972],[-119.802,34.4191],[-119.741,34.4755],[-119.424,34.3505],[-119.845,34.4061],[-119.767,34.5403],[-119.846,34.4061],[-119.865,34.5049],[-119.752,34.5249],[-119.5,34.3878],[-119.882,34.4124],[-119.734,34.4641],[-119.647,34.4872],[-119.735,34.4675],[-119.798,34.4185],[-119.8,34.4185],[-119.802,34.4193],[-119.674,34.4554],[-119.848,34.5014],[-119.734,34.4633],[-120.073,34.5164],[-119.829,34.4212],[-119.758,34.54],[-119.74,34.4715],[-119.768,34.54],[-119.712,34.4946],[-119.681,34.5155],[-119.798,34.4184],[-119.705,34.494],[-120.207,34.4904],[-119.844,34.406],[-119.581,34.4542],[-119.741,34.4721],[-119.75,34.521],[-119.734,34.4265],[-119.738,34.4225],[-119.685,34.414],[-119.681,34.4798],[-119.8,34.4192],[-119.63,34.4848],[-119.743,34.477],[-119.661,34.4538],[-119.455,34.3704],[-119.735,34.4676],[-119.681,34.474],[-119.681,34.4794],[-120.24,34.5045],[-119.735,34.4644],[-119.734,34.4268],[-119.735,34.467],[-119.824,34.4227],[-119.711,34.4734],[-119.74,34.4124],[-120.226,34.5058],[-119.751,34.5253],[-119.733,34.4619],[-119.674,34.4553],[-119.729,34.4542],[-119.486,34.3838],[-119.735,34.4669],[-119.738,34.4222],[-119.648,34.4872],[-119.75,34.4343],[-119.359,34.3124],[-119.796,34.4188],[-119.741,34.4756],[-119.848,34.4068],[-119.824,34.4228],[-119.734,34.4637],[-119.835,34.5265],[-119.66,34.4891],[-119.669,34.454],[-119.687,34.4573],[-119.487,34.3844],[-119.848,34.4069],[-120.226,34.5076],[-119.787,34.4207],[-119.801,34.419],[-119.498,34.3872],[-119.795,34.424],[-119.716,34.4971],[-119.587,34.4547],[-119.647,34.4873],[-119.847,34.4065],[-119.802,34.4204],[-119.734,34.4262],[-119.787,34.4203],[-119.802,34.4194],[-119.797,34.4187],[-119.68,34.473],[-119.63,34.4847],[-119.733,34.4622],[-119.882,34.413],[-119.952,34.5272],[-119.8,34.4187],[-119.802,34.4192],[-119.802,34.419],[-119.749,34.434]];
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