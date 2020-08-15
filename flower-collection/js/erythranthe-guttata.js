var subSightings = [[-119.65,34.4649],[-119.612,34.4546],[-119.623,34.4567],[-119.624,34.4623],[-119.652,34.4625],[-119.609,34.5038],[-119.652,34.4626],[-119.646,34.4743],[-119.63,34.5124],[-119.653,34.4622],[-119.62,34.5405],[-119.496,34.4837],[-119.628,34.5273],[-119.65,34.466],[-119.653,34.4621],[-119.651,34.4651],[-119.66,34.4763],[-119.611,34.4968],[-119.75,34.5581],[-119.629,34.5122],[-119.65,34.4769],[-119.647,34.4745],[-119.628,34.5264],[-119.64,34.4612],[-119.62,34.5388],[-119.639,34.4611],[-119.651,34.4642],[-119.659,34.4705],[-119.903,34.7608],[-119.625,34.4955],[-119.637,34.4977],[-119.661,34.4783],[-119.611,34.4969],[-119.631,34.5202],[-119.648,34.4705],[-119.631,34.5192],[-119.634,34.5041],[-119.65,34.4665],[-119.637,34.4978],[-119.639,34.4612],[-119.639,34.4606],[-119.611,34.4971],[-119.591,34.4636],[-119.596,34.493],[-119.647,34.4743],[-119.632,34.481],[-119.756,34.5719],[-119.612,34.4549],[-119.609,34.5028],[-119.648,34.4737],[-119.649,34.4687],[-119.903,34.7606],[-119.609,34.5026],[-119.66,34.4768],[-119.496,34.4838],[-119.649,34.468],[-119.62,34.5373],[-119.592,34.4555],[-119.566,34.5028],[-119.65,34.4667],[-119.649,34.4691],[-119.592,34.4614],[-119.634,34.504],[-119.623,34.4687],[-119.611,34.497],[-119.648,34.4721],[-119.631,34.5194],[-119.645,34.4746],[-119.648,34.4644],[-119.625,34.4953],[-119.63,34.5212],[-119.592,34.4564],[-119.609,34.5039],[-119.609,34.5024],[-119.63,34.5121],[-119.66,34.4791],[-119.63,34.5295],[-119.656,34.463],[-119.655,34.4607],[-119.651,34.4649],[-119.619,34.5405],[-119.612,34.4965],[-119.651,34.4639],[-119.628,34.527],[-119.661,34.4743],[-119.637,34.4976]];
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