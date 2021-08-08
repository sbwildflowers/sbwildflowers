var subSightings = [[-119.638,34.4786],[-119.689,34.4737],[-119.638,34.4782],[-119.638,34.4781],[-119.637,34.4781],[-119.706,34.4713],[-119.72,34.4743],[-119.627,34.4955],[-119.786,34.555],[-119.759,34.5677],[-119.542,34.4865],[-119.643,34.4616],[-119.78,34.5587],[-119.638,34.4788],[-119.644,34.4629],[-119.569,34.4705],[-119.643,34.4613],[-119.71,34.4728],[-119.638,34.4971],[-119.644,34.4638],[-119.649,34.4612],[-119.592,34.4897],[-119.637,34.4972],[-119.761,34.5663],[-119.772,34.5591],[-119.638,34.4763],[-119.65,34.461],[-119.648,34.461],[-119.644,34.4649],[-119.629,34.4765],[-119.643,34.4615],[-119.637,34.4971],[-119.643,34.4651],[-119.694,34.4781],[-119.643,34.4614],[-119.703,34.4743],[-119.663,34.4661],[-119.965,34.7545],[-119.641,34.4538],[-119.714,34.4723],[-119.74,34.4752],[-119.753,34.5726],[-119.644,34.4639],[-119.645,34.4639],[-119.609,34.4549],[-119.644,34.4641],[-119.645,34.4647],[-119.72,34.4746],[-119.714,34.4725],[-119.713,34.473],[-119.649,34.4587],[-119.637,34.4782],[-119.649,34.4673],[-119.644,34.4648],[-119.7,34.478],[-119.637,34.4771],[-119.644,34.4633],[-119.743,34.4823],[-119.635,34.4916],[-119.74,34.4753],[-119.69,34.4768],[-119.689,34.4762],[-119.607,34.4754],[-119.635,34.4974],[-119.645,34.4646],[-119.646,34.4608],[-119.625,34.4722],[-119.752,34.5732],[-119.611,34.4515],[-119.696,34.4784],[-119.691,34.4594],[-119.706,34.4709],[-119.612,34.4552]];
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