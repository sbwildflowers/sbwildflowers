var subSightings = [[-119.81,34.4249],[-119.748,34.4892],[-119.762,34.5662],[-119.643,34.4781],[-119.77,34.5606],[-119.757,34.5702],[-119.631,34.5213],[-119.633,34.5063],[-119.735,34.5365],[-119.767,34.5647],[-119.629,34.529],[-119.639,34.4611],[-119.651,34.464],[-119.606,34.5074],[-119.761,34.5394],[-119.784,34.4325],[-119.612,34.4545],[-119.728,34.4613],[-119.542,34.4865],[-119.639,34.4613],[-119.748,34.5384],[-119.63,34.5122],[-119.63,34.5124],[-119.452,34.4916],[-119.731,34.4552],[-119.761,34.5393],[-119.761,34.5401],[-119.609,34.5028],[-119.605,34.5075],[-119.591,34.4636],[-119.625,34.4955],[-119.609,34.5038],[-119.76,34.5665],[-119.623,34.4687],[-119.777,34.546],[-119.76,34.5664],[-119.654,34.4589],[-119.606,34.5072],[-119.592,34.4596],[-119.762,34.5664],[-119.762,34.5405],[-119.624,34.4651],[-119.615,34.4955],[-119.624,34.4609],[-119.623,34.4562],[-119.495,34.4801],[-119.633,34.5062],[-119.64,34.4546],[-119.622,34.4516],[-119.77,34.5464]];
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