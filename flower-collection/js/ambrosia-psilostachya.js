var subSightings = [[-119.632,34.5142],[-119.754,34.5724],[-119.316,34.2814],[-119.799,34.4756],[-119.849,34.4077],[-119.826,34.4216],[-119.799,34.4204],[-119.772,34.5459],[-119.847,34.4062],[-119.739,34.405],[-119.767,34.5647],[-119.69,34.4493],[-119.772,34.5458],[-119.315,34.2799],[-119.528,34.3965],[-119.796,34.4187],[-119.847,34.4066],[-119.846,34.4061],[-119.606,34.507],[-119.826,34.4217],[-119.677,34.4989],[-119.311,34.2764],[-119.847,34.4067],[-119.795,34.424],[-119.885,34.4147],[-119.609,34.5023],[-119.849,34.4082],[-119.724,34.5354],[-119.845,34.4061],[-118.997,34.0942],[-119.761,34.5394],[-119.795,34.4184],[-119.848,34.4068],[-119.754,34.573],[-119.847,34.4068],[-119.632,34.458],[-119.851,34.4113],[-119.609,34.502],[-119.609,34.5021],[-119.769,34.5533],[-119.609,34.5028],[-119.609,34.5022],[-119.757,34.4634],[-119.564,34.5346],[-119.769,34.5534],[-119.797,34.4187],[-119.763,34.4602],[-119.76,34.5664],[-119.8,34.4186],[-119.761,34.5397],[-119.798,34.4204],[-119.606,34.5072],[-119.757,34.5702],[-119.714,34.535],[-119.771,34.5604],[-119.762,34.5402],[-119.73,34.4525],[-119.8,34.4185],[-119.793,34.4244],[-119.611,34.4968],[-119.797,34.4188],[-119.791,34.4181],[-119.675,34.4554],[-119.609,34.5024],[-119.763,34.54],[-119.681,34.5234],[-119.796,34.4186],[-119.611,34.4979],[-119.754,34.5726],[-119.606,34.5071],[-119.685,34.4921]];
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