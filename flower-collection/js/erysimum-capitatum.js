var subSightings = [[-119.146,34.724],[-119.748,34.6131],[-119.372,34.6335],[-119.751,34.6016],[-119.748,34.6129],[-119.748,34.613],[-119.754,34.5995],[-119.146,34.7233],[-119.753,34.6008],[-119.883,34.7765],[-119.153,34.7258],[-119.372,34.6165],[-119.754,34.5999],[-119.755,34.5995],[-119.752,34.6012],[-119.754,34.5996],[-119.754,34.5994],[-119.754,34.5997],[-119.749,34.603],[-120.001,34.7352],[-119.751,34.6018],[-119.753,34.5999],[-119.147,34.7235],[-119.146,34.7231],[-119.749,34.6031],[-119.753,34.6007],[-120,34.7353],[-119.753,34.601],[-119.75,34.6031],[-120.207,34.4909],[-119.372,34.6213],[-119.753,34.6004],[-119.372,34.632],[-119.753,34.6005],[-119.382,34.6516],[-118.546,34.6943],[-119.754,34.6],[-119.121,34.7176],[-119.753,34.6006]];
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