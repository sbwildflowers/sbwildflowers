var subSightings = [[-119.67,34.4545],[-119.736,34.4677],[-119.644,34.4631],[-119.748,34.6145],[-119.574,34.4762],[-119.785,34.5567],[-119.688,34.4757],[-119.661,34.454],[-119.67,34.4542],[-119.644,34.4632],[-119.628,34.5233],[-119.63,34.5218],[-120.235,34.4818],[-120.071,34.5123],[-119.637,34.4979],[-119.721,34.4753],[-119.641,34.4628],[-119.751,34.6084],[-119.256,34.4714],[-119.644,34.4641],[-119.63,34.458],[-119.629,34.5228],[-119.785,34.5569],[-119.873,34.7726],[-119.244,34.5364],[-119.615,34.4555],[-119.736,34.4676],[-119.246,34.4685],[-119.959,34.7589],[-119.593,34.4707],[-119.644,34.464],[-119.644,34.4633],[-119.574,34.477],[-119.234,34.4661],[-119.75,34.5838],[-119.243,34.471],[-119.722,34.4754],[-119.67,34.4541],[-119.242,34.467],[-119.785,34.5564],[-119.244,34.466],[-119.757,34.5697],[-119.239,34.4689],[-119.241,34.5414],[-119.787,34.5464],[-119.755,34.5742],[-119.68,34.4566],[-119.602,34.4736],[-119.613,34.4557],[-119.645,34.4643],[-119.756,34.5745],[-119.786,34.5555],[-119.644,34.4639],[-119.67,34.4543],[-119.785,34.5574],[-119.236,34.4656],[-119.75,34.6174],[-119.495,34.4808],[-119.754,34.575],[-119.757,34.5689],[-119.637,34.4981],[-119.786,34.5546],[-119.644,34.4643],[-119.75,34.6175],[-119.629,34.5293],[-119.722,34.4755],[-119.495,34.4805],[-119.639,34.4608],[-119.75,34.5837],[-119.628,34.4541],[-119.644,34.4637],[-119.732,34.5694],[-119.746,34.6136],[-119.632,34.5079],[-119.748,34.6146],[-119.974,34.7584],[-119.244,34.4661],[-119.575,34.476],[-119.28,34.5185],[-119.015,34.1096],[-119.785,34.5573],[-119.769,34.5638],[-119.661,34.4539],[-119.615,34.4556],[-119.757,34.569],[-119.244,34.4712],[-119.637,34.4978],[-119.756,34.5742],[-119.786,34.5533],[-119.661,34.4538],[-119.235,34.4655],[-119.632,34.508],[-119.785,34.5565],[-119.644,34.4638],[-119.495,34.4807],[-119.959,34.7588],[-119.239,34.4692],[-119.644,34.4644],[-119.604,34.4742],[-120.238,34.4828],[-119.608,34.4765],[-119.757,34.5696],[-119.637,34.498],[-119.031,34.1048],[-119.601,34.472],[-119.623,34.4687],[-119.767,34.5651],[-119.755,34.5749],[-120.026,34.7674],[-119.743,34.4782]];
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