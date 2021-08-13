var subSightings = [[-119.644,34.4827],[-119.644,34.4846],[-119.652,34.4625],[-119.754,34.5726],[-119.638,34.4804],[-119.77,34.5514],[-119.659,34.4659],[-119.753,34.5725],[-119.639,34.4806],[-119.757,34.5689],[-119.63,34.4808],[-119.599,34.4657],[-119.65,34.4791],[-119.653,34.4624],[-119.633,34.5163],[-119.613,34.4958],[-119.604,34.4743],[-119.631,34.481],[-119.644,34.4637],[-120.064,34.7368],[-119.637,34.4777],[-119.66,34.4734],[-119.627,34.4956],[-119.754,34.5725],[-119.644,34.4814],[-119.644,34.4641],[-119.644,34.4632],[-119.755,34.5744],[-119.639,34.4805],[-119.65,34.4666],[-119.633,34.5157],[-119.756,34.5745],[-119.602,34.474],[-119.757,34.5692],[-119.636,34.4921],[-119.757,34.5701],[-119.907,34.7774],[-119.759,34.5378],[-119.752,34.573],[-119.745,34.493],[-119.62,34.5371],[-119.637,34.4775],[-119.757,34.5691],[-119.634,34.5101],[-119.632,34.5081],[-119.644,34.4636],[-119.757,34.5694],[-119.756,34.5725],[-119.644,34.4639],[-119.874,34.7722],[-119.751,34.5021],[-119.957,34.7776],[-119.637,34.478],[-119.644,34.4845],[-119.956,34.5347],[-119.608,34.4765],[-119.66,34.4762],[-119.637,34.4779],[-119.644,34.4844],[-119.751,34.5215],[-119.644,34.4638],[-119.66,34.4761],[-119.757,34.5693],[-119.66,34.4772],[-119.609,34.504],[-119.645,34.464],[-119.639,34.4804],[-119.603,34.4646],[-119.752,34.5727],[-119.759,34.5377],[-119.627,34.4954],[-119.751,34.5023],[-119.644,34.464],[-119.591,34.458],[-119.637,34.4776],[-120.043,34.7428],[-119.661,34.4787],[-119.623,34.4949]];
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