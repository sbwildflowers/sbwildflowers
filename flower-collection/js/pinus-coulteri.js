var subSightings = [[-119.706,34.4944],[-119.801,34.5143],[-119.735,34.6073],[-119.714,34.4953],[-119.996,34.7393],[-119.691,34.4878],[-120.021,34.784],[-119.745,34.6003],[-119.703,34.4935],[-119.723,34.5015],[-119.744,34.6191],[-119.713,34.4946],[-119.711,34.4951],[-119.712,34.495],[-119.732,34.5974],[-120.008,34.7708],[-120.01,34.7676],[-119.735,34.6163],[-120.029,34.5335],[-119.753,34.5991],[-119.734,34.6144],[-119.638,34.4838],[-119.976,34.7572],[-119.711,34.495],[-120.009,34.7621],[-119.712,34.4946],[-119.747,34.5992],[-119.751,34.6071],[-119.709,34.4953],[-119.692,34.486],[-119.735,34.6145],[-119.732,34.5961],[-119.638,34.4839],[-119.747,34.6011],[-119.749,34.6006],[-119.711,34.4949],[-120.023,34.5339],[-120.012,34.7683],[-119.705,34.4941],[-120.011,34.7409],[-119.712,34.4947],[-119.693,34.4852],[-119.889,34.5153],[-119.71,34.4954],[-119.712,34.4944],[-119.732,34.5958],[-119.692,34.4872],[-119.747,34.5994],[-119.714,34.4947],[-119.996,34.7372],[-119.723,34.5013],[-119.713,34.4944],[-119.746,34.5994],[-119.708,34.4955],[-120.008,34.7705],[-120.036,34.7679],[-119.692,34.4877],[-119.708,34.4953]];
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