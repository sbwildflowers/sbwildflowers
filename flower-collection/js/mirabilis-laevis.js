var subSightings = [[-119.736,34.4676],[-119.9,34.7816],[-119.615,34.4555],[-119.774,34.5575],[-120.222,34.4962],[-119.762,34.5409],[-119.643,34.4613],[-119.762,34.541],[-119.768,34.6254],[-119.653,34.4617],[-119.754,34.5727],[-119.746,34.4945],[-120.222,34.4965],[-119.771,34.5439],[-119.231,34.4656],[-120.223,34.4968],[-119.238,34.466],[-119.228,34.4647],[-119.583,34.4599],[-119.778,34.5529],[-119.583,34.4596],[-119.786,34.549],[-119.59,34.4553],[-119.051,34.0911],[-119.736,34.4677],[-119.246,34.4705],[-119.601,34.4562],[-119.643,34.4612],[-119.762,34.5411],[-119.653,34.4613],[-119.768,34.5433],[-119.787,34.549],[-119.742,34.4813],[-119.028,34.086],[-119.594,34.4585],[-119.594,34.4717],[-119.24,34.4684],[-119.64,34.4628],[-119.755,34.5748],[-119.708,34.4685],[-119.767,34.5428],[-119.754,34.5751],[-119.737,34.4678],[-119.772,34.5462],[-119.237,34.4647],[-119.738,34.4684],[-119.617,34.4479],[-119.586,34.4549],[-119.644,34.461],[-119.652,34.4561],[-119.592,34.4708],[-119.785,34.5574],[-119.644,34.4612],[-119.604,34.4563],[-119.785,34.5566],[-120.205,34.4934],[-119.246,34.4694],[-120.235,34.5054],[-119.623,34.468],[-120.205,34.4935],[-119.743,34.4818],[-119.775,34.5462],[-119.587,34.4605],[-119.616,34.448],[-119.754,34.575],[-119.786,34.5491],[-119.786,34.5546],[-119.639,34.4607],[-120.226,34.496],[-119.615,34.4554],[-119.742,34.4812],[-119.653,34.4622],[-119.243,34.4653],[-119.615,34.4557],[-119.253,34.462],[-119.005,34.0952],[-119.772,34.546],[-119.595,34.4577],[-119.592,34.4706],[-120.238,34.4828],[-119.592,34.4727],[-119.764,34.5416],[-119.689,34.4591],[-119.786,34.5492],[-119.605,34.4546],[-119.764,34.5415],[-119.053,34.0921],[-119.232,34.4662],[-119.618,34.4574],[-119.587,34.4604],[-119.651,34.4631],[-120.072,34.5146],[-119.743,34.4817],[-119.778,34.5528],[-119.586,34.455],[-119.768,34.6255],[-119.604,34.456],[-119.601,34.4561],[-119.592,34.4709],[-119.035,34.0875],[-118.999,34.0942],[-119.644,34.4611],[-119.219,34.4786],[-119.592,34.4705],[-119.765,34.5416],[-119.042,34.0948],[-119.592,34.4707],[-119.741,34.4759],[-119.755,34.5749],[-119.031,34.0857],[-119.245,34.4708],[-119.245,34.4712],[-119.649,34.4601],[-119.228,34.4653],[-119.639,34.463],[-119.653,34.4618],[-119.594,34.4586],[-119.032,34.0978],[-119.615,34.4556],[-119.708,34.4683],[-119.64,34.4629],[-120.225,34.4954],[-119.754,34.5749],[-119.653,34.4619],[-119.742,34.4815],[-119.244,34.4659],[-119.746,34.4946],[-119.025,34.0869],[-119.616,34.4563],[-119.229,34.4645],[-119.233,34.4662],[-119.235,34.4654],[-119.742,34.4817],[-119.231,34.4649],[-119.644,34.4613],[-119.604,34.4561],[-119.764,34.5414],[-119.787,34.5546],[-119.245,34.466],[-119.785,34.5567],[-119.652,34.4562],[-119.244,34.466],[-119.765,34.5418],[-119.677,34.456],[-119.743,34.4816],[-120.223,34.4969],[-119.046,34.0918],[-119.245,34.4675],[-119.742,34.4814],[-119.605,34.4547],[-119.244,34.471],[-119.765,34.5417],[-120.226,34.4959],[-119.584,34.4601],[-119.707,34.4684],[-119.746,34.4944],[-119.768,34.5428],[-119.639,34.4631],[-119.583,34.4598],[-119.786,34.5555],[-119.736,34.4678],[-119.64,34.463],[-119.768,34.5429],[-119.643,34.4611],[-119.651,34.4629],[-119.239,34.4689],[-119.584,34.4602],[-119.244,34.4678],[-119.743,34.4819],[-120.216,34.503],[-119.67,34.4546],[-119.768,34.5427],[-119.785,34.5575],[-119.742,34.4818]];
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