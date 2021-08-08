var subSightings = [[-119.783,34.5589],[-119.618,34.4945],[-119.678,34.4717],[-119.65,34.4653],[-119.681,34.4744],[-119.639,34.5127],[-119.631,34.5081],[-119.679,34.5205],[-119.678,34.4706],[-119.611,34.4969],[-119.628,34.4954],[-119.593,34.4907],[-119.589,34.4752],[-119.754,34.5256],[-119.639,34.4838],[-119.502,34.4868],[-119.608,34.5049],[-119.589,34.4754],[-119.267,34.4736],[-119.786,34.55],[-119.644,34.4634],[-119.638,34.479],[-119.627,34.5258],[-119.78,34.5563],[-119.781,34.559],[-119.639,34.4851],[-119.639,34.4748],[-119.633,34.5091],[-119.631,34.4956],[-119.632,34.4809],[-119.274,34.4717],[-119.595,34.4924],[-119.603,34.5112],[-119.637,34.4979],[-119.591,34.4886],[-119.666,34.467],[-119.639,34.484],[-119.635,34.4829],[-119.772,34.5443],[-119.646,34.4743],[-119.61,34.4955],[-119.629,34.4955],[-119.63,34.4953],[-119.771,34.5578],[-119.136,34.4527],[-119.705,34.4941],[-119.654,34.4595],[-119.753,34.5052],[-119.632,34.5075],[-119.638,34.4787],[-119.533,34.4886],[-119.644,34.4848],[-119.592,34.4917],[-119.638,34.4786],[-119.28,34.5187]];
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