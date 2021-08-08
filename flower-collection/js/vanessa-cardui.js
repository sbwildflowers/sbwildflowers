var subSightings = [[-119.754,34.5272],[-119.603,34.4678],[-119.498,34.4857],[-119.602,34.4634],[-119.638,34.4855],[-119.756,34.5728],[-119.59,34.4771],[-119.609,34.5022],[-119.91,34.7736],[-119.96,34.5327],[-119.609,34.4769],[-119.763,34.565],[-119.653,34.5198],[-120.021,34.7664],[-119.697,34.4997],[-120.005,34.7669],[-119.754,34.5266],[-119.637,34.4782],[-119.596,34.4655],[-119.605,34.4745],[-119.618,34.4817],[-119.639,34.4785],[-119.756,34.5718],[-119.63,34.5303],[-119.623,34.4579],[-119.651,34.4652],[-119.77,34.5426],[-119.616,34.4953],[-119.702,34.4748],[-119.688,34.503],[-119.768,34.5637],[-120.007,34.7675],[-119.637,34.4778],[-120.23,34.4718],[-119.62,34.5367],[-119.643,34.465],[-119.749,34.4872],[-119.718,34.4738],[-119.644,34.4642],[-119.498,34.4861],[-119.956,34.546],[-119.511,34.4896],[-119.498,34.4859],[-119.686,34.501],[-119.659,34.4669],[-119.638,34.4845],[-119.761,34.5394],[-119.637,34.4977],[-119.754,34.5726]];
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