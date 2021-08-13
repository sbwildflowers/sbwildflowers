var subSightings = [[-119.846,34.4062],[-119.642,34.4532],[-119.721,34.4285],[-119.31,34.2765],[-119.755,34.5731],[-119.643,34.4522],[-119.844,34.4064],[-119.691,34.4603],[-119.749,34.4877],[-119.786,34.5552],[-119.626,34.4955],[-119.744,34.5236],[-119.591,34.4555],[-119.627,34.4955],[-119.692,34.459],[-119.643,34.4524],[-119.626,34.4954],[-119.639,34.4582],[-119.719,34.4741],[-119.882,34.4129],[-119.649,34.463],[-119.717,34.4734],[-119.72,34.4283],[-119.8,34.4189],[-119.749,34.4876],[-119.759,34.5278],[-119.74,34.4743],[-119.64,34.4601],[-119.639,34.4612],[-119.825,34.4221],[-119.638,34.4972],[-119.639,34.4569],[-119.644,34.4512],[-119.735,34.4645],[-119.761,34.5662],[-119.745,34.4845],[-119.61,34.4551],[-119.713,34.4721],[-119.755,34.5729],[-119.012,34.0898],[-119.591,34.4532],[-119.617,34.4496],[-119.845,34.4063],[-119.749,34.5738],[-119.826,34.4215],[-119.786,34.5508],[-119.607,34.4539],[-119.756,34.5738],[-119.759,34.5266],[-119.729,34.4562],[-119.628,34.4576],[-119.616,34.456],[-119.642,34.453],[-119.787,34.5503],[-119.718,34.4738],[-119.639,34.4572],[-119.713,34.4723],[-119.272,34.4741],[-119.659,34.4695],[-119.136,34.4529],[-119.749,34.4873],[-119.644,34.464],[-119.591,34.4579],[-119.609,34.4953],[-119.744,34.4838],[-119.762,34.5657],[-119.773,34.5581],[-119.29,34.4782],[-119.621,34.5362],[-119.729,34.456],[-119.593,34.4721],[-119.757,34.5695],[-119.847,34.4061]];
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