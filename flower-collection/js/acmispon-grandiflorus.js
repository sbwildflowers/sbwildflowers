var subSightings = [[-119.639,34.4547],[-119.644,34.4643],[-119.647,34.4607],[-119.639,34.4585],[-120.241,34.4865],[-119.644,34.461],[-119.647,34.462],[-119.639,34.4561],[-119.507,34.4459],[-119.651,34.4615],[-119.666,34.4675],[-119.644,34.4642],[-119.643,34.4618],[-119.506,34.453],[-119.647,34.4609],[-119.706,34.4704],[-119.651,34.461],[-119.643,34.4525],[-119.642,34.4531],[-119.644,34.4637],[-119.645,34.4639],[-119.643,34.4645],[-119.508,34.4487],[-119.64,34.4621],[-119.644,34.4641],[-119.509,34.4492],[-119.639,34.4632],[-119.643,34.4668],[-119.648,34.4613],[-119.66,34.4664],[-119.644,34.4699],[-119.644,34.465],[-119.642,34.4619],[-119.644,34.4611],[-119.647,34.461],[-119.643,34.4646],[-119.643,34.4619],[-119.643,34.4654],[-119.644,34.4645],[-119.66,34.4702],[-119.662,34.4661],[-119.653,34.4548],[-119.643,34.4673],[-119.507,34.4457],[-119.651,34.4638],[-119.644,34.4644],[-119.642,34.4625],[-119.644,34.4621],[-119.644,34.4636],[-119.644,34.4647],[-119.644,34.4698],[-119.644,34.4639],[-119.647,34.4608],[-119.508,34.4505],[-119.639,34.4551],[-119.648,34.4614],[-119.639,34.4576],[-119.651,34.4637],[-119.663,34.4657],[-119.647,34.465],[-119.639,34.4584],[-119.65,34.4611],[-119.706,34.4748],[-119.648,34.4615],[-119.638,34.4635],[-119.644,34.4612],[-119.644,34.4635],[-119.643,34.4647],[-119.644,34.4638],[-119.644,34.4646],[-119.647,34.4624],[-119.635,34.4595],[-119.507,34.4454],[-119.643,34.4617],[-119.65,34.4607],[-119.645,34.464],[-119.639,34.463],[-119.665,34.4662],[-119.506,34.4427],[-119.707,34.4735],[-119.639,34.4608],[-119.507,34.4463],[-119.643,34.4519],[-119.645,34.4643],[-119.639,34.4581],[-119.644,34.464],[-119.641,34.4536],[-119.507,34.4464],[-119.641,34.454]];
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