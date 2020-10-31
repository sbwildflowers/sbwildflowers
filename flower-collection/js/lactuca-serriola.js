var subSightings = [[-119.734,34.4261],[-119.724,34.4765],[-119.732,34.462],[-119.693,34.5009],[-119.629,34.5291],[-119.638,34.4973],[-119.771,34.5593],[-119.61,34.5009],[-119.61,34.5011],[-119.737,34.4689],[-119.601,34.5125],[-119.781,34.4335],[-119.829,34.4209],[-119.672,34.5011],[-119.613,34.4959],[-119.71,34.4731],[-119.532,34.4882],[-119.757,34.5705],[-119.663,34.4656],[-119.729,34.4542],[-119.767,34.5422],[-119.734,34.4262],[-119.73,34.4621],[-119.754,34.5725],[-119.695,34.4991],[-119.603,34.4651],[-119.8,34.465],[-119.74,34.428],[-119.63,34.5213],[-119.61,34.501],[-119.74,34.4108],[-119.725,34.4754],[-119.673,34.5206],[-119.786,34.5547],[-119.997,34.736],[-119.75,34.6073],[-119.612,34.4962],[-119.605,34.4787],[-119.734,34.4265],[-119.737,34.4686],[-119.74,34.4057],[-119.707,34.4728],[-119.63,34.5212],[-119.724,34.4766],[-119.596,34.4936],[-119.729,34.4614],[-119.6,34.5121],[-119.734,34.4263],[-119.758,34.5607],[-119.725,34.4758],[-120.002,34.8015],[-119.754,34.5732],[-119.734,34.426],[-119.735,34.465],[-119.75,34.4346],[-119.743,34.4786],[-119.814,34.5429],[-119.724,34.4763],[-119.856,34.5022],[-119.739,34.4056],[-119.729,34.4613],[-119.315,34.2823],[-119.725,34.4757],[-119.29,34.4784],[-119.628,34.522],[-119.603,34.465],[-119.594,34.4776],[-119.597,34.4936],[-119.638,34.4972],[-119.768,34.543],[-119.781,34.4337],[-119.73,34.4524],[-119.768,34.5633],[-119.734,34.4268],[-119.649,34.4635],[-119.788,34.4218],[-119.602,34.4678],[-119.637,34.4978],[-119.602,34.4676],[-119.824,34.4226],[-119.586,34.4549],[-119.734,34.4273],[-119.755,34.5727],[-119.713,34.4711],[-119.953,34.5279],[-119.754,34.4368],[-119.627,34.5256],[-119.74,34.4109],[-119.761,34.5659],[-119.637,34.498],[-119.658,34.5238],[-119.591,34.4917],[-119.659,34.4204],[-119.728,34.4586],[-119.732,34.4548],[-119.735,34.4261],[-119.747,34.5387],[-119.757,34.5704],[-119.915,34.5203],[-119.63,34.5129],[-119.786,34.549],[-119.612,34.4968]];
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