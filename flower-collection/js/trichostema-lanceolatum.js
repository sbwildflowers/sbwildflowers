var subSightings = [[-119.751,34.5612],[-119.834,34.7504],[-119.612,34.4965],[-120.23,34.498],[-119.752,34.5623],[-119.612,34.4962],[-120.124,34.5201],[-119.918,34.7658],[-119.638,34.497],[-119.611,34.4963],[-119.54,34.4871],[-119.637,34.497],[-119.612,34.496],[-119.613,34.4957],[-120.125,34.5204],[-119.75,34.5601],[-120.238,34.4941],[-119.637,34.4972],[-120.228,34.4994],[-119.612,34.4957],[-119.803,34.7584],[-119.609,34.5039],[-119.612,34.4958],[-119.757,34.5295],[-119.638,34.4972],[-119.611,34.4962],[-119.613,34.4958],[-119.639,34.4975],[-119.611,34.4958],[-119.612,34.4961],[-119.612,34.4963],[-119.769,34.5546],[-119.637,34.4971],[-119.54,34.487],[-119.611,34.4964],[-119.75,34.56],[-119.613,34.4956],[-119.638,34.4974],[-119.749,34.5731],[-119.638,34.4973],[-119.611,34.4965],[-119.752,34.5621],[-119.829,34.7502],[-119.751,34.5605],[-120.23,34.4979],[-119.638,34.4971],[-119.612,34.4964],[-119.612,34.4959],[-119.749,34.5733],[-119.637,34.4973]];
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