var subSightings = [[-119.623,34.4606],[-119.589,34.4913],[-119.59,34.4692],[-119.745,34.6125],[-119.728,34.4605],[-119.731,34.4646],[-119.689,34.4644],[-119.591,34.4675],[-119.732,34.4651],[-119.624,34.4619],[-119.623,34.4607],[-119.73,34.4691],[-119.732,34.4665],[-119.728,34.4614],[-119.73,34.469],[-119.685,34.4758],[-119.654,34.459],[-119.653,34.457],[-119.728,34.4611],[-119.591,34.468],[-119.73,34.4607],[-119.745,34.6127],[-119.73,34.4692],[-119.689,34.4642],[-119.728,34.4616],[-119.654,34.4591],[-119.591,34.4638],[-119.591,34.4656],[-119.732,34.4663],[-119.732,34.4647],[-119.728,34.4612],[-119.654,34.4589],[-119.732,34.4536],[-119.654,34.4592],[-119.732,34.4535],[-119.655,34.4595],[-119.732,34.4537],[-119.728,34.461],[-119.729,34.4609],[-119.654,34.4594],[-119.654,34.4595],[-119.732,34.4653],[-119.59,34.469],[-119.654,34.4593],[-119.59,34.4691],[-119.728,34.4613],[-119.623,34.4605],[-119.745,34.6126],[-119.732,34.4664]];
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