var subSightings = [[-119.653,34.4612],[-119.72,34.4745],[-119.636,34.4941],[-119.23,34.4974],[-119.729,34.4556],[-119.245,34.4678],[-119.246,34.4676],[-119.724,34.4758],[-119.653,34.4614],[-119.691,34.4601],[-119.242,34.4676],[-119.869,34.5078],[-119.651,34.4562],[-119.223,34.4896],[-119.648,34.4616],[-119.729,34.4554],[-119.671,34.519],[-119.72,34.4743],[-119.569,34.4709],[-119.568,34.4806],[-119.589,34.4802],[-119.653,34.4613],[-119.65,34.4615],[-119.566,34.4782],[-119.752,34.5194],[-119.729,34.4555],[-119.23,34.5009],[-119.65,34.4624],[-119.637,34.4815],[-119.753,34.519],[-119.649,34.462],[-119.636,34.4916],[-119.244,34.4672],[-119.59,34.4917],[-119.643,34.4671],[-119.637,34.4929],[-119.65,34.4631],[-119.641,34.4729],[-119.636,34.4935],[-119.636,34.495],[-119.649,34.4635],[-119.756,34.5089],[-119.569,34.471],[-119.636,34.4951],[-119.636,34.5019],[-119.568,34.4777],[-119.568,34.4809],[-119.749,34.4883],[-119.729,34.4553],[-119.956,34.5289],[-119.749,34.4879],[-119.636,34.4917],[-119.724,34.4757],[-119.513,34.4873],[-119.69,34.4627],[-119.752,34.5199],[-119.565,34.4796],[-119.609,34.4552],[-119.566,34.4855],[-119.648,34.4614],[-119.72,34.4747],[-119.946,34.5307],[-119.569,34.4708],[-119.215,34.487],[-120.053,34.7537],[-119.633,34.5059],[-119.752,34.5196],[-119.637,34.4932],[-119.69,34.4637],[-119.724,34.4764],[-119.636,34.4954],[-119.576,34.4885],[-119.64,34.4746],[-119.565,34.4797],[-119.707,34.4727],[-119.637,34.4816],[-119.725,34.4756],[-119.96,34.5357],[-119.653,34.4559],[-119.75,34.5233],[-119.635,34.4986],[-119.755,34.5121],[-119.577,34.4892],[-119.224,34.4733],[-119.496,34.4816],[-119.72,34.4744]];
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