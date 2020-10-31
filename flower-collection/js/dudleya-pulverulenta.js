var subSightings = [[-119.585,34.4915],[-119.584,34.4914],[-119.495,34.4808],[-119.569,34.4811],[-119.569,34.4809],[-119.585,34.4537],[-119.79,34.5437],[-119.999,34.8182],[-119.883,34.736],[-119.496,34.4813],[-119.569,34.4815],[-119.568,34.4809],[-119.592,34.4725],[-119.999,34.8186],[-119.962,34.7814],[-119.568,34.4811],[-119.584,34.4915],[-119.584,34.4538],[-119.585,34.4912],[-119.624,34.4693],[-119.962,34.7815],[-119.757,34.561],[-119.29,34.4784],[-119.591,34.4726],[-119.223,34.4899],[-119.585,34.4916],[-119.568,34.4808],[-119.585,34.4914],[-119.496,34.4814],[-119.588,34.4634],[-119.623,34.4693],[-119.291,34.4785],[-119.623,34.4691],[-119.624,34.4694],[-120.006,34.8097],[-119.587,34.4616],[-119.623,34.4694],[-119.568,34.4812],[-119.623,34.4695],[-119.569,34.4816],[-119.999,34.8227],[-119.87,34.7374],[-119.592,34.4726]];
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