var subSightings = [[-119.658,34.4646],[-119.651,34.4776],[-119.564,34.5336],[-119.64,34.4627],[-119.796,34.4268],[-119.644,34.475],[-119.66,34.4771],[-119.634,34.5049],[-119.639,34.4581],[-119.661,34.4802],[-119.741,34.4177],[-119.653,34.4548],[-119.628,34.5272],[-120.232,34.4974],[-119.77,34.561],[-119.771,34.5604],[-119.644,34.4513],[-119.651,34.4646],[-119.542,34.4864],[-119.663,34.4788],[-119.542,34.4865],[-119.629,34.512],[-119.629,34.5291],[-119.566,34.5386],[-119.634,34.5051],[-119.66,34.4797],[-119.741,34.4191],[-119.658,34.4657],[-119.686,34.5149],[-119.648,34.4647],[-119.663,34.4184],[-119.741,34.4188],[-119.633,34.506],[-119.732,34.4678],[-119.807,34.4253],[-119.741,34.4187],[-119.8,34.426],[-119.639,34.4629],[-119.741,34.4179],[-119.64,34.4622],[-119.65,34.4654],[-119.631,34.5213],[-119.642,34.4525],[-119.805,34.4254],[-119.796,34.4272],[-119.654,34.4592],[-119.628,34.5117],[-119.799,34.426],[-119.633,34.5062],[-119.771,34.5606],[-119.801,34.426],[-119.633,34.5058],[-119.641,34.4533]];
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