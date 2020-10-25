var subSightings = [[-119.845,34.4066],[-119.827,34.4212],[-119.315,34.2789],[-119.527,34.3979],[-119.826,34.4215],[-119.85,34.4082],[-119.662,34.4196],[-119.528,34.3988],[-119.826,34.422],[-119.528,34.4003],[-119.826,34.4218],[-119.831,34.4183],[-119.314,34.278],[-119.851,34.4108],[-119.831,34.4181],[-119.826,34.4217],[-119.845,34.4065],[-119.312,34.2787],[-119.313,34.2774],[-119.85,34.408],[-119.662,34.4198],[-119.662,34.4195],[-119.85,34.4081],[-119.85,34.4114],[-119.848,34.4102],[-119.827,34.4229],[-119.312,34.278],[-119.844,34.4063],[-119.83,34.4188],[-119.844,34.4064],[-119.851,34.4104],[-119.662,34.4197],[-119.831,34.4186],[-119.848,34.4109],[-119.847,34.4091],[-119.83,34.4186],[-119.844,34.4082],[-119.663,34.4197],[-119.844,34.4062],[-119.829,34.4209],[-119.844,34.4083]];
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