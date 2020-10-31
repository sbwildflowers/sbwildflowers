var subSightings = [[-119.673,34.4165],[-119.957,34.5402],[-119.75,34.4345],[-119.758,34.519],[-119.646,34.4608],[-119.592,34.4573],[-119.729,34.4613],[-119.622,34.4564],[-119.587,34.4693],[-119.73,34.4693],[-119.659,34.466],[-119.591,34.46],[-119.745,34.4939],[-119.654,34.4602],[-119.687,34.4656],[-119.592,34.471],[-119.748,34.489],[-119.623,34.4577],[-119.729,34.461],[-119.753,34.5192],[-119.623,34.469],[-119.787,34.4248],[-119.591,34.4527],[-119.592,34.4706],[-119.729,34.4611],[-119.736,34.4264],[-119.729,34.4607],[-119.508,34.424],[-119.639,34.4618],[-119.653,34.4625],[-119.659,34.4659],[-119.702,34.4719],[-119.705,34.4452],[-119.639,34.4596],[-120.219,34.4966],[-119.956,34.552],[-119.65,34.4582],[-119.622,34.4532],[-119.638,34.4607],[-119.816,34.4236],[-119.687,34.4678],[-119.749,34.4887],[-119.622,34.469],[-119.728,34.4607],[-120.071,34.5428],[-119.748,34.4893],[-119.654,34.46],[-119.717,34.4733],[-119.956,34.5454],[-119.796,34.4886],[-119.639,34.4621],[-119.639,34.4616],[-119.592,34.4563],[-119.729,34.4711],[-119.747,34.4916],[-119.735,34.4494],[-119.622,34.4509],[-119.639,34.4614],[-119.732,34.4532],[-119.73,34.4698],[-119.623,34.4689],[-119.692,34.4583],[-119.592,34.4705],[-119.764,34.4118],[-119.688,34.4653],[-119.612,34.4542],[-119.639,34.4592],[-119.65,34.4581],[-119.728,34.4608],[-119.732,34.4531]];
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