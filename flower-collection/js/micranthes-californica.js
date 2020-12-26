var subSightings = [[-119.756,34.5132],[-119.757,34.5096],[-119.585,34.4801],[-119.599,34.4943],[-119.97,34.7442],[-119.956,34.7771],[-119.76,34.5203],[-119.765,34.5649],[-119.757,34.5093],[-119.637,34.4947],[-119.757,34.5104],[-119.758,34.5183],[-119.953,34.7978],[-119.945,34.7719],[-119.513,34.4871],[-119.868,34.5078],[-119.752,34.528],[-119.946,34.7723],[-119.757,34.5098],[-119.634,34.5041],[-119.634,34.5043],[-119.755,34.5127],[-119.758,34.5135],[-119.757,34.5094],[-119.757,34.5138],[-119.757,34.5097],[-119.752,34.5282],[-119.757,34.5127],[-119.495,34.4792],[-119.758,34.5187],[-119.752,34.5103],[-119.752,34.5104],[-119.756,34.5103],[-119.223,34.4896],[-119.989,34.8219],[-119.759,34.5201],[-119.76,34.5202],[-119.756,34.5124],[-119.757,34.5126],[-119.755,34.5128],[-119.744,34.5224],[-119.989,34.804],[-119.966,34.7535],[-119.756,34.5104],[-119.973,34.7503],[-119.758,34.5138],[-119.495,34.4795],[-119.755,34.5131],[-119.757,34.5137],[-119.672,34.5204],[-119.756,34.5127],[-119.495,34.4791],[-119.757,34.5144],[-120.052,34.7476],[-119.765,34.5646],[-119.585,34.4804],[-119.495,34.4809],[-119.758,34.5137],[-119.662,34.4654],[-119.598,34.4944],[-119.636,34.4954],[-119.689,34.4639],[-119.758,34.568],[-119.758,34.5136],[-119.755,34.5129],[-119.755,34.5132],[-119.663,34.4655],[-119.675,34.5219],[-119.757,34.5142],[-119.757,34.5125],[-119.585,34.4803],[-119.634,34.504],[-119.952,34.7981],[-119.756,34.5102],[-119.672,34.5203],[-119.952,34.775],[-119.496,34.4817],[-119.756,34.5128],[-119.765,34.5647],[-119.759,34.5203],[-119.583,34.4805],[-119.76,34.5205],[-119.756,34.5133],[-119.759,34.5673],[-119.756,34.5126]];
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