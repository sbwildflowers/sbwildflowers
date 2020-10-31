var subSightings = [[-119.731,34.4552],[-119.291,34.4784],[-119.623,34.4496],[-119.731,34.4553],[-119.732,34.4534],[-119.729,34.4573],[-119.732,34.4544],[-119.728,34.4587],[-119.713,34.4387],[-119.633,34.423],[-119.624,34.4579],[-119.729,34.4558],[-119.786,34.4274],[-119.879,34.4078],[-119.727,34.4739],[-119.75,34.4345],[-119.728,34.4585],[-119.764,34.4362],[-119.727,34.4738],[-119.62,34.4214],[-119.765,34.4365],[-119.727,34.474],[-119.803,34.4244],[-119.729,34.4576],[-119.622,34.448],[-119.732,34.4684],[-119.291,34.4785],[-119.732,34.4685],[-120.221,34.5034],[-119.729,34.456],[-119.732,34.4547],[-119.732,34.4543],[-119.729,34.4549],[-119.73,34.4623],[-119.732,34.4533],[-119.735,34.4642],[-119.732,34.4624]];
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