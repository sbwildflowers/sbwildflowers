var subSightings = [[-119.746,34.4856],[-119.59,34.4695],[-119.638,34.4802],[-119.643,34.4617],[-119.596,34.465],[-119.644,34.4633],[-119.644,34.4639],[-119.707,34.4729],[-119.641,34.4635],[-119.644,34.4647],[-119.592,34.4717],[-119.639,34.4717],[-119.593,34.4752],[-119.639,34.4804],[-119.636,34.4888],[-119.624,34.4701],[-119.757,34.5115],[-119.592,34.4713],[-119.7,34.4849],[-119.136,34.4535],[-119.636,34.4864],[-119.639,34.4803],[-119.644,34.4641],[-119.645,34.4641],[-119.757,34.5112],[-119.569,34.4706],[-119.76,34.5229],[-119.637,34.4774],[-119.629,34.4763],[-119.639,34.4719],[-119.635,34.488],[-119.629,34.4757],[-119.701,34.4867],[-119.643,34.4614],[-119.642,34.4625],[-119.639,34.4807],[-119.645,34.4639],[-119.231,34.498],[-119.636,34.4935],[-119.638,34.4803],[-119.644,34.4643],[-119.688,34.4666],[-119.693,34.4683],[-119.746,34.4855],[-119.65,34.4609],[-119.757,34.5126],[-119.687,34.4684],[-119.59,34.4697],[-119.743,34.4808],[-119.65,34.4606],[-119.707,34.4708],[-119.583,34.4715],[-119.699,34.4768],[-119.609,34.4545],[-119.651,34.4606],[-119.643,34.4613],[-119.637,34.4788],[-119.716,34.4897],[-119.645,34.464],[-119.743,34.4826],[-119.65,34.4612],[-119.589,34.4657],[-119.65,34.461],[-119.639,34.4806],[-119.651,34.4608],[-119.586,34.4705],[-119.644,34.4612],[-119.753,34.5191],[-119.594,34.4726],[-119.644,34.4611],[-119.626,34.4954],[-119.691,34.4602],[-119.644,34.4644],[-119.644,34.4645],[-119.644,34.464],[-119.638,34.4806],[-119.629,34.4762],[-119.593,34.4751],[-119.756,34.573],[-119.65,34.4608],[-119.622,34.4674],[-119.649,34.4686],[-119.603,34.4563],[-119.644,34.4642],[-119.639,34.4805],[-119.638,34.4862],[-119.731,34.4552],[-119.638,34.4807],[-119.945,34.5296],[-119.609,34.4769],[-119.587,34.4627],[-119.636,34.495],[-119.651,34.461],[-119.748,34.4861],[-119.637,34.4775],[-119.651,34.4611],[-119.591,34.4679],[-119.649,34.4575],[-119.495,34.4807],[-119.591,34.4637],[-119.759,34.5673],[-119.644,34.4637],[-119.613,34.4558]];
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