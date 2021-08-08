var subSightings = [[-119.633,34.4958],[-119.635,34.4983],[-119.635,34.4984],[-119.681,34.4742],[-119.639,34.4787],[-119.743,34.4817],[-119.749,34.5383],[-119.706,34.4701],[-119.762,34.5402],[-119.567,34.4871],[-119.701,34.4862],[-119.754,34.5262],[-119.589,34.464],[-119.743,34.4825],[-119.701,34.4867],[-119.694,34.484],[-119.752,34.5117],[-119.637,34.4811],[-119.713,34.4947],[-119.68,34.4771],[-119.639,34.4572],[-119.729,34.4609],[-119.591,34.4559],[-119.639,34.455],[-119.593,34.4587],[-119.762,34.5398],[-119.61,34.5018],[-119.59,34.4715],[-119.636,34.4979],[-119.643,34.459],[-119.644,34.4643],[-119.987,34.8032],[-119.755,34.5265],[-119.729,34.5364],[-119.649,34.4589],[-119.591,34.4659],[-119.7,34.4853],[-120.24,34.4843],[-119.584,34.4538],[-119.755,34.5267],[-119.644,34.4644],[-119.593,34.4586],[-119.761,34.5393],[-119.701,34.4749],[-119.841,34.5007],[-119.631,34.453],[-120.235,34.5054],[-119.595,34.4687],[-119.589,34.4637],[-119.588,34.4757],[-119.743,34.4824],[-120.238,34.4825],[-119.745,34.4932],[-119.721,34.4752],[-119.7,34.4848],[-119.764,34.5647],[-119.581,34.4538],[-119.585,34.4537],[-119.632,34.5084],[-119.716,34.5398],[-119.649,34.457],[-119.73,34.4552],[-119.629,34.4534],[-119.749,34.5197],[-119.724,34.5366],[-119.637,34.498],[-119.683,34.4822],[-119.644,34.465],[-119.722,34.5013],[-119.644,34.4646],[-119.763,34.5399],[-119.632,34.5085],[-119.753,34.5098],[-119.643,34.4666],[-119.639,34.4788],[-119.636,34.4978],[-119.753,34.5159],[-119.704,34.4937],[-119.632,34.4958],[-119.587,34.462],[-119.743,34.4818],[-119.636,34.498],[-119.612,34.4545],[-119.605,34.4767],[-119.68,34.4773],[-119.612,34.4973],[-119.513,34.4867],[-119.7,34.485],[-119.591,34.4558],[-119.66,34.4702],[-119.593,34.4588],[-119.751,34.5199],[-119.704,34.4935],[-119.632,34.5082],[-119.761,34.5397],[-119.511,34.4221],[-119.628,34.4519],[-119.653,34.4612],[-119.72,34.4753],[-119.59,34.4669],[-119.633,34.4542],[-119.605,34.4791],[-119.653,34.4887],[-119.591,34.4651],[-119.644,34.4681],[-119.702,34.4748],[-119.587,34.4802],[-119.7,34.4847],[-119.643,34.4662],[-119.632,34.4957],[-119.683,34.4914],[-119.682,34.4824],[-119.643,34.4665],[-119.585,34.4752],[-119.628,34.4849],[-119.75,34.5152],[-119.589,34.4551],[-119.631,34.53],[-119.625,34.4839],[-119.751,34.5202],[-119.751,34.52],[-119.7,34.4849],[-119.889,34.5148],[-119.755,34.5266],[-119.589,34.4752],[-119.589,34.4641],[-119.588,34.463],[-119.718,34.4725],[-119.699,34.4769],[-120.204,34.4926],[-119.589,34.4751],[-119.639,34.4786],[-119.814,34.5254],[-119.628,34.5273],[-119.582,34.4538],[-119.743,34.482],[-119.707,34.4774],[-119.764,34.5401],[-119.771,34.5462],[-119.637,34.4979],[-119.636,34.4988],[-119.762,34.5621],[-119.507,34.4693],[-119.635,34.4982],[-119.72,34.4749],[-119.585,34.4751],[-119.591,34.4563],[-119.567,34.4872],[-119.743,34.4823],[-119.631,34.5204],[-119.815,34.5262],[-119.644,34.4645],[-119.752,34.5115],[-119.844,34.4059]];
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