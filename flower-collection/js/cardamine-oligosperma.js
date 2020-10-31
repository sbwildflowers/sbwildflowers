var subSightings = [[-119.65,34.4606],[-119.65,34.4611],[-119.692,34.459],[-119.635,34.504],[-119.611,34.451],[-119.616,34.4955],[-119.729,34.4551],[-119.772,34.4196],[-119.633,34.505],[-119.488,34.4873],[-119.636,34.5025],[-119.73,34.4551],[-119.732,34.4537],[-119.58,34.4902],[-119.732,34.4533],[-119.663,34.4654],[-119.732,34.4534],[-119.758,34.5187],[-119.825,34.4226],[-119.634,34.5042],[-119.729,34.4554],[-119.824,34.4225],[-119.613,34.4558],[-119.77,34.421],[-119.65,34.4613],[-119.724,34.4762],[-119.729,34.4559],[-119.606,34.494],[-119.65,34.4612],[-119.734,34.449],[-119.734,34.4532],[-119.718,34.4737],[-119.732,34.4535],[-119.735,34.4489],[-119.759,34.41],[-119.637,34.4774],[-119.651,34.4558],[-119.652,34.4561],[-119.781,34.4316],[-119.657,34.4636],[-119.65,34.4607],[-119.73,34.4552],[-119.74,34.4048],[-119.618,34.4946],[-119.603,34.4933],[-119.732,34.4539],[-119.772,34.4133],[-119.728,34.4595],[-119.635,34.5039],[-119.61,34.5008],[-119.729,34.4546],[-119.771,34.4145],[-119.61,34.4553],[-119.798,34.4239],[-119.756,34.5133],[-119.649,34.4585],[-119.729,34.4553],[-119.65,34.4568],[-119.563,34.4859],[-119.606,34.4941],[-119.749,34.4884],[-119.61,34.4552],[-119.729,34.4558],[-119.457,34.4924],[-119.732,34.4532],[-119.781,34.4317],[-119.642,34.4627],[-119.78,34.4321],[-119.633,34.5063],[-119.757,34.5151],[-119.825,34.4223],[-119.645,34.4597],[-119.73,34.4553],[-119.594,34.4914],[-119.732,34.4536],[-119.74,34.4046],[-119.729,34.456],[-119.64,34.4633],[-119.8,34.4239]];
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