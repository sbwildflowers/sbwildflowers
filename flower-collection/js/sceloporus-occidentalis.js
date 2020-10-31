var subSightings = [[-119.963,34.8126],[-120.204,34.4956],[-119.649,34.4588],[-119.692,34.4681],[-119.643,34.4676],[-119.649,34.4599],[-119.78,34.5575],[-119.708,34.4731],[-119.289,34.4788],[-119.742,34.4815],[-119.244,34.4678],[-119.568,34.4707],[-119.65,34.462],[-119.644,34.4641],[-119.609,34.4769],[-119.712,34.4729],[-119.716,34.4723],[-119.287,34.4784],[-119.645,34.4646],[-119.731,34.429],[-119.758,34.5187],[-119.644,34.464],[-119.742,34.4785],[-119.596,34.4937],[-119.636,34.5035],[-119.844,34.4063],[-119.743,34.4804],[-119.726,34.4747],[-119.785,34.5564],[-120.208,34.4933],[-119.692,34.4583],[-119.637,34.4973],[-119.798,34.4184],[-119.732,34.4684],[-119.746,34.4852],[-119.762,34.5664],[-119.653,34.4604],[-119.634,34.4971],[-119.642,34.4714],[-119.643,34.4658],[-119.644,34.4648],[-119.701,34.4749],[-119.651,34.4638],[-119.611,34.4495],[-119.639,34.4805],[-119.637,34.4981],[-119.621,34.4942],[-119.724,34.4763],[-119.749,34.4876],[-119.722,34.4755],[-119.757,34.5708],[-119.77,34.5555],[-119.6,34.4934],[-119.73,34.4619],[-119.634,34.4967],[-119.713,34.4729],[-119.659,34.4658],[-119.639,34.4604],[-119.639,34.4563],[-119.728,34.4612],[-119.643,34.47],[-119.633,34.5098],[-119.593,34.4908],[-119.623,34.4692],[-119.701,34.4751],[-119.634,34.51],[-119.735,34.4645],[-119.799,34.4184],[-119.644,34.4642],[-119.7,34.4847],[-119.738,34.4696],[-119.706,34.471],[-119.704,34.4721],[-119.778,34.5526],[-119.785,34.5566],[-119.953,34.5279],[-119.736,34.4661],[-119.498,34.4757],[-119.848,34.4067],[-119.607,34.4942],[-119.65,34.4622],[-119.285,34.4777],[-119.598,34.4653],[-119.711,34.4735],[-119.784,34.5583]];
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