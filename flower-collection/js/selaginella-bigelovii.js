var subSightings = [[-119.643,34.4669],[-119.644,34.4641],[-119.636,34.4941],[-119.244,34.4679],[-119.76,34.5665],[-119.901,34.7813],[-119.571,34.4872],[-119.496,34.4817],[-119.7,34.4848],[-119.651,34.463],[-119.747,34.4913],[-119.592,34.4713],[-119.7,34.4876],[-119.864,34.7801],[-119.645,34.4645],[-119.239,34.4692],[-119.245,34.4664],[-119.716,34.4931],[-119.637,34.4958],[-119.643,34.4615],[-119.644,34.4685],[-119.24,34.4677],[-119.636,34.4959],[-119.74,34.4749],[-119.653,34.4613],[-119.716,34.4899],[-119.136,34.4525],[-119.258,34.4808],[-119.753,34.5725],[-119.644,34.4649],[-119.636,34.4957],[-119.643,34.4674],[-120.056,34.752],[-119.495,34.4793],[-119.643,34.4675],[-120.016,34.7388],[-119.644,34.4639],[-119.224,34.4734],[-119.636,34.4958],[-119.7,34.4752],[-119.645,34.4646],[-119.687,34.4678],[-119.956,34.7782],[-119.644,34.4645],[-119.636,34.4936],[-119.716,34.4932],[-119.691,34.5059],[-119.715,34.4937],[-119.698,34.4828],[-119.643,34.4678],[-119.569,34.4705],[-119.753,34.5729],[-119.644,34.465],[-119.702,34.4852],[-119.952,34.7753],[-119.635,34.4544],[-119.243,34.4659],[-119.857,34.7435],[-119.956,34.7776],[-119.704,34.4723],[-119.592,34.4711],[-119.741,34.4758],[-119.254,34.4721],[-119.743,34.4778],[-119.741,34.4757],[-119.217,34.4822],[-119.659,34.4702],[-119.87,34.7375],[-119.637,34.496],[-119.643,34.4647],[-119.695,34.4781],[-120.056,34.7504],[-119.636,34.4935],[-119.702,34.4853],[-119.859,34.7408],[-119.901,34.781],[-119.569,34.4873],[-119.741,34.4759],[-119.752,34.5726],[-119.93,34.7668],[-119.956,34.7786],[-119.643,34.4672],[-119.809,34.7563],[-119.644,34.4684],[-119.893,34.7569],[-119.592,34.4712],[-120.052,34.7526],[-119.216,34.485],[-119.636,34.4956],[-119.643,34.4591],[-119.74,34.4757],[-119.753,34.5726],[-119.643,34.4662],[-119.65,34.4561],[-119.643,34.4646],[-119.215,34.4833],[-119.651,34.4631],[-119.644,34.4648],[-119.643,34.4679],[-119.928,34.7663],[-119.644,34.4642],[-119.56,34.4868],[-119.636,34.4934],[-119.743,34.4782],[-119.714,34.4722],[-119.637,34.4547],[-119.893,34.7886],[-119.698,34.4827],[-119.769,34.5633],[-119.697,34.4792],[-119.644,34.459],[-119.851,34.7468],[-119.706,34.4757],[-119.741,34.476],[-119.681,34.4784],[-119.571,34.4874],[-119.716,34.4862],[-119.697,34.4791],[-119.689,34.4728],[-119.864,34.78],[-119.643,34.4667],[-119.747,34.561],[-119.893,34.789],[-120.054,34.7514],[-119.644,34.464],[-119.643,34.4666],[-119.859,34.7415]];
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