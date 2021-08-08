var subSightings = [[-120.224,34.4982],[-119.759,34.5378],[-119.638,34.4609],[-119.635,34.4973],[-119.288,34.4783],[-119.31,34.2772],[-120.243,34.4917],[-120.048,34.5364],[-120.223,34.4968],[-119.639,34.4554],[-119.591,34.4556],[-119.38,34.5069],[-120.216,34.5031],[-119.589,34.4549],[-120.211,34.4899],[-119.893,34.7886],[-120.052,34.7538],[-119.744,34.5901],[-120.009,34.7663],[-119.728,34.5907],[-119.268,34.474],[-120.203,34.4978],[-119.6,34.4554],[-119.769,34.6255],[-119.634,34.4963],[-119.787,34.5488],[-119.763,34.5413],[-119.508,34.4242],[-120.237,34.4888],[-119.729,34.4554],[-120.23,34.4742],[-119.592,34.4552],[-120.216,34.4966],[-119.564,34.5365],[-119.731,34.5432],[-119.507,34.4258],[-119.758,34.5375],[-119.72,34.4748],[-119.73,34.4608],[-119.587,34.4603],[-120.239,34.4943],[-119.606,34.5065],[-119.281,34.4758],[-119.76,34.4615],[-119.64,34.4546],[-119.731,34.4614],[-119.234,34.4662],[-120.069,34.512],[-119.639,34.4618],[-119.731,34.4637],[-119.638,34.476],[-119.629,34.4956],[-119.736,34.4655],[-119.729,34.4553],[-120.056,34.747],[-119.851,34.4107],[-119.634,34.497],[-119.721,34.5835],[-120.22,34.4967],[-120.012,34.7569],[-120.21,34.4939],[-120.224,34.4957],[-119.657,34.5235],[-120.01,34.759],[-119.745,34.494],[-119.75,34.5256],[-119.528,34.4003],[-119.893,34.7892],[-119.849,34.4073],[-120.002,34.7433],[-120.06,34.7432],[-120.223,34.5033],[-120.003,34.7431],[-120.204,34.4927],[-120.23,34.4982],[-119.587,34.4619],[-119.351,34.6035],[-120.238,34.4868],[-119.73,34.4551],[-119.587,34.4616],[-119.589,34.4652],[-119.591,34.462],[-119.681,34.5162],[-119.769,34.5625],[-119.587,34.4604],[-119.653,34.5201],[-119.688,34.4652],[-119.694,34.5146],[-119.5,34.428],[-119.83,34.4188],[-119.688,34.4653],[-119.746,34.4941],[-119.749,34.5694],[-119.636,34.4975],[-120.104,34.7033],[-120.01,34.7604],[-120.204,34.4984],[-119.752,34.5977],[-120.059,34.7556],[-119.564,34.5323],[-119.29,34.4785],[-118.995,34.1049],[-119.312,34.2778],[-120.205,34.4934],[-120.226,34.4972],[-119.634,34.4968],[-119.51,34.4235],[-119.586,34.4603],[-119.849,34.4075],[-119.281,34.4755],[-119.739,34.4064],[-119.891,34.7954],[-119.589,34.4647],[-119.762,34.5374],[-119.673,34.5245],[-119.746,34.494],[-119.779,34.5505],[-119.743,34.4041],[-119.614,34.4953],[-119.036,34.087],[-119.703,34.4722],[-119.635,34.4601],[-119.846,34.4089],[-119.631,34.4956],[-119.738,34.5528],[-119.774,34.5459],[-119.622,34.4487],[-119.745,34.4941],[-119.848,34.4068],[-119.607,34.5062],[-119.688,34.4649],[-120.205,34.4926],[-119.771,34.5583],[-120.23,34.4718],[-119.587,34.4608],[-119.563,34.4875],[-119.587,34.4624],[-120.008,34.7496],[-120.223,34.4958],[-119.273,34.4735],[-120.051,34.7592],[-119.634,34.4971],[-119.588,34.455],[-119.814,34.543],[-119.835,34.5265]];
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