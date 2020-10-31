var subSightings = [[-119.752,34.601],[-119.747,34.4904],[-119.733,34.4534],[-119.587,34.4693],[-119.751,34.6086],[-119.729,34.4606],[-119.965,34.7332],[-119.735,34.449],[-119.73,34.4606],[-119.638,34.4962],[-119.586,34.4699],[-119.746,34.6134],[-119.729,34.4607],[-119.75,34.6028],[-119.747,34.4903],[-119.729,34.4609],[-119.654,34.4568],[-119.654,34.4581],[-119.747,34.4909],[-119.654,34.4571],[-119.611,34.4552],[-119.611,34.4551],[-119.732,34.4537],[-119.637,34.4963],[-119.728,34.4606],[-119.587,34.4694],[-119.734,34.4486],[-119.587,34.4696],[-119.735,34.4487],[-119.729,34.4612],[-119.581,34.4809],[-119.654,34.458],[-119.653,34.4569],[-119.741,34.4046],[-119.73,34.4608],[-119.753,34.6002],[-119.728,34.4605],[-119.729,34.4608],[-119.588,34.4806],[-119.638,34.497],[-119.638,34.4969],[-119.612,34.4531],[-119.612,34.4532],[-119.587,34.4698],[-119.586,34.4698],[-119.637,34.4964],[-119.747,34.4905],[-119.611,34.4549],[-119.73,34.4607],[-119.747,34.6131],[-119.638,34.4967],[-119.734,34.4535],[-119.735,34.4489]];
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