var subSightings = [[-120.225,34.4956],[-119.65,34.4611],[-119.734,34.4508],[-119.687,34.4654],[-119.729,34.4609],[-119.732,34.4531],[-119.781,34.4315],[-119.746,34.4946],[-119.603,34.4565],[-120.238,34.4942],[-119.689,34.4644],[-120.043,34.5344],[-120.237,34.489],[-120.232,34.4998],[-119.732,34.4532],[-119.729,34.4605],[-120.236,34.489],[-119.734,34.451],[-119.611,34.4508],[-119.611,34.4497],[-119.611,34.4507],[-119.734,34.4531],[-119.609,34.4551],[-119.729,34.4561],[-119.644,34.4626],[-119.615,34.4556],[-119.72,34.4747],[-119.61,34.4552],[-119.648,34.4619],[-120.238,34.4891],[-119.649,34.4627],[-119.031,34.0866],[-119.645,34.461],[-119.653,34.4559],[-119.734,34.453],[-119.653,34.462],[-119.729,34.4563],[-119.65,34.4571],[-119.702,34.4855],[-119.729,34.461],[-119.732,34.4539],[-120.239,34.4886],[-119.729,34.4555],[-119.649,34.4593],[-119.594,34.4577],[-120.229,34.4988],[-120.218,34.504],[-119.728,34.4733],[-119.758,34.5376],[-119.749,34.4872],[-119.649,34.4577],[-119.729,34.4608],[-119.028,34.0884],[-119.732,34.4647],[-119.649,34.4635],[-119.604,34.456],[-119.637,34.4778],[-119.651,34.4562],[-119.729,34.4573],[-119.734,34.4509],[-120.205,34.4924],[-119.604,34.4561],[-120.066,34.5303],[-119.644,34.4627],[-119.644,34.4646],[-119.609,34.455],[-119.721,34.4745],[-120.228,34.5047],[-119.688,34.4646],[-119.732,34.4533],[-119.65,34.4637],[-119.649,34.4575],[-119.65,34.4614],[-119.649,34.4594],[-119.729,34.4615],[-119.645,34.4609],[-119.725,34.4758],[-120.238,34.4914],[-120.014,34.5318],[-120.238,34.4877],[-120.228,34.4995],[-119.627,34.4741],[-119.611,34.4553],[-119.749,34.499],[-120.224,34.5051],[-120.218,34.5036],[-120.223,34.5041],[-119.611,34.4498],[-119.617,34.448],[-119.734,34.4532],[-119.649,34.4571],[-120.239,34.4856],[-119.688,34.4659],[-119.587,34.4616],[-119.733,34.4533],[-119.731,34.4646],[-120.238,34.4881],[-119.644,34.4611],[-120.207,34.4903],[-119.652,34.4563],[-119.637,34.4538],[-119.729,34.4607],[-120.221,34.5015],[-119.734,34.4487],[-119.616,34.448],[-120.226,34.4961],[-119.729,34.4562],[-119.65,34.4569],[-120.239,34.5043],[-119.738,34.4692],[-119.603,34.4564],[-119.65,34.457],[-119.654,34.457],[-119.592,34.4707],[-119.73,34.4628],[-119.688,34.4661],[-119.729,34.4711],[-119.654,34.4552],[-119.638,34.4865],[-119.729,34.4554],[-119.653,34.4565],[-119.629,34.4545],[-119.645,34.4611],[-119.746,34.4948],[-119.61,34.4551],[-119.65,34.4612],[-120.218,34.5035],[-120.223,34.4962],[-119.729,34.4553],[-119.611,34.4493],[-120.233,34.4812],[-119.733,34.4534],[-119.591,34.4663],[-119.652,34.4558],[-119.652,34.4562],[-119.729,34.4548],[-119.651,34.4557],[-119.751,34.5037],[-119.66,34.4662],[-119.649,34.458]];
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