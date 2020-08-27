var subSightings = [[-119.785,34.428],[-119.797,34.4238],[-119.804,34.4245],[-120.231,34.4759],[-119.846,34.4063],[-119.678,34.4562],[-119.782,34.4316],[-119.786,34.4281],[-119.735,34.4489],[-119.797,34.5133],[-119.723,34.4755],[-119.69,34.4626],[-119.802,34.421],[-119.846,34.4062],[-119.793,34.4291],[-119.732,34.4617],[-119.799,34.4185],[-119.645,34.4608],[-119.795,34.4278],[-119.755,34.4602],[-119.649,34.4613],[-119.636,34.4951],[-119.717,34.4737],[-119.72,34.4747],[-119.696,34.4953],[-119.649,34.4616],[-119.729,34.4712],[-119.831,34.4195],[-119.729,34.4543],[-119.749,34.5241],[-119.83,34.4182],[-119.682,34.4564],[-119.789,34.4178],[-119.634,34.5007],[-119.729,34.4549],[-119.645,34.461],[-119.793,34.4184],[-119.796,34.4241],[-119.64,34.4734],[-119.896,34.4241],[-119.789,34.4179],[-119.782,34.4277],[-119.873,34.4165],[-119.797,34.424],[-119.729,34.4545],[-119.729,34.4555],[-119.786,34.4268],[-119.68,34.456],[-119.717,34.4732],[-119.611,34.4979],[-119.685,34.4549],[-119.728,34.4596],[-119.787,34.4222],[-119.657,34.4208],[-119.684,34.4555],[-119.735,34.4003],[-119.79,34.418],[-119.826,34.4218],[-119.826,34.4217],[-119.245,34.5358],[-119.75,34.5187],[-119.846,34.4061],[-119.773,34.4334],[-119.58,34.4548],[-119.649,34.4615],[-119.724,34.4762],[-119.71,34.4731],[-119.699,34.4917],[-119.816,34.4237],[-119.801,34.426],[-119.786,34.421],[-119.784,34.43],[-119.717,34.4736],[-119.725,34.4758],[-119.645,34.4609],[-119.714,34.4724],[-119.62,34.4456],[-119.825,34.422],[-119.638,34.4843],[-119.668,34.4546],[-119.794,34.5194],[-119.875,34.4175],[-119.848,34.4068],[-119.64,34.4739],[-119.638,34.4761],[-119.786,34.4274],[-119.88,34.4178],[-119.698,34.481],[-119.732,34.4537],[-119.684,34.4559],[-119.729,34.4564],[-119.643,34.4704],[-119.64,34.4733],[-119.632,34.4581],[-119.715,34.4723],[-119.787,34.4213],[-119.689,34.453],[-119.639,34.4739],[-119.826,34.4225],[-119.715,34.4721],[-119.786,34.4279],[-119.826,34.4215],[-119.706,34.4709],[-119.71,34.4733],[-119.643,34.4656],[-119.729,34.4714],[-119.638,34.4793],[-119.826,34.4216],[-119.845,34.4061],[-119.824,34.4191],[-119.844,34.406],[-119.72,34.4748],[-119.875,34.7707],[-119.773,34.4336],[-120.232,34.4785],[-119.729,34.4711],[-119.639,34.4742],[-119.794,34.4242],[-119.729,34.4556],[-119.724,34.4757],[-119.64,34.4732],[-119.879,34.4078],[-119.787,34.4207],[-119.848,34.4067],[-119.718,34.4737],[-119.636,34.4947],[-119.72,34.4745],[-119.802,34.4208],[-119.802,34.4213],[-119.637,34.4814],[-119.65,34.4607],[-119.877,34.4082],[-119.69,34.4621],[-119.652,34.4562],[-119.639,34.4838],[-119.697,34.482],[-119.796,34.4274],[-119.753,34.436],[-119.682,34.4567],[-119.761,34.5376],[-119.762,34.436],[-119.847,34.4062],[-119.786,34.4211]];
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