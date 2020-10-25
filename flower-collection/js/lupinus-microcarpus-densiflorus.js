var subSightings = [[-119.756,34.5722],[-119.778,34.5512],[-119.756,34.5717],[-119.64,34.5135],[-119.754,34.5768],[-119.756,34.5729],[-119.757,34.5701],[-119.778,34.5513],[-119.769,34.5515],[-119.72,34.5211],[-119.754,34.5755],[-119.769,34.553],[-119.755,34.5728],[-119.756,34.5716],[-119.771,34.5567],[-119.769,34.5536],[-119.785,34.5524],[-119.757,34.5702],[-119.774,34.5461],[-119.756,34.5726],[-119.756,34.5728],[-119.72,34.52],[-119.18,34.726],[-119.755,34.576],[-119.755,34.5758],[-119.755,34.5727],[-119.755,34.5761],[-119.785,34.5534],[-119.754,34.5751],[-119.771,34.5579],[-119.756,34.5719],[-119.759,34.5272],[-119.749,34.5742],[-119.756,34.5736],[-119.767,34.5641],[-119.761,34.566],[-119.769,34.5632],[-119.748,34.5735],[-119.754,34.575],[-119.785,34.5523],[-119.185,34.7266],[-119.769,34.5514],[-119.757,34.5709],[-119.739,34.5223],[-119.757,34.5707],[-119.756,34.5733],[-119.372,34.616],[-119.769,34.5527],[-119.768,34.564],[-119.769,34.5516],[-119.755,34.5756],[-119.754,34.5756],[-120.235,34.4961],[-119.756,34.5738],[-119.61,34.4954],[-119.755,34.5729],[-119.754,34.5774],[-119.774,34.5457],[-119.769,34.5528],[-119.787,34.5542],[-119.154,34.727],[-119.756,34.5723],[-119.757,34.5708],[-119.769,34.5509],[-119.77,34.5513],[-120.224,34.5032],[-119.769,34.5535],[-119.372,34.6162],[-119.759,34.5279],[-119.786,34.5534],[-119.756,34.5721],[-119.751,34.5735],[-119.755,34.577],[-119.757,34.5716],[-119.321,34.5965],[-120.234,34.4963],[-119.786,34.5535],[-119.757,34.5714],[-119.786,34.5536],[-119.779,34.5508],[-119.755,34.5738],[-119.771,34.5578],[-119.321,34.5964],[-119.786,34.5545],[-119.756,34.5735],[-119.757,34.5713]];
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