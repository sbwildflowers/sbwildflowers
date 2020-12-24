var subSightings = [[-119.748,34.4869],[-119.748,34.4864],[-119.649,34.4602],[-119.689,34.4641],[-119.688,34.4689],[-119.732,34.4282],[-119.702,34.4726],[-119.663,34.4656],[-119.663,34.4655],[-119.721,34.4744],[-119.687,34.468],[-119.689,34.4759],[-119.743,34.4807],[-119.717,34.4735],[-119.61,34.451],[-119.691,34.4602],[-119.644,34.4629],[-119.609,34.4549],[-119.746,34.4915],[-119.651,34.461],[-119.746,34.4955],[-119.749,34.4871],[-119.651,34.4557],[-119.724,34.4757],[-119.707,34.4707],[-119.724,34.4762],[-119.746,34.4856],[-120.218,34.4961],[-119.65,34.4567],[-119.725,34.4756],[-119.746,34.4957],[-119.644,34.463],[-119.735,34.4489],[-119.692,34.4585],[-119.708,34.4731],[-119.724,34.476],[-119.652,34.456],[-119.747,34.4916],[-119.743,34.4808],[-119.644,34.4628],[-119.746,34.4855],[-119.744,34.4838],[-119.665,34.4656],[-119.651,34.4631],[-119.707,34.4734],[-119.65,34.4566],[-119.652,34.4561],[-119.224,34.473],[-119.733,34.4284],[-119.721,34.4745],[-119.641,34.463],[-119.731,34.4292],[-119.749,34.487]];
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