var subSightings = [[-119.513,34.417],[-119.588,34.485],[-119.753,34.5098],[-119.808,34.4437],[-119.705,34.4722],[-119.638,34.4974],[-119.633,34.5063],[-119.722,34.5011],[-119.809,34.4437],[-119.637,34.4971],[-119.712,34.4578],[-119.512,34.419],[-119.638,34.4975],[-119.809,34.4341],[-119.729,34.4572],[-119.728,34.4572],[-119.513,34.4183],[-119.638,34.4973],[-119.588,34.4852],[-119.606,34.507],[-119.591,34.4885],[-119.729,34.4543],[-119.754,34.5098],[-119.672,34.5022],[-119.638,34.4971],[-119.687,34.5011],[-119.513,34.4178],[-119.729,34.4574],[-119.809,34.4438],[-119.729,34.457],[-119.728,34.4576],[-119.628,34.5268],[-120.232,34.4974],[-119.728,34.4573],[-119.77,34.5609],[-119.622,34.4519],[-119.692,34.502],[-119.809,34.4436],[-119.746,34.4324],[-119.731,34.4553],[-119.606,34.5069],[-119.732,34.4534],[-119.754,34.5099],[-119.605,34.4787],[-119.622,34.452],[-119.511,34.4194],[-119.605,34.507],[-119.729,34.4571],[-119.688,34.503],[-119.808,34.4436],[-119.81,34.4434],[-119.513,34.4171],[-119.729,34.4573],[-119.638,34.4972],[-119.512,34.4193]];
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