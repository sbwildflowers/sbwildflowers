var subSightings = [[-119.759,34.5263],[-119.758,34.5365],[-119.787,34.5497],[-119.637,34.4952],[-120.063,34.7373],[-119.761,34.566],[-119.783,34.5583],[-119.754,34.527],[-119.989,34.8042],[-119.756,34.5297],[-119.787,34.5461],[-119.754,34.5273],[-119.754,34.5274],[-119.495,34.4792],[-119.763,34.5654],[-120.056,34.7464],[-119.966,34.7534],[-119.999,34.7433],[-119.636,34.4953],[-119.986,34.801],[-119.758,34.5683],[-119.752,34.5282],[-119.773,34.5462],[-119.757,34.5312],[-120.064,34.7603],[-119.757,34.5327],[-119.774,34.546],[-119.754,34.5272],[-120.052,34.743],[-119.957,34.5402],[-119.956,34.7774],[-119.785,34.5579],[-119.787,34.5481],[-120.061,34.7427],[-119.765,34.5648],[-119.764,34.5647],[-119.757,34.5689],[-119.786,34.5515],[-119.759,34.5268],[-119.759,34.5676],[-119.758,34.5357],[-119.772,34.5592],[-119.636,34.495],[-119.76,34.5382],[-119.759,34.5264],[-120.048,34.7455],[-119.63,34.5112],[-119.598,34.4944],[-119.945,34.7721],[-119.76,34.5373],[-119.609,34.4949],[-119.757,34.5318],[-119.787,34.5496],[-120.048,34.7447],[-119.759,34.5672],[-120.002,34.7465],[-119.761,34.5661],[-119.513,34.4876],[-119.5,34.4736],[-119.214,34.4867],[-119.77,34.552],[-119.759,34.5269],[-119.499,34.4756],[-119.63,34.5111],[-119.757,34.5294],[-119.755,34.5294],[-119.757,34.5314],[-119.636,34.4954],[-119.763,34.5653],[-119.964,34.7827],[-119.513,34.4872],[-119.757,34.5688],[-119.985,34.801],[-119.765,34.5649],[-119.759,34.5279],[-119.758,34.5286],[-119.636,34.4952],[-120.057,34.7461],[-119.586,34.479],[-119.752,34.5281],[-119.495,34.4791],[-119.787,34.5477]];
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