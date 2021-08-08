var subSightings = [[-119.631,34.5091],[-119.63,34.5109],[-119.63,34.5114],[-119.911,34.7731],[-119.785,34.5566],[-119.565,34.4807],[-119.753,34.5725],[-119.565,34.4804],[-119.744,34.5882],[-120.015,34.7393],[-119.752,34.5727],[-119.63,34.5186],[-119.753,34.5802],[-119.631,34.5189],[-119.972,34.7304],[-119.631,34.5093],[-119.631,34.5092],[-119.898,34.5189],[-119.785,34.5575],[-119.631,34.5185],[-120.009,34.7381],[-120.035,34.7434],[-119.631,34.519],[-119.744,34.588],[-119.934,34.7683],[-119.912,34.7692],[-119.762,34.5658],[-119.785,34.5572],[-120.015,34.7394],[-119.753,34.5726],[-120.009,34.738],[-119.912,34.7697],[-119.909,34.7743],[-119.925,34.7659],[-119.631,34.5187],[-119.785,34.5565],[-119.63,34.5113],[-119.911,34.6892],[-119.785,34.557],[-119.631,34.509],[-119.743,34.5874],[-119.029,34.0887],[-120.044,34.742],[-119.565,34.4808],[-119.63,34.5115],[-119.785,34.5567],[-119.92,34.6748],[-119.744,34.5883],[-119.756,34.5727],[-119.62,34.5406],[-119.933,34.7684],[-119.754,34.578],[-119.928,34.7665],[-119.63,34.5107],[-120.013,34.7412],[-119.785,34.5573],[-119.743,34.5875],[-119.765,34.624],[-119.744,34.5884],[-119.765,34.6241],[-120.013,34.7401],[-119.743,34.5871],[-119.754,34.5781],[-119.911,34.7696],[-120.009,34.7382],[-119.997,34.7364],[-119.908,34.7767],[-119.63,34.5108],[-119.925,34.7665],[-119.743,34.5876],[-119.744,34.5881],[-120.035,34.7435],[-119.929,34.7665],[-119.912,34.7691],[-119.785,34.5574],[-119.565,34.4809],[-119.785,34.5571],[-119.762,34.5659],[-119.912,34.7696],[-119.631,34.5089],[-119.753,34.5727]];
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