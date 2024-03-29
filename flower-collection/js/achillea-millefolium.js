var subSightings = [[-119.651,34.4559],[-119.636,34.4554],[-119.653,34.461],[-119.639,34.4541],[-119.638,34.4541],[-119.639,34.4547],[-120.048,34.7458],[-119.991,34.8197],[-119.692,34.4601],[-119.99,34.8217],[-119.969,34.751],[-119.653,34.4608],[-119.688,34.4677],[-119.611,34.4518],[-119.999,34.8149],[-119.692,34.4599],[-119.688,34.467],[-119.688,34.4674],[-119.653,34.4609],[-120.227,34.4975],[-119.651,34.456],[-119.288,34.4783],[-120.05,34.7468],[-119.99,34.8224],[-119.611,34.4514],[-119.11,34.8122],[-119.611,34.4517],[-119.988,34.8042],[-119.097,34.8153],[-119.982,34.7968],[-119.688,34.4676],[-119.653,34.4607],[-119.69,34.4633],[-119.991,34.8196],[-119.638,34.454],[-119.251,34.4708],[-119.617,34.4483],[-119.286,34.4778],[-119.637,34.4539],[-119.627,34.4516],[-120.226,34.4973],[-119.285,34.4773],[-119.69,34.4635],[-119.99,34.8234],[-119.284,34.4772],[-119.69,34.4594],[-119.651,34.4561],[-119.691,34.4615],[-119.69,34.4595],[-119.993,34.8206],[-119.651,34.4562],[-119.99,34.804],[-120.056,34.7428],[-119.635,34.4568],[-119.902,34.7598],[-118.999,34.1195],[-119.629,34.4545],[-119.272,34.474],[-119.287,34.4783],[-119.266,34.476],[-119.974,34.7487],[-119.991,34.8213]];
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