var subSightings = [[-119.729,34.4721],[-119.609,34.5022],[-119.591,34.4588],[-119.63,34.5111],[-119.628,34.5216],[-119.761,34.5389],[-119.598,34.494],[-119.623,34.4576],[-119.726,34.4759],[-119.609,34.5023],[-119.728,34.4597],[-119.736,34.4051],[-119.775,34.4162],[-119.729,34.4718],[-119.651,34.4635],[-119.728,34.4598],[-119.74,34.4208],[-119.732,34.4674],[-119.688,34.5531],[-119.623,34.458],[-119.65,34.4634],[-119.611,34.4958],[-119.63,34.511],[-119.74,34.4076],[-119.595,34.4924],[-119.729,34.4719],[-119.611,34.4552],[-119.623,34.4577],[-119.729,34.4724],[-119.319,34.6949],[-119.728,34.4583],[-119.729,34.4726],[-119.729,34.4722],[-119.611,34.4548],[-119.729,34.4727],[-119.591,34.4589],[-119.633,34.5155],[-119.609,34.5024],[-119.74,34.4077],[-119.653,34.4571],[-119.628,34.5217],[-119.74,34.4209],[-119.757,34.5151],[-119.612,34.4548],[-119.311,34.2765],[-119.598,34.4939],[-119.593,34.4915],[-119.729,34.4713],[-119.632,34.432],[-119.63,34.5113],[-119.591,34.4582],[-119.731,34.4638],[-119.74,34.4088],[-119.727,34.4745],[-119.728,34.4595],[-119.603,34.493],[-119.611,34.4544],[-119.775,34.4163],[-119.74,34.4207],[-119.728,34.4599],[-119.736,34.405],[-119.651,34.4636],[-119.727,34.4739],[-119.591,34.4555],[-119.586,34.479],[-119.59,34.4693],[-119.316,34.2811],[-119.654,34.4593],[-119.623,34.4578],[-119.757,34.515],[-119.628,34.5118],[-119.603,34.4929],[-119.631,34.5106],[-119.74,34.4075],[-119.611,34.4489],[-119.316,34.2809],[-119.729,34.4725],[-119.729,34.4543],[-119.736,34.4049],[-119.728,34.4596],[-119.727,34.4597],[-119.623,34.4579],[-119.63,34.5109],[-119.729,34.472],[-119.739,34.4063],[-119.63,34.5114],[-119.729,34.4723],[-119.609,34.5019],[-119.759,34.5278]];
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