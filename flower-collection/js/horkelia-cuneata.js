var subSightings = [[-119.75,34.5217],[-119.75,34.5218],[-119.75,34.5206],[-119.749,34.5195],[-119.75,34.5212],[-119.751,34.519],[-119.755,34.52],[-119.75,34.5216],[-119.758,34.5372],[-119.75,34.5204],[-120.209,34.4899],[-119.75,34.5196],[-119.75,34.5186],[-119.75,34.521],[-119.75,34.5209],[-119.814,34.5254],[-119.75,34.5215],[-119.749,34.5196],[-119.752,34.5158],[-119.818,34.5291],[-119.624,34.4624],[-119.75,34.5187],[-119.75,34.5214],[-119.758,34.5374],[-119.758,34.5373],[-119.751,34.5203],[-119.69,34.4634],[-119.75,34.5205],[-119.75,34.5189],[-119.751,34.5187],[-119.69,34.4635],[-120.236,34.5052],[-119.75,34.5211],[-119.752,34.525],[-119.75,34.5208],[-119.751,34.5188],[-119.751,34.5201],[-119.751,34.5202],[-119.69,34.4631],[-119.751,34.52],[-119.754,34.5213],[-119.755,34.5194],[-119.75,34.5195]];
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