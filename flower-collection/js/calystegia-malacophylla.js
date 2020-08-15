var subSightings = [[-119.616,34.4954],[-119.568,34.478],[-119.568,34.4798],[-119.611,34.497],[-119.567,34.4775],[-119.749,34.5733],[-119.383,34.5076],[-119.495,34.4809],[-119.567,34.4796],[-119.75,34.5733],[-119.536,34.4882],[-119.592,34.4916],[-119.527,34.4869],[-119.567,34.478],[-119.748,34.5733],[-119.531,34.4877],[-119.496,34.4774],[-119.566,34.482],[-119.566,34.4824],[-119.531,34.4678],[-119.606,34.5071],[-119.567,34.4781],[-119.568,34.4779],[-119.566,34.4823],[-119.601,34.5122],[-119.581,34.4909],[-119.582,34.4909],[-119.545,34.4907],[-119.755,34.5727],[-119.611,34.4976],[-119.75,34.5734],[-119.748,34.5741],[-119.526,34.4873],[-119.569,34.4698],[-119.351,34.6038],[-119.582,34.491],[-119.567,34.4785],[-119.147,34.7232],[-119.582,34.4908],[-119.527,34.487],[-119.751,34.5734],[-119.611,34.4977],[-119.6,34.5121],[-120.051,34.747],[-119.568,34.4797],[-119.535,34.4883],[-119.581,34.4907],[-119.567,34.4706],[-119.567,34.4786],[-120.015,34.7394],[-119.611,34.4969],[-119.536,34.488],[-119.495,34.4792],[-119.455,34.4919],[-119.6,34.512],[-119.567,34.4793],[-119.147,34.7233],[-119.567,34.4782],[-119.687,34.4907],[-119.751,34.5733],[-119.408,34.4961],[-119.568,34.479],[-119.606,34.507],[-119.498,34.4757]];
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