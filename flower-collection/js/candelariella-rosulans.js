var subSightings = [[-119.807,34.4241],[-119.639,34.4847],[-119.633,34.5172],[-119.612,34.4552],[-119.711,34.495],[-119.65,34.4611],[-119.762,34.5374],[-119.651,34.4627],[-119.639,34.4743],[-119.69,34.4902],[-119.757,34.5332],[-120.076,34.5176],[-119.611,34.4526],[-119.644,34.4631],[-119.77,34.5479],[-119.75,34.5015],[-119.7,34.4947],[-119.659,34.4651],[-119.636,34.486],[-119.752,34.5038],[-119.755,34.5095],[-119.718,34.4737],[-119.65,34.4613],[-119.714,34.4722],[-119.644,34.4647],[-119.639,34.4727],[-119.699,34.4909],[-119.653,34.4563],[-119.749,34.5004],[-119.656,34.5252],[-119.572,34.4714],[-119.655,34.5238],[-119.645,34.4609],[-119.743,34.4065],[-119.609,34.4549],[-119.614,34.4955],[-119.639,34.4853],[-119.748,34.4974],[-119.656,34.5253],[-119.749,34.4999],[-119.631,34.5209],[-119.638,34.4866],[-119.646,34.4605],[-119.637,34.4869],[-119.644,34.4628],[-119.599,34.4941],[-119.632,34.5142],[-119.643,34.4614],[-119.759,34.5372],[-119.652,34.4565],[-119.729,34.4614],[-119.757,34.5298],[-120.075,34.5168],[-119.652,34.456],[-119.639,34.4806],[-119.59,34.4778],[-119.639,34.4848],[-119.69,34.4898],[-119.746,34.4952],[-119.59,34.4552],[-120.067,34.5254],[-119.651,34.4562],[-119.639,34.4852],[-119.65,34.458],[-119.638,34.4758],[-119.639,34.4845],[-119.639,34.4738],[-120.076,34.5168],[-119.729,34.4608],[-119.699,34.4908],[-119.63,34.5108],[-119.639,34.4846],[-119.712,34.4728],[-119.717,34.4736],[-119.731,34.4642]];
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