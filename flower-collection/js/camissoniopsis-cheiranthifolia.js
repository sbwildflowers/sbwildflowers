var subSightings = [[-119.882,34.4126],[-119.879,34.4079],[-119.849,34.4082],[-119.879,34.4082],[-119.883,34.4123],[-119.883,34.4121],[-119.879,34.4083],[-119.85,34.4077],[-119.847,34.4063],[-119.844,34.406],[-119.883,34.4124],[-119.849,34.4081],[-119.848,34.4065],[-119.848,34.4066],[-119.018,34.0725],[-119.019,34.0728],[-119.019,34.0752],[-119.88,34.4079],[-119.02,34.0743],[-119.685,34.414],[-119.883,34.412],[-119.663,34.418],[-119.848,34.4064],[-119.8,34.4186],[-119.8,34.4184],[-119.847,34.4062],[-119.879,34.408],[-119.882,34.4124],[-119.847,34.4064],[-119.883,34.4122],[-119.8,34.4185],[-119.311,34.2762],[-119.026,34.0778],[-119.882,34.4125],[-119.847,34.4061]];
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