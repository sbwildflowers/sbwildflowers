var subSightings = [[-119.218,34.4811],[-119.644,34.4644],[-119.787,34.4211],[-119.697,34.5134],[-119.649,34.463],[-119.612,34.4555],[-119.608,34.454],[-119.757,34.5123],[-119.636,34.4975],[-119.794,34.4185],[-119.635,34.5111],[-119.612,34.4552],[-119.606,34.4538],[-119.609,34.4549],[-120.074,34.513],[-119.638,34.4971],[-119.743,34.478],[-119.637,34.497],[-119.644,34.4645],[-119.608,34.4764],[-119.643,34.4613],[-119.638,34.497],[-119.244,34.4679],[-119.644,34.4642],[-119.647,34.4605],[-119.719,34.4742],[-119.664,34.4655],[-120.237,34.494],[-119.591,34.4658],[-119.645,34.4643],[-119.634,34.5043],[-119.757,34.5176],[-119.612,34.4553],[-119.715,34.4724],[-119.649,34.4584],[-119.587,34.4811],[-119.688,34.4648],[-119.587,34.481],[-119.762,34.5383],[-119.565,34.4873],[-119.639,34.4976],[-119.714,34.4721],[-119.612,34.4554],[-119.648,34.5178],[-119.643,34.4614],[-119.645,34.4645]];
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