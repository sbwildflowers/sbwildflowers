var subSightings = [[-119.956,34.5295],[-119.719,34.4995],[-119.955,34.5286],[-119.956,34.5291],[-119.713,34.4949],[-119.721,34.5008],[-119.723,34.5015],[-119.955,34.5288],[-119.722,34.5011],[-119.954,34.5286],[-119.636,34.4911],[-119.497,34.4758],[-119.956,34.5289],[-119.956,34.5288],[-119.713,34.4947],[-119.955,34.5289],[-119.956,34.5292],[-119.711,34.4949],[-119.636,34.4912],[-119.754,34.5098],[-119.953,34.5277],[-119.693,34.4991],[-119.954,34.5282],[-119.753,34.5104],[-119.708,34.4953],[-119.753,34.5095],[-119.954,34.5284],[-119.694,34.4988],[-119.694,34.4992],[-119.712,34.495],[-119.719,34.4994],[-119.693,34.4987],[-119.955,34.5287],[-119.708,34.4954],[-119.955,34.5285],[-119.709,34.4951],[-119.503,34.4666],[-119.754,34.5097],[-119.465,34.4753],[-119.956,34.5287],[-119.71,34.4951],[-119.714,34.4953],[-119.753,34.5096],[-119.954,34.5285],[-119.955,34.529],[-119.713,34.4948],[-119.713,34.4952],[-119.676,34.4973],[-119.719,34.5],[-119.72,34.5006],[-119.72,34.5005],[-119.955,34.5291],[-119.71,34.4953],[-119.709,34.4952],[-119.713,34.4951],[-119.497,34.4756],[-119.503,34.4669],[-119.693,34.4988],[-119.671,34.4976],[-119.71,34.4954],[-119.71,34.4952],[-119.722,34.501],[-119.711,34.4951],[-119.694,34.4989]];
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