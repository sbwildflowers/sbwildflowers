var subSightings = [[-119.689,34.4531],[-119.589,34.4552],[-119.683,34.4538],[-119.244,34.4658],[-119.743,34.4042],[-119.674,34.4558],[-119.311,34.2774],[-119.734,34.4628],[-119.592,34.4602],[-119.591,34.4536],[-119.588,34.4634],[-119.71,34.468],[-119.589,34.4644],[-119.674,34.4554],[-119.652,34.4626],[-119.674,34.4553],[-119.706,34.4701],[-119.588,34.4636],[-119.755,34.4058],[-119.587,34.4623],[-119.516,34.413],[-119.59,34.4551],[-119.735,34.4649],[-119.818,34.4236],[-119.653,34.4569],[-119.652,34.456],[-119.653,34.456],[-119.732,34.455],[-119.71,34.4679],[-119.805,34.4418],[-119.653,34.4561],[-119.734,34.4629],[-119.29,34.4785],[-119.802,34.4188],[-119.591,34.4586],[-119.811,34.4249],[-119.652,34.4556],[-119.731,34.4552],[-119.711,34.4661],[-119.653,34.4562],[-119.829,34.421],[-119.734,34.4631],[-119.591,34.4534],[-119.591,34.4535],[-119.711,34.4663]];
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