var subSightings = [[-119.8,34.4188],[-119.797,34.4186],[-119.766,34.4097],[-119.765,34.4093],[-119.831,34.4194],[-119.685,34.4543],[-119.784,34.4303],[-119.798,34.4238],[-119.736,34.4264],[-120.03,34.464],[-119.799,34.4185],[-119.831,34.4195],[-119.794,34.4241],[-119.799,34.4204],[-119.804,34.4245],[-119.784,34.4302],[-119.834,34.417],[-119.784,34.4301],[-119.638,34.4801],[-119.773,34.4395],[-119.638,34.4802],[-119.762,34.4109],[-120.065,34.4835],[-119.797,34.4241],[-119.626,34.4458],[-119.834,34.4171],[-119.685,34.4542],[-119.786,34.4167],[-119.8,34.4223],[-119.778,34.4389],[-119.835,34.4175],[-119.638,34.4803],[-119.882,34.4131],[-119.877,34.4301],[-119.8,34.4192],[-119.844,34.4064],[-119.882,34.413]];
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