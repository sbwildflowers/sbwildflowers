var subSightings = [[-119.59,34.4696],[-119.729,34.4724],[-119.653,34.4561],[-119.707,34.4728],[-119.59,34.4694],[-119.592,34.4553],[-119.592,34.4596],[-119.652,34.4625],[-119.611,34.4547],[-119.729,34.4727],[-119.659,34.4703],[-119.658,34.4665],[-119.591,34.4636],[-119.586,34.47],[-119.658,34.4651],[-119.729,34.4726],[-119.652,34.4624],[-119.59,34.4695],[-119.591,34.454],[-119.652,34.4626],[-119.623,34.4655],[-119.651,34.4637],[-119.639,34.4586],[-119.729,34.4725],[-119.592,34.4597],[-119.622,34.4518],[-119.644,34.4757],[-119.64,34.4547],[-119.611,34.4553],[-119.649,34.4692],[-119.654,34.459],[-119.618,34.4478],[-119.591,34.4541],[-119.623,34.4558],[-119.586,34.4701],[-119.624,34.4693],[-119.651,34.4638],[-119.72,34.4749],[-119.654,34.4572],[-119.611,34.4523],[-119.59,34.4693],[-119.622,34.4519],[-119.725,34.4764],[-119.654,34.4588],[-119.623,34.4579],[-119.729,34.4729],[-119.624,34.4606],[-119.64,34.4546],[-119.638,34.4635],[-119.623,34.4691],[-119.624,34.4646],[-119.64,34.4542],[-119.643,34.4524],[-119.612,34.4539],[-119.622,34.4515]];
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