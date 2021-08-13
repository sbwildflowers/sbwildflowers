var subSightings = [[-119.594,34.4721],[-119.635,34.5023],[-119.636,34.4859],[-119.586,34.4801],[-119.637,34.4972],[-119.634,34.5042],[-119.657,34.525],[-119.708,34.4952],[-119.637,34.4963],[-119.653,34.4608],[-119.749,34.4877],[-119.643,34.4617],[-119.647,34.4611],[-119.698,34.4827],[-119.637,34.4965],[-119.637,34.4949],[-119.699,34.4783],[-119.725,34.4756],[-119.587,34.4802],[-119.717,34.4725],[-119.636,34.491],[-119.709,34.4952],[-119.588,34.4802],[-119.721,34.4745],[-119.631,34.5105],[-119.631,34.5087],[-119.633,34.5172],[-119.72,34.4746],[-119.715,34.4723],[-119.724,34.4757],[-119.583,34.4808],[-119.58,34.4809],[-119.639,34.4722],[-119.635,34.4986],[-119.7,34.4783],[-119.744,34.4846],[-119.698,34.4783],[-119.729,34.4715],[-119.634,34.504],[-119.634,34.5048],[-119.758,34.5137],[-119.634,34.5003]];
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