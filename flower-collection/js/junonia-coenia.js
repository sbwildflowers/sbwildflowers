var subSightings = [[-119.634,34.5047],[-119.639,34.4618],[-119.522,34.4878],[-119.591,34.4583],[-119.592,34.4559],[-119.65,34.4775],[-119.749,34.5],[-119.614,34.4953],[-119.644,34.4649],[-119.616,34.4953],[-119.762,34.5398],[-119.761,34.5397],[-119.758,34.5347],[-119.532,34.4881],[-119.63,34.5108],[-119.77,34.5474],[-119.801,34.5135],[-119.634,34.5048],[-119.594,34.4915],[-119.786,34.5531],[-119.762,34.5409],[-119.757,34.5317],[-119.659,34.4651],[-119.595,34.4577],[-119.773,34.5461],[-119.651,34.4651],[-119.8,34.4202],[-119.642,34.47],[-119.76,34.5216],[-119.644,34.4643],[-119.516,34.4893],[-119.784,34.552],[-119.636,34.5018],[-119.643,34.4594],[-119.591,34.4541],[-119.596,34.4703],[-119.762,34.5399],[-119.597,34.4573],[-119.509,34.4868],[-119.753,34.5723],[-119.765,34.5406],[-119.592,34.4551],[-119.758,34.5334],[-119.639,34.4614],[-119.991,34.7977],[-119.763,34.5413],[-119.762,34.5406],[-119.609,34.5039],[-119.616,34.4952]];
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