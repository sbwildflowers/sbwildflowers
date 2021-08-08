var subSightings = [[-119.771,34.5564],[-119.757,34.5686],[-119.847,34.4062],[-119.772,34.5577],[-119.773,34.5587],[-119.67,34.4677],[-119.663,34.4545],[-119.842,34.4103],[-119.845,34.4061],[-119.802,34.4207],[-119.77,34.5563],[-119.771,34.557],[-119.033,34.0892],[-119.014,34.0723],[-119.793,34.4184],[-119.774,34.5462],[-119.771,34.5566],[-119.753,34.5061],[-119.754,34.5064],[-119.944,34.6636],[-119.748,34.601],[-119.752,34.5045],[-119.845,34.4065],[-119.844,34.4084],[-119.753,34.5053],[-119.734,34.4397],[-119.754,34.5066],[-119.769,34.5481],[-119.771,34.5565],[-119.745,34.6005],[-119.771,34.5568],[-119.788,34.5457],[-119.772,34.558],[-119.753,34.5055],[-119.753,34.505],[-119.77,34.5555],[-119.8,34.4184],[-119.845,34.4066],[-119.765,34.4373],[-119.846,34.4061],[-119.799,34.4183],[-119.779,34.5459],[-119.774,34.5456],[-119.7,34.4849],[-119.771,34.5567]];
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