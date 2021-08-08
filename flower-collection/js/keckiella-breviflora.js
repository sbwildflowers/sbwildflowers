var subSightings = [[-119.631,34.5201],[-119.731,34.4289],[-119.63,34.5113],[-119.732,34.6105],[-119.754,34.5995],[-119.75,34.6077],[-119.439,34.4916],[-119.753,34.6008],[-119.75,34.6078],[-119.631,34.5104],[-119.63,34.5121],[-119.75,34.6074],[-119.754,34.5999],[-119.75,34.6064],[-119.754,34.5996],[-119.63,34.5114],[-119.754,34.5997],[-119.63,34.5115],[-119.749,34.6124],[-119.75,34.6066],[-119.631,34.52],[-119.631,34.5199],[-119.631,34.5105],[-119.75,34.6075],[-119.753,34.6007],[-119.75,34.6067],[-119.259,34.5751],[-119.982,34.7976],[-119.753,34.6004],[-119.749,34.6122],[-119.465,34.4752],[-119.259,34.5749],[-119.439,34.4915],[-119.753,34.6003],[-119.63,34.5107],[-119.75,34.6076],[-119.754,34.5998],[-119.186,34.7269],[-119.631,34.5107],[-119.631,34.5106],[-119.753,34.6006],[-119.631,34.5142]];
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