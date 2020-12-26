var subSightings = [[-119.654,34.459],[-119.591,34.458],[-119.592,34.4597],[-119.136,34.4527],[-119.592,34.4564],[-119.592,34.4559],[-119.651,34.4636],[-119.968,34.74],[-119.732,34.467],[-119.591,34.4604],[-119.621,34.4943],[-119.748,34.4894],[-119.653,34.4565],[-119.652,34.4625],[-120.232,34.4975],[-119.766,34.6321],[-120.065,34.5076],[-119.689,34.4711],[-119.591,34.4588],[-119.651,34.4638],[-119.966,34.7534],[-119.623,34.469],[-119.591,34.4581],[-119.728,34.4734],[-119.672,34.4976],[-119.728,34.4609],[-119.747,34.4912],[-119.652,34.4624],[-119.766,34.6319],[-119.868,34.7373],[-119.623,34.4683],[-119.38,34.507],[-119.542,34.486],[-119.623,34.4686],[-119.591,34.464],[-119.637,34.4955],[-119.745,34.4941],[-119.623,34.4687],[-120.057,34.7462],[-119.689,34.4705],[-120.008,34.7501],[-119.496,34.4817],[-120.057,34.7461],[-120.007,34.8092],[-119.745,34.4927],[-119.746,34.4941],[-119.732,34.4659],[-119.759,34.5246],[-119.591,34.4631],[-119.592,34.4596],[-119.733,34.4537],[-119.76,34.5241],[-119.672,34.5009],[-119.748,34.4899],[-119.935,34.7683],[-119.592,34.4562],[-119.672,34.498],[-119.592,34.4563],[-119.651,34.4633],[-119.748,34.4896],[-119.624,34.4633],[-119.746,34.4943],[-119.748,34.4895],[-119.623,34.4684]];
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