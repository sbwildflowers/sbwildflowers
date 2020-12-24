var subSightings = [[-119.621,34.457],[-119.712,34.4732],[-119.778,34.5522],[-119.649,34.4596],[-119.688,34.4684],[-119.645,34.4639],[-119.245,34.468],[-119.621,34.4569],[-119.65,34.4607],[-119.255,34.4637],[-119.65,34.4611],[-119.244,34.4677],[-119.651,34.4609],[-119.746,34.4854],[-119.782,34.5502],[-119.746,34.4856],[-119.746,34.4853],[-119.748,34.487],[-119.644,34.4628],[-119.651,34.4607],[-119.743,34.4809],[-119.644,34.4639],[-119.645,34.4645],[-119.651,34.4608],[-119.747,34.4859],[-120.24,34.4842],[-119.651,34.4606],[-119.644,34.464],[-119.644,34.4636],[-119.643,34.4612],[-119.662,34.4657],[-119.749,34.574],[-119.651,34.461],[-119.651,34.4557],[-119.783,34.5484],[-119.712,34.4731],[-119.742,34.4796],[-119.707,34.4734],[-119.761,34.5663],[-119.706,34.4714],[-119.644,34.4612],[-119.747,34.4857],[-119.703,34.4726],[-119.644,34.4638],[-119.65,34.461],[-119.753,34.5726],[-119.645,34.4638],[-119.745,34.4852],[-119.644,34.4637],[-119.617,34.4479],[-119.703,34.4725],[-119.748,34.4866],[-119.612,34.4553],[-119.643,34.4611],[-119.748,34.4861],[-119.747,34.486],[-119.612,34.4554],[-119.65,34.4606],[-120.24,34.4851],[-119.748,34.4869],[-119.643,34.4518],[-119.745,34.4851],[-119.757,34.5696],[-119.614,34.4558],[-119.65,34.4609],[-119.65,34.4612],[-119.659,34.466],[-119.962,34.7585],[-119.749,34.4869],[-119.707,34.4707],[-119.702,34.4741],[-119.778,34.5523],[-119.614,34.4557],[-119.644,34.4611],[-119.746,34.4855],[-120.053,34.7545],[-119.592,34.4711]];
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