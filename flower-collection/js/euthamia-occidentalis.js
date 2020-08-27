var subSightings = [[-119.795,34.4254],[-119.847,34.4068],[-119.595,34.4923],[-119.595,34.4925],[-119.598,34.4939],[-119.591,34.4917],[-119.632,34.5149],[-119.847,34.4067],[-119.611,34.4969],[-119.63,34.5121],[-119.631,34.5212],[-119.634,34.5049],[-119.595,34.4921],[-119.596,34.4928],[-119.601,34.5126],[-119.846,34.4089],[-119.63,34.5123],[-119.631,34.5132],[-119.632,34.5146],[-119.631,34.5201],[-119.633,34.5172],[-119.631,34.5087],[-119.596,34.4933],[-119.631,34.5086],[-119.596,34.4929],[-119.588,34.4916],[-119.632,34.5145],[-119.313,34.2792],[-119.74,34.405],[-119.596,34.4927],[-119.592,34.4917],[-119.314,34.2794],[-119.542,34.4864],[-119.629,34.5292],[-119.596,34.4937],[-119.542,34.4865],[-119.595,34.492],[-119.628,34.527],[-119.634,34.505],[-119.595,34.4927],[-119.63,34.521],[-119.905,34.7626],[-119.63,34.5109],[-119.596,34.4932],[-119.771,34.5579],[-119.632,34.5143],[-119.634,34.5047],[-119.628,34.5219],[-119.611,34.4968],[-119.597,34.4935],[-119.595,34.4924],[-119.594,34.4915],[-119.612,34.4967],[-119.631,34.5213],[-119.628,34.5221],[-119.312,34.2783],[-119.757,34.5714],[-119.592,34.4916],[-119.612,34.4966],[-119.314,34.2793],[-119.595,34.4922],[-119.629,34.5122],[-119.595,34.4926],[-119.593,34.4915],[-119.612,34.4968],[-119.634,34.5048],[-119.581,34.4907],[-119.63,34.5213],[-119.528,34.3964],[-119.63,34.5127],[-119.596,34.4936]];
$(document).ready(function() {
	var vectorSource = new ol.source.Vector({
      //create empty vector
    });

	//create a bunch of icons and add to source vector
	subSightings.forEach(function(item,index) {
		var iconFeature = new ol.Feature({
		          geometry: new  
		            ol.geom.Point(ol.proj.fromLonLat(item)),
		        name: 'Flower',
		        population: 4000,
		        rainfall: 500
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
        src: 'flower.png'
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