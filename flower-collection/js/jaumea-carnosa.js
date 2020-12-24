var subSightings = [[-119.312,34.2789],[-119.83,34.4185],[-119.844,34.4082],[-119.661,34.4203],[-119.312,34.2788],[-119.851,34.411],[-119.85,34.4114],[-119.85,34.4077],[-119.851,34.4108],[-119.85,34.4079],[-119.831,34.4182],[-119.845,34.4064],[-119.312,34.2787],[-119.851,34.4101],[-119.851,34.4113],[-119.847,34.4089],[-119.83,34.4184],[-119.831,34.4184],[-119.845,34.4066],[-119.85,34.4082],[-119.85,34.4095],[-119.848,34.4109],[-119.844,34.4083],[-119.845,34.4065],[-119.851,34.4109],[-119.845,34.4063],[-119.844,34.4084],[-119.844,34.4081],[-119.831,34.4183],[-119.85,34.4098],[-119.311,34.2774],[-119.851,34.4087],[-119.85,34.408],[-119.844,34.4063],[-119.844,34.4064]];
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