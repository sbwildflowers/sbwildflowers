var subSightings = [[-119.645,34.4642],[-119.641,34.4541],[-119.638,34.4807],[-119.592,34.4537],[-119.687,34.468],[-119.763,34.5646],[-119.632,34.4581],[-119.655,34.4581],[-119.651,34.4651],[-119.735,34.4649],[-119.64,34.4546],[-119.655,34.4602],[-119.639,34.4612],[-119.735,34.4647],[-119.592,34.4595],[-119.597,34.4642],[-119.651,34.464],[-119.651,34.4639],[-119.639,34.4787],[-119.645,34.4641],[-119.64,34.4627],[-119.639,34.4553],[-119.639,34.4786],[-119.641,34.4538],[-119.739,34.5226],[-119.654,34.4593],[-119.73,34.4693],[-119.638,34.4796],[-119.653,34.4546],[-119.65,34.4765],[-119.635,34.5009],[-119.654,34.4573],[-119.655,34.4609],[-119.64,34.473],[-119.583,34.4715],[-119.649,34.4728],[-119.658,34.4653],[-119.638,34.4803],[-119.653,34.4625],[-119.642,34.4532],[-119.646,34.4743],[-119.651,34.4632],[-119.677,34.4685],[-119.647,34.4709],[-119.64,34.4618],[-119.654,34.4586],[-119.64,34.4612],[-119.644,34.4646],[-119.657,34.4639],[-119.642,34.4525],[-119.644,34.4638],[-119.638,34.4789],[-119.655,34.4591],[-119.643,34.4772],[-119.637,34.478],[-119.644,34.4637],[-119.639,34.4829],[-119.636,34.4957],[-119.656,34.4629],[-119.653,34.4561],[-119.592,34.4614],[-119.644,34.464],[-119.638,34.4802],[-119.639,34.4808],[-119.639,34.463],[-119.638,34.4787],[-119.652,34.456],[-119.735,34.4643],[-119.63,34.4956],[-119.64,34.4622],[-119.729,34.4722]];
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