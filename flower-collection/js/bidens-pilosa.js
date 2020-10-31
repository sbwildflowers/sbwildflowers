var subSightings = [[-119.624,34.4701],[-119.651,34.4563],[-119.627,34.4714],[-119.602,34.4563],[-119.65,34.461],[-119.652,34.4624],[-119.685,34.4542],[-119.642,34.4597],[-119.662,34.4661],[-119.59,34.4552],[-119.721,34.4754],[-119.649,34.4598],[-119.64,34.4628],[-119.623,34.4585],[-119.649,34.4597],[-119.654,34.4562],[-119.735,34.4653],[-119.711,34.4656],[-119.611,34.4541],[-119.644,34.4643],[-119.661,34.4668],[-119.652,34.4627],[-119.743,34.4802],[-119.722,34.4755],[-119.603,34.4563],[-119.654,34.459],[-119.83,34.4191],[-119.591,34.454],[-119.649,34.4599],[-119.658,34.4645],[-119.652,34.4626],[-119.653,34.4559],[-119.653,34.4562],[-119.644,34.4637],[-119.644,34.4638],[-119.643,34.4613],[-119.702,34.4732],[-119.66,34.4654],[-119.71,34.4732],[-119.64,34.463],[-119.722,34.4754],[-119.639,34.4549],[-119.659,34.4659],[-119.641,34.4541],[-119.649,34.4591],[-119.743,34.4821],[-119.743,34.4801],[-119.221,34.4764],[-119.66,34.4703],[-119.67,34.4551],[-119.651,34.4559],[-119.638,34.4786],[-119.651,34.463],[-119.721,34.4753],[-119.729,34.4725],[-119.689,34.4659],[-119.623,34.4692],[-119.653,34.4561],[-119.729,34.4719],[-119.639,34.4612],[-119.677,34.4557],[-119.651,34.4631],[-119.627,34.4715],[-119.65,34.4609],[-119.64,34.4633],[-119.712,34.4655],[-119.689,34.4534],[-119.651,34.4638],[-119.653,34.456]];
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