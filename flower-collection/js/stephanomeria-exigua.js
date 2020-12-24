var subSightings = [[-119.712,34.4732],[-119.711,34.4732],[-119.705,34.4716],[-119.723,34.4754],[-119.722,34.4755],[-119.717,34.4738],[-119.722,34.4753],[-119.719,34.4741],[-119.717,34.4737],[-119.723,34.4756],[-119.722,34.4756],[-119.711,34.4735],[-119.718,34.472],[-119.71,34.4734],[-119.742,34.4788],[-119.705,34.4717],[-119.71,34.473],[-119.743,34.478],[-119.71,34.4731],[-119.743,34.48],[-119.706,34.4708],[-119.718,34.4737],[-119.743,34.4779],[-119.743,34.4809],[-119.706,34.471],[-119.722,34.4757],[-119.709,34.4726],[-119.742,34.4812],[-119.743,34.4789],[-119.719,34.4746],[-119.703,34.4724],[-119.711,34.4731],[-119.703,34.473],[-119.705,34.4719],[-119.706,34.4707],[-119.718,34.4736],[-119.712,34.473],[-119.717,34.4736],[-119.718,34.4738],[-119.723,34.4757],[-119.709,34.4728],[-119.719,34.4745],[-119.711,34.4733],[-119.712,34.4731],[-119.71,34.4729],[-119.72,34.4747],[-119.702,34.473],[-119.743,34.4806],[-119.743,34.4784],[-119.719,34.4743],[-119.742,34.4811],[-119.708,34.4725],[-119.716,34.4722],[-119.725,34.4761],[-119.703,34.4725],[-119.743,34.4826],[-119.712,34.4734],[-119.748,34.4862],[-119.711,34.4734],[-119.748,34.4867],[-119.711,34.4736],[-119.708,34.4729],[-119.722,34.4765],[-119.71,34.4733],[-119.705,34.472],[-119.742,34.4789],[-119.72,34.4746],[-119.743,34.4799],[-119.706,34.4712],[-119.712,34.4733],[-119.723,34.4755],[-119.709,34.4727],[-119.722,34.4754],[-119.742,34.4794],[-119.743,34.4817],[-119.743,34.4802],[-119.743,34.4804],[-119.71,34.4732],[-119.743,34.4787],[-119.719,34.4744],[-119.706,34.4709],[-119.743,34.4811],[-119.705,34.4715]];
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