var subSightings = [[-119.77,34.5556],[-119.637,34.4876],[-119.763,34.5652],[-119.724,34.4764],[-119.634,34.5042],[-119.748,34.6148],[-119.787,34.5493],[-119.723,34.4755],[-119.771,34.5577],[-119.618,34.4946],[-119.735,34.4487],[-119.77,34.5451],[-119.756,34.5728],[-119.722,34.4755],[-119.584,34.4914],[-119.618,34.4945],[-119.754,34.5726],[-119.587,34.4782],[-120.065,34.7369],[-119.644,34.4611],[-119.722,34.4754],[-119.633,34.5065],[-120.06,34.7439],[-119.634,34.504],[-119.724,34.476],[-119.585,34.4917],[-119.772,34.5589],[-119.787,34.5498],[-119.721,34.4753],[-119.769,34.5525],[-120.053,34.7438],[-119.578,34.4891],[-119.729,34.4725],[-119.587,34.4781],[-119.816,34.5411],[-119.723,34.4756],[-119.713,34.4385],[-119.689,34.4659],[-119.784,34.4327],[-119.773,34.546],[-119.763,34.5651],[-119.763,34.565],[-119.688,34.4756],[-119.686,34.5147]];
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