var subSightings = [[-119.653,34.4568],[-119.586,34.4699],[-119.729,34.4613],[-119.654,34.4578],[-119.757,34.511],[-119.733,34.4531],[-119.587,34.4696],[-119.733,34.4536],[-119.733,34.4534],[-119.734,34.4489],[-119.733,34.4533],[-119.729,34.4609],[-119.638,34.4935],[-119.587,34.4699],[-119.756,34.5137],[-119.734,34.449],[-119.747,34.4909],[-119.728,34.4605],[-119.729,34.4606],[-119.637,34.4964],[-119.735,34.449],[-119.638,34.4969],[-119.654,34.457],[-119.587,34.4698],[-119.756,34.5112],[-119.611,34.455],[-119.654,34.4581],[-119.68,34.4973],[-119.729,34.4608],[-119.725,34.4762],[-119.729,34.4611],[-119.68,34.4969],[-119.728,34.461],[-119.637,34.4963],[-119.759,34.5246],[-119.735,34.4489],[-119.735,34.4491],[-119.654,34.4579],[-119.653,34.4571],[-119.729,34.461],[-119.747,34.491],[-119.591,34.4637],[-119.688,34.4639],[-119.735,34.4478],[-119.638,34.4963],[-119.733,34.4535],[-119.611,34.4551],[-119.654,34.458],[-119.587,34.4692],[-119.586,34.4698]];
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