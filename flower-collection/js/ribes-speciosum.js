var subSightings = [[-119.758,34.5341],[-119.66,34.4652],[-119.796,34.5122],[-119.758,34.5361],[-119.992,34.8204],[-120.238,34.489],[-119.653,34.4569],[-119.746,34.5552],[-119.73,34.4608],[-119.653,34.4565],[-119.758,34.5683],[-119.746,34.5917],[-119.663,34.4656],[-119.734,34.4509],[-119.641,34.4628],[-119.729,34.4607],[-119.686,34.4759],[-119.712,34.4729],[-119.662,34.4671],[-119.734,34.4506],[-119.729,34.4605],[-119.623,34.4689],[-119.588,34.4776],[-120.864,35.3807],[-119.734,34.451],[-119.729,34.4608],[-119.734,34.4508],[-119.291,34.4787],[-119.729,34.4606],[-119.663,34.4672],[-119.747,34.4969],[-119.632,34.4589],[-119.734,34.4512],[-119.75,34.5011],[-119.75,34.5005],[-119.758,34.5362],[-119.653,34.4566],[-119.734,34.4502],[-119.751,34.5022],[-119.734,34.4511],[-119.734,34.4507],[-119.593,34.4721],[-119.662,34.4661],[-119.746,34.5923],[-119.65,34.4607],[-119.751,34.5028],[-119.75,34.5016],[-119.649,34.4602],[-119.729,34.4613],[-119.75,34.5012],[-120.049,34.7461],[-119.609,34.4552],[-119.592,34.4706],[-119.728,34.4595],[-119.758,34.5681],[-119.751,34.502],[-119.731,34.4645],[-119.649,34.4604],[-119.287,34.4779],[-120.046,34.5357],[-119.768,34.5637],[-119.686,34.4658],[-119.712,34.4728],[-120.049,34.7463],[-119.61,34.4552],[-119.663,34.4673],[-119.627,34.4717],[-119.73,34.4607],[-119.75,34.5015],[-119.735,34.4497],[-119.582,34.4577],[-119.136,34.4536],[-119.751,34.5282],[-120.048,34.7444],[-119.751,34.5021],[-119.755,34.527]];
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