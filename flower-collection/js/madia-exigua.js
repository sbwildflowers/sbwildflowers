var subSightings = [[-119.644,34.5147],[-119.644,34.5146],[-119.602,34.4938],[-119.644,34.5144],[-119.601,34.4936],[-119.601,34.4937],[-119.652,34.5195],[-119.648,34.5181],[-119.6,34.4936],[-119.652,34.5194],[-119.645,34.5148],[-119.652,34.5196],[-119.635,34.5109],[-119.603,34.4934],[-119.651,34.5198],[-119.64,34.5132],[-119.6,34.4935],[-119.651,34.52],[-119.643,34.5138],[-119.759,34.5268],[-119.645,34.5149],[-119.644,34.5148],[-119.645,34.5146],[-119.759,34.527],[-119.64,34.513],[-119.603,34.4933],[-119.644,34.5145],[-119.602,34.4937],[-119.638,34.5101],[-119.645,34.5158],[-119.638,34.5098],[-119.643,34.5139],[-119.705,34.4717],[-119.64,34.5131],[-119.698,34.5124],[-119.648,34.5182],[-119.759,34.5269],[-119.651,34.5199],[-119.746,34.523],[-119.645,34.5147],[-119.643,34.514],[-119.638,34.5099],[-119.722,34.4756],[-119.603,34.4932],[-119.638,34.51],[-119.656,34.5249],[-119.645,34.5145]];
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