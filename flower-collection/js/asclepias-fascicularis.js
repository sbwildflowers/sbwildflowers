var subSightings = [[-119.75,34.5582],[-120.237,34.4928],[-119.569,34.4697],[-119.754,34.5725],[-119.754,34.5726],[-119.903,34.7598],[-119.749,34.5735],[-119.786,34.5512],[-119.753,34.6086],[-119.786,34.5594],[-119.569,34.4698],[-119.612,34.4967],[-119.46,34.4919],[-119.85,34.4423],[-119.786,34.5514],[-119.609,34.5039],[-119.869,34.4308],[-119.754,34.5727],[-119.75,34.6072],[-119.407,34.4963],[-119.786,34.5532],[-119.786,34.5515],[-119.755,34.4615],[-119.407,34.4964],[-119.568,34.4702],[-119.748,34.5723],[-119.749,34.5734],[-119.609,34.5038],[-119.786,34.5565],[-119.612,34.497],[-119.75,34.6073],[-119.785,34.5557],[-119.75,34.6074],[-119.746,34.5754],[-120.223,34.5041],[-119.012,34.0857],[-119.755,34.4602],[-119.969,34.7226],[-120.223,34.504],[-119.748,34.572],[-120.033,34.4644],[-119.729,34.4576],[-119.592,34.4916],[-119.786,34.5547],[-119.785,34.556],[-119.797,34.463],[-119.769,34.5527],[-119.132,34.7161]];
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