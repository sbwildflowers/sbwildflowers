var subSightings = [[-119.546,34.4918],[-119.958,34.5357],[-119.754,34.5727],[-119.737,34.4677],[-119.609,34.5045],[-119.631,34.5205],[-119.613,34.4957],[-119.956,34.535],[-119.736,34.4677],[-119.627,34.5234],[-119.627,34.5262],[-119.636,34.4896],[-119.607,34.5061],[-119.627,34.526],[-119.769,34.5514],[-119.308,34.6961],[-119.528,34.4868],[-119.609,34.5046],[-119.678,34.4722],[-119.96,34.5359],[-119.764,34.5646],[-119.631,34.5083],[-119.737,34.4678],[-119.892,34.7544],[-119.752,34.5995],[-119.609,34.5047],[-119.96,34.533],[-119.254,34.4722],[-119.627,34.5225],[-119.636,34.4918],[-119.746,34.5556],[-119.631,34.5084],[-119.738,34.5528],[-119.728,34.4595],[-119.636,34.5022],[-119.728,34.4597],[-119.631,34.5214],[-119.754,34.5726],[-119.756,34.5728],[-119.594,34.4914],[-119.728,34.4596],[-119.478,34.49],[-119.634,34.51],[-119.62,34.5384],[-119.957,34.5363],[-119.609,34.5044],[-119.631,34.5194],[-119.783,34.433],[-119.746,34.5555],[-119.594,34.4913],[-119.75,34.6039],[-119.633,34.4796],[-119.757,34.5704],[-119.629,34.5214],[-119.783,34.4331],[-119.648,34.517],[-119.633,34.4797],[-119.634,34.5101],[-119.757,34.5706],[-119.629,34.5213],[-119.627,34.5261],[-119.629,34.5123],[-119.617,34.481],[-119.627,34.5242],[-119.958,34.5356],[-119.782,34.5591],[-119.985,34.801],[-119.643,34.5143],[-119.608,34.5047],[-119.79,34.5366],[-119.689,34.5143],[-119.604,34.5098],[-119.75,34.6003]];
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