var subSightings = [[-119.63,34.5117],[-119.633,34.5061],[-119.601,34.5121],[-119.616,34.5368],[-119.633,34.5063],[-119.632,34.5144],[-119.724,34.5349],[-119.631,34.5293],[-119.731,34.4553],[-119.631,34.5185],[-120.232,34.4974],[-119.63,34.5212],[-119.631,34.5212],[-119.728,34.4583],[-119.761,34.5394],[-119.629,34.512],[-119.631,34.5199],[-119.925,34.7664],[-119.63,34.5131],[-119.631,34.536],[-119.762,34.5392],[-119.731,34.4552],[-119.63,34.5302],[-119.761,34.5393],[-119.731,34.4618],[-119.601,34.5126],[-119.315,34.2797],[-119.31,34.2765],[-119.785,34.556],[-119.628,34.5269],[-119.314,34.278],[-119.346,34.3022],[-119.631,34.5127],[-119.605,34.5077],[-119.761,34.5392],[-119.627,34.5243],[-119.628,34.5217],[-119.761,34.5395],[-119.734,34.5366],[-119.63,34.5122],[-119.765,34.4093],[-119.713,34.5347]];
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