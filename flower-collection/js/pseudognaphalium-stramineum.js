var subSightings = [[-119.653,34.4566],[-119.639,34.4628],[-119.64,34.463],[-119.659,34.4692],[-119.645,34.4509],[-119.661,34.4742],[-119.846,34.4089],[-119.641,34.4535],[-119.66,34.4706],[-119.63,34.5213],[-119.592,34.4542],[-119.654,34.4577],[-119.845,34.4065],[-119.631,34.5205],[-119.845,34.4066],[-119.663,34.4788],[-119.654,34.459],[-119.893,34.7891],[-119.849,34.4084],[-119.654,34.4546],[-119.756,34.5733],[-119.629,34.512],[-119.656,34.4623],[-119.649,34.4738],[-119.737,34.4026],[-119.659,34.4678],[-119.655,34.4614],[-119.591,34.468],[-119.646,34.4498],[-119.64,34.4622],[-119.778,34.7573],[-119.649,34.4761],[-119.631,34.521],[-119.659,34.466],[-119.639,34.4608],[-119.659,34.4694],[-119.845,34.4064],[-119.957,34.7794],[-119.591,34.465],[-119.654,34.4574],[-119.632,34.5209],[-119.594,34.4706],[-119.639,34.4575],[-119.64,34.4633],[-119.63,34.5127],[-119.655,34.4602],[-119.649,34.467],[-119.649,34.463],[-119.641,34.454],[-119.629,34.5119],[-119.648,34.4649],[-119.661,34.4801],[-119.66,34.4769],[-119.66,34.4772],[-119.644,34.4749]];
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