var subSightings = [[-119.611,34.4956],[-119.61,34.4956],[-119.672,34.5213],[-119.699,34.5504],[-119.611,34.4957],[-119.717,34.5398],[-119.904,34.7792],[-119.87,34.7735],[-119.9,34.7977],[-119.884,34.7929],[-119.846,34.7501],[-119.611,34.4954],[-119.729,34.4724],[-119.673,34.524],[-119.932,34.8052],[-119.676,34.5231],[-119.839,34.7503],[-119.842,34.7508],[-119.656,34.5235],[-119.832,34.7501],[-119.891,34.7954],[-119.908,34.7991],[-119.91,34.7713],[-119.672,34.5214],[-119.652,34.4626],[-119.609,34.4954],[-119.672,34.5212],[-119.902,34.7825],[-119.61,34.4955],[-119.942,34.8069],[-119.61,34.4954],[-119.872,34.7867],[-119.92,34.8018],[-119.609,34.4953],[-119.611,34.4953],[-119.84,34.7502],[-119.827,34.7506],[-119.636,34.5401],[-119.677,34.5228],[-119.625,34.5347],[-119.672,34.5211],[-119.63,34.5298],[-119.809,34.7571],[-119.928,34.8045],[-119.611,34.4955],[-119.63,34.53],[-119.916,34.8004],[-119.673,34.5241],[-119.609,34.4955],[-119.844,34.7509],[-119.903,34.7978],[-119.676,34.5232],[-119.784,34.7557],[-119.876,34.7907],[-119.847,34.75],[-119.908,34.7766],[-119.786,34.7561],[-119.833,34.75],[-119.61,34.4957],[-119.871,34.7741],[-119.774,34.5435],[-119.827,34.7507],[-119.904,34.7791],[-119.901,34.7838]];
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