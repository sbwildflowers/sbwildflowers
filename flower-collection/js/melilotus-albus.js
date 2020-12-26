var subSightings = [[-119.763,34.5649],[-119.735,34.4645],[-119.311,34.2774],[-119.279,34.519],[-119.634,34.505],[-119.595,34.4921],[-119.729,34.4543],[-119.591,34.4916],[-119.591,34.4555],[-119.73,34.4524],[-119.675,34.4692],[-119.38,34.5069],[-119.632,34.5143],[-119.591,34.4541],[-119.595,34.4923],[-119.767,34.5427],[-119.286,34.4774],[-119.63,34.5116],[-119.713,34.5347],[-120.226,34.5072],[-119.597,34.4933],[-119.633,34.505],[-119.741,34.4187],[-119.605,34.5073],[-119.63,34.5122],[-119.725,34.535],[-119.775,34.7607],[-119.578,34.5088],[-119.591,34.4538],[-119.739,34.4053],[-119.965,34.7839],[-119.733,34.4618],[-119.674,34.5218],[-119.777,34.5459],[-119.675,34.4693],[-119.77,34.5621],[-119.31,34.2765],[-119.798,34.4836],[-119.866,34.5069],[-119.875,34.4174],[-119.875,34.4175],[-119.751,34.435],[-119.731,34.4551],[-119.605,34.5077],[-119.596,34.4936],[-119.792,34.5152],[-119.541,34.4866],[-119.763,34.5651],[-119.634,34.5048],[-119.662,34.4197],[-119.688,34.5218],[-119.63,34.511],[-119.63,34.5117],[-119.591,34.454],[-119.634,34.5049],[-119.595,34.4922],[-119.739,34.4215],[-119.865,34.5062],[-119.729,34.4562],[-119.605,34.5074],[-119.291,34.4785],[-119.685,34.4858],[-119.724,34.5014],[-119.614,34.4953],[-119.767,34.5422],[-119.807,34.4253],[-119.359,34.3124],[-119.654,34.5219],[-119.612,34.4978],[-119.487,34.3844],[-119.653,34.4562],[-119.711,34.495],[-119.631,34.5086],[-119.731,34.4552],[-119.731,34.4553],[-119.761,34.5393],[-119.591,34.4917],[-120.237,34.5118],[-119.73,34.4551],[-119.75,34.4342],[-119.761,34.5391],[-119.762,34.5666],[-119.681,34.4826],[-119.633,34.5061],[-119.314,34.2794],[-119.633,34.5062],[-119.763,34.5652]];
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