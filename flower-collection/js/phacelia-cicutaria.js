var subSightings = [[-119.762,34.5664],[-119.758,34.6019],[-119.883,34.4123],[-119.768,34.5429],[-119.75,34.5978],[-119.769,34.5435],[-119.755,34.5989],[-119.765,34.542],[-119.496,34.4835],[-119.769,34.5541],[-119.135,34.4506],[-119.774,34.5463],[-119.962,34.8125],[-119.757,34.601],[-119.253,34.4724],[-119.767,34.5422],[-119.801,34.4189],[-119.77,34.5437],[-119.77,34.547],[-119.772,34.5457],[-119.774,34.5464],[-119.75,34.598],[-119.768,34.5432],[-119.761,34.5404],[-119.785,34.5479],[-119.771,34.5438],[-119.77,34.5468],[-119.8,34.4186],[-119.751,34.5977],[-119.769,34.5504],[-119.748,34.6128],[-119.752,34.5817],[-119.761,34.5396],[-119.953,34.8091],[-119.77,34.5438],[-119.847,34.4067],[-119.761,34.5395],[-119.752,34.6007],[-119.77,34.5436],[-119.291,34.4788],[-119.752,34.601],[-119.383,34.511],[-119.77,34.548],[-119.753,34.5988],[-119.744,34.5859],[-119.8,34.4184],[-119.766,34.5418],[-119.744,34.5903],[-119.77,34.5435],[-119.771,34.548],[-119.768,34.5431],[-119.285,34.4776],[-119.768,34.5428],[-119.753,34.5989],[-119.764,34.5416],[-119.774,34.5466],[-119.754,34.5991],[-119.764,34.5415],[-119.765,34.5416],[-119.765,34.5417],[-119.765,34.5418],[-119.767,34.5423],[-119.755,34.5993],[-119.134,34.4486],[-119.801,34.4188],[-119.746,34.6128],[-119.757,34.6014],[-119.77,34.5475],[-119.755,34.5992],[-119.771,34.5439],[-119.385,34.5089],[-119.8,34.4185],[-119.769,34.5432],[-119.766,34.5419],[-119.77,34.5439],[-119.769,34.5474],[-119.766,34.542]];
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