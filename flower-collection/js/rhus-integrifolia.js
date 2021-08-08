var subSightings = [[-119.732,34.4617],[-119.786,34.427],[-120.191,34.5072],[-119.847,34.4067],[-119.736,34.4656],[-120.234,34.481],[-119.731,34.4643],[-119.798,34.4838],[-119.73,34.4613],[-119.624,34.4702],[-120.237,34.5051],[-119.851,34.41],[-119.731,34.4652],[-119.85,34.4104],[-120.01,34.4616],[-120.238,34.4889],[-119.845,34.4062],[-120.233,34.5055],[-119.626,34.4715],[-119.729,34.4543],[-120.23,34.4744],[-119.528,34.3965],[-119.729,34.4715],[-119.764,34.4091],[-120.212,34.4946],[-119.732,34.4651],[-120.235,34.4904],[-119.761,34.4107],[-120.237,34.4823],[-119.591,34.4703],[-119.513,34.418],[-119.731,34.4651],[-119.772,34.4147],[-119.733,34.4533],[-119.848,34.4108],[-120.234,34.4811],[-120.238,34.4824],[-120.239,34.4824],[-119.396,34.3253],[-120.231,34.5054],[-120.231,34.4801],[-120.234,34.4966],[-119.591,34.4706],[-119.744,34.4032],[-119.737,34.4679],[-120.239,34.4831],[-120.231,34.5002],[-119.738,34.4692],[-119.732,34.4652],[-119.736,34.4661],[-119.623,34.4696],[-120.23,34.4739],[-120.233,34.5029],[-119.742,34.4794],[-119.734,34.4629],[-119.733,34.4521],[-120.231,34.4773],[-119.809,34.4402],[-119.713,34.4648],[-119.028,34.0877],[-119.739,34.4072],[-119.732,34.4649],[-119.028,34.0883],[-120.233,34.4811],[-120.231,34.4772],[-119.895,34.4208],[-119.73,34.4615],[-119.739,34.4711],[-120.238,34.5052],[-119.826,34.422],[-119.019,34.0751],[-120.229,34.4905],[-119.85,34.4083],[-120.238,34.4888],[-119.732,34.4616],[-120.026,34.464],[-119.506,34.3854],[-119.761,34.4613],[-120.029,34.4639],[-119.737,34.4678],[-119.739,34.4069],[-119.731,34.4616],[-119.85,34.4084],[-119.623,34.4698],[-119.851,34.4104],[-120.23,34.4729],[-119.663,34.4545],[-120.243,34.4917],[-119.76,34.4612],[-119.732,34.4618],[-119.845,34.4061],[-120.24,34.5025],[-119.849,34.4102],[-120.232,34.5056],[-120.228,34.5072],[-119.74,34.405],[-119.736,34.4662],[-119.847,34.4068],[-119.743,34.4777],[-120.24,34.5042],[-119.712,34.4406],[-119.738,34.4685],[-120.228,34.5044],[-119.623,34.4695],[-120.24,34.4945],[-120.239,34.4832],[-120.237,34.4885],[-119.742,34.4044],[-119.802,34.4231],[-119.712,34.4639],[-119.756,34.4061],[-119.741,34.4046],[-119.8,34.4644],[-119.511,34.4207],[-119.51,34.4235],[-119.036,34.0857],[-119.786,34.4273],[-119.738,34.4684],[-119.509,34.4238],[-119.735,34.4649],[-120.23,34.5004],[-119.033,34.0891],[-119.511,34.4203],[-120.24,34.4844],[-120.221,34.5015],[-119.693,34.449],[-119.499,34.3869],[-119.741,34.4759],[-119.733,34.4523],[-119.826,34.4218],[-119.732,34.465],[-120.238,34.4865],[-119.782,34.4316],[-119.496,34.3857],[-120.229,34.5052],[-120.223,34.4957],[-119.513,34.4159],[-119.783,34.4311],[-119.734,34.4642],[-119.741,34.4049],[-119.736,34.4663],[-119.5,34.3878],[-120.211,34.4902],[-119.731,34.4653],[-119.508,34.4242],[-119.734,34.4641],[-120.239,34.484],[-119.735,34.4645],[-120.226,34.4972]];
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