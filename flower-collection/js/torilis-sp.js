var subSightings = [[-119.649,34.4604],[-119.639,34.4854],[-119.615,34.4954],[-119.633,34.5092],[-119.765,34.5647],[-119.61,34.5011],[-119.637,34.5101],[-119.76,34.523],[-119.768,34.6303],[-119.647,34.4611],[-119.747,34.4911],[-119.636,34.4954],[-119.688,34.4676],[-119.636,34.5109],[-119.745,34.4924],[-119.65,34.4634],[-119.652,34.4561],[-119.592,34.4596],[-119.652,34.4564],[-119.65,34.4622],[-119.651,34.4562],[-119.632,34.5147],[-119.289,34.4787],[-119.637,34.4972],[-119.639,34.4614],[-119.636,34.5036],[-119.425,34.4893],[-119.61,34.4551],[-119.756,34.5117],[-119.65,34.4633],[-119.726,34.4745],[-119.632,34.5072],[-119.642,34.514],[-119.636,34.4951],[-119.732,34.4658],[-119.589,34.4698],[-119.64,34.5131],[-119.653,34.4565]];
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