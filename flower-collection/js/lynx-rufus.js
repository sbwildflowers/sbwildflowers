var subSightings = [[-119.635,34.5023],[-119.773,34.546],[-119.664,34.5233],[-119.767,34.5647],[-119.758,34.5375],[-119.636,34.4882],[-119.645,34.516],[-119.581,34.5125],[-119.632,34.5082],[-119.634,34.5049],[-119.638,34.4863],[-119.595,34.4922],[-119.645,34.4875],[-119.639,34.4742],[-119.77,34.5466],[-119.734,34.57],[-119.719,34.586],[-119.636,34.488],[-119.633,34.5053],[-119.632,34.5079],[-119.743,34.4821],[-119.631,34.508],[-119.63,34.5114],[-119.644,34.5146],[-119.752,34.5044],[-119.571,34.5042],[-119.639,34.4833],[-119.7,34.4848],[-119.63,34.5109],[-119.611,34.4979],[-119.771,34.5504],[-120.239,34.486],[-119.757,34.5336],[-119.611,34.4994],[-119.948,34.7657],[-119.636,34.5016],[-119.592,34.4891],[-119.637,34.5101],[-119.757,34.5105],[-120.24,34.4841],[-120.206,34.4946],[-119.485,34.4872],[-119.762,34.63],[-119.679,34.4725],[-120.222,34.501],[-119.566,34.5326],[-119.734,34.6088],[-119.873,34.5077],[-119.636,34.4891],[-119.676,34.5226],[-119.752,34.5039],[-119.593,34.4911],[-119.678,34.5502],[-119.777,34.5582],[-119.884,34.5124],[-119.717,34.565],[-119.599,34.4942],[-119.693,34.5066],[-119.641,34.473],[-119.961,34.7592],[-120.003,34.7476],[-119.621,34.5365],[-119.637,34.5102],[-119.634,34.5052],[-119.961,34.812],[-119.758,34.5187],[-119.636,34.4943],[-119.602,34.4563],[-119.72,34.5634],[-119.588,34.4843],[-119.77,34.5625],[-119.751,34.5022],[-119.63,34.4953],[-119.73,34.5218],[-119.761,34.5661],[-119.746,34.4952],[-119.658,34.5235],[-119.734,34.5993],[-119.616,34.4951],[-119.638,34.4865],[-119.699,34.4985],[-120.237,34.4924],[-119.663,34.4659],[-119.751,34.5038],[-119.507,34.4519],[-120.002,34.7454],[-119.595,34.4923],[-120.24,34.4847],[-119.672,34.5462],[-119.636,34.5402],[-119.751,34.5039],[-119.945,34.7546],[-119.633,34.5364],[-119.759,34.5671],[-119.635,34.5009],[-119.912,34.5209],[-119.729,34.5703],[-119.636,34.495],[-119.777,34.5585],[-119.588,34.485],[-119.698,34.4783],[-119.783,34.5501],[-119.774,34.5572],[-119.751,34.5027],[-119.648,34.518],[-119.748,34.4894],[-119.743,34.4822],[-119.751,34.5607],[-119.749,34.4882],[-119.713,34.5662],[-119.635,34.5008],[-119.633,34.5059],[-119.748,34.5632],[-119.6,34.4935],[-119.763,34.5399],[-119.991,34.8191],[-119.778,34.5512],[-119.758,34.5352],[-120.234,34.4967],[-119.601,34.4937],[-119.751,34.5018],[-119.593,34.491]];
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