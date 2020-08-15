var subSightings = [[-119.613,34.4958],[-119.761,34.5397],[-119.774,34.5436],[-119.612,34.4963],[-119.612,34.4962],[-119.778,34.5463],[-119.612,34.496],[-119.601,34.512],[-119.723,34.538],[-119.612,34.4958],[-119.77,34.5424],[-119.61,34.502],[-119.612,34.4956],[-119.609,34.5018],[-119.612,34.4967],[-119.768,34.5399],[-119.609,34.5021],[-119.606,34.5071],[-119.609,34.5019],[-119.699,34.5249],[-119.764,34.5402],[-119.63,34.5292],[-119.612,34.4964],[-119.605,34.507],[-119.612,34.4957],[-119.612,34.4961],[-119.723,34.5387],[-119.601,34.5129],[-119.761,34.5396],[-119.609,34.502],[-119.601,34.5113],[-119.747,34.5381],[-119.612,34.4959],[-119.613,34.4957],[-119.612,34.4965],[-119.616,34.5112],[-119.367,34.6103],[-119.61,34.5021],[-119.758,34.5399],[-119.613,34.4956],[-119.609,34.5022],[-119.614,34.5074],[-119.763,34.5401],[-119.606,34.5069],[-119.606,34.507],[-119.606,34.5072],[-119.765,34.5403]];
$(document).ready(function() {
	var vectorSource = new ol.source.Vector({
      //create empty vector
    });

	//create a bunch of icons and add to source vector
	subSightings.forEach(function(item,index) {
		var iconFeature = new ol.Feature({
		          geometry: new  
		            ol.geom.Point(ol.proj.fromLonLat(item)),
		        name: 'Flower',
		        population: 4000,
		        rainfall: 500
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
        src: 'flower.png'
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