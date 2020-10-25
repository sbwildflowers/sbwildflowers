var subSightings = [[-119.626,34.4735],[-119.626,34.4739],[-119.765,34.5605],[-119.645,34.5155],[-119.924,34.7667],[-119.929,34.7661],[-119.744,34.588],[-119.686,34.5006],[-119.631,34.509],[-119.785,34.5567],[-119.626,34.4736],[-119.63,34.5113],[-119.631,34.5089],[-119.645,34.5156],[-119.765,34.5615],[-119.686,34.5005],[-119.277,34.5216],[-119.765,34.5617],[-119.626,34.4731],[-119.743,34.5876],[-119.592,34.4724],[-119.785,34.5566],[-119.627,34.4743],[-119.743,34.5863],[-119.631,34.5114],[-119.743,34.5874],[-119.631,34.5094],[-119.269,34.53],[-119.765,34.5609],[-119.765,34.5614],[-119.765,34.5608],[-119.626,34.4734],[-119.63,34.5117],[-119.765,34.5611],[-119.765,34.5619],[-119.631,34.5093],[-119.765,34.5616],[-119.743,34.5877],[-119.384,34.5082],[-119.785,34.5565],[-119.755,34.5765],[-119.626,34.4738],[-119.26,34.472],[-119.755,34.5764],[-119.631,34.5092],[-119.743,34.5862],[-119.276,34.5228]];
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