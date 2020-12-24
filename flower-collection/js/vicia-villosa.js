var subSightings = [[-119.77,34.5516],[-120.066,34.5303],[-119.8,34.4185],[-119.769,34.5516],[-119.771,34.5491],[-119.729,34.4609],[-119.729,34.461],[-119.757,34.5294],[-119.731,34.4617],[-119.77,34.5518],[-119.73,34.4615],[-119.757,34.5325],[-119.77,34.5517],[-119.773,34.546],[-119.73,34.4614],[-119.798,34.4185],[-119.815,34.5433],[-119.757,34.5344],[-119.73,34.4624],[-119.738,34.4226],[-119.757,34.53],[-119.835,34.5237],[-119.757,34.5295],[-119.774,34.5459],[-119.789,34.4179],[-119.796,34.4188],[-119.73,34.4618],[-119.729,34.4611],[-119.77,34.5486],[-119.786,34.5532],[-119.73,34.4617],[-119.771,34.5486],[-119.867,34.5075],[-119.731,34.4614],[-119.757,34.5296],[-119.77,34.5423],[-119.772,34.5452],[-119.806,34.5117]];
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