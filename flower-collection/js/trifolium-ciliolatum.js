var subSightings = [[-119.683,34.4756],[-119.637,34.4979],[-119.634,34.5042],[-119.594,34.4914],[-119.745,34.4939],[-119.626,34.4954],[-119.637,34.4949],[-119.636,34.4957],[-119.636,34.495],[-119.625,34.4954],[-119.786,34.5503],[-119.758,34.5371],[-119.636,34.4949],[-119.619,34.4941],[-119.624,34.4953],[-119.606,34.5064],[-119.613,34.4955],[-119.76,34.5227],[-119.759,34.5279],[-119.637,34.4977],[-119.581,34.4904],[-119.758,34.5342],[-119.637,34.4948],[-119.581,34.4906],[-119.634,34.5049],[-119.635,34.504],[-119.627,34.4956],[-119.756,34.5127],[-119.636,34.4948],[-119.627,34.4955],[-119.636,34.4934],[-119.613,34.4954],[-119.638,34.4971],[-119.683,34.4753],[-119.636,34.4952],[-119.634,34.5043],[-119.622,34.4944],[-119.634,34.5044],[-119.597,34.4937],[-119.982,34.7972],[-119.584,34.4911],[-119.584,34.4907],[-119.615,34.4956],[-119.54,34.4868],[-119.627,34.4953],[-119.784,34.552],[-119.609,34.5029],[-119.746,34.4939],[-119.637,34.4972],[-119.617,34.4946],[-119.636,34.4935],[-119.746,34.4935],[-119.589,34.4915],[-119.758,34.529],[-119.759,34.5282],[-119.634,34.5045],[-119.745,34.4933],[-119.637,34.4978],[-119.754,34.5188],[-119.609,34.5028],[-119.762,34.5657],[-119.76,34.5664],[-119.762,34.5656],[-119.594,34.4915],[-119.613,34.4956],[-119.684,34.4754],[-119.758,34.5187],[-119.778,34.559],[-119.63,34.4953],[-119.621,34.4944],[-119.637,34.495],[-119.618,34.4945],[-119.638,34.4972],[-119.627,34.4954],[-119.977,34.7888],[-119.609,34.503],[-119.637,34.4953],[-119.589,34.4913],[-119.636,34.4933],[-119.636,34.4951],[-119.609,34.5032],[-119.745,34.4938],[-119.757,34.5177],[-119.636,34.4953]];
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