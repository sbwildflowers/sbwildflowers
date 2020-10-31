var subSightings = [[-119.565,34.5389],[-119.786,34.4267],[-119.728,34.4566],[-119.765,34.6325],[-119.786,34.5537],[-119.697,34.4782],[-119.057,34.0957],[-119.589,34.4756],[-119.136,34.4529],[-119.589,34.4775],[-119.729,34.4559],[-119.77,34.5475],[-119.761,34.4621],[-119.03,34.0951],[-119.589,34.4773],[-119.592,34.4706],[-120.04,34.5335],[-119.754,34.5725],[-119.31,34.2771],[-119.769,34.5474],[-119.771,34.5486],[-119.639,34.486],[-119.639,34.4853],[-119.246,34.4628],[-119.707,34.4711],[-119.697,34.4783],[-119.224,34.4694],[-119.77,34.5476],[-119.588,34.4775],[-119.588,34.478],[-119.588,34.4776],[-119.77,34.5468],[-119.729,34.4554],[-119.38,34.5069],[-119.793,34.4184],[-119.653,34.4563],[-119.588,34.4774],[-119.282,34.4766],[-119.27,34.4748],[-119.007,34.1161],[-119.697,34.4781],[-119.729,34.4567],[-119.77,34.548],[-119.728,34.4567],[-119.275,34.4707],[-119.729,34.4557],[-119.639,34.484],[-119.588,34.4779],[-119.815,34.5434],[-119.85,34.4423],[-119.272,34.4749],[-119.729,34.4558],[-119.769,34.5544]];
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