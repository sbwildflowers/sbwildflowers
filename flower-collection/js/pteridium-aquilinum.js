var subSightings = [[-119.622,34.4528],[-119.591,34.4641],[-119.732,34.467],[-119.612,34.4542],[-119.728,34.4615],[-119.729,34.4724],[-119.611,34.4521],[-119.729,34.4725],[-119.653,34.4571],[-119.592,34.4597],[-119.966,34.7532],[-119.623,34.4647],[-119.759,34.5245],[-119.733,34.467],[-119.622,34.4539],[-119.639,34.4573],[-119.622,34.4534],[-119.64,34.4547],[-119.591,34.4637],[-119.612,34.4539],[-119.622,34.4538],[-119.955,34.5439],[-119.591,34.453],[-119.759,34.5242],[-119.611,34.4522],[-119.623,34.4654],[-119.955,34.5437],[-119.732,34.4671],[-119.71,34.4955],[-119.654,34.4579],[-119.623,34.4653],[-119.639,34.4567],[-119.624,34.4613],[-119.612,34.454],[-119.591,34.4532],[-119.612,34.453],[-119.624,34.4643],[-119.591,34.4534],[-119.639,34.4557],[-119.611,34.4539],[-119.728,34.4614],[-119.639,34.458],[-119.622,34.4527],[-119.729,34.4726],[-119.71,34.4953],[-119.612,34.4529],[-119.639,34.4576],[-119.622,34.4526],[-119.639,34.4581],[-119.639,34.4584],[-119.654,34.4588],[-119.639,34.4611],[-119.639,34.457],[-119.639,34.4555],[-119.71,34.4954],[-119.622,34.4536],[-119.591,34.4636],[-119.644,34.4754],[-119.639,34.4566],[-119.612,34.4537]];
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