var subSightings = [[-120,34.7373],[-119.752,34.5728],[-120.068,34.7595],[-120.057,34.753],[-119.749,34.5736],[-119.752,34.5731],[-119.755,34.5728],[-119.749,34.5737],[-120,34.7355],[-119.755,34.5739],[-119.753,34.5726],[-119.752,34.5726],[-120.015,34.7398],[-119.748,34.5733],[-120.057,34.7516],[-120.048,34.7447],[-120.061,34.7559],[-119.752,34.5732],[-120.059,34.7553],[-120.056,34.7508],[-119.749,34.5732],[-119.75,34.5734],[-120.051,34.7438],[-119.75,34.5733],[-119.754,34.5769],[-120.009,34.7383],[-119.755,34.5774],[-119.752,34.5729],[-120.008,34.7377],[-119.752,34.5727],[-120.002,34.7348],[-120.053,34.7516],[-120.051,34.7436],[-119.749,34.5739],[-120.054,34.7517],[-120.061,34.7566],[-120.014,34.7398],[-119.749,34.5738],[-119.755,34.5729],[-120.054,34.7516],[-119.753,34.5727],[-119.748,34.5735],[-119.757,34.5716],[-119.754,34.5768],[-120.068,34.7596],[-119.748,34.5741],[-119.756,34.5715],[-119.757,34.5714],[-119.752,34.573],[-119.752,34.5733],[-120.008,34.7379],[-119.755,34.5737],[-120,34.7372],[-120.009,34.738],[-120.009,34.7381],[-120.014,34.74],[-120.051,34.7437],[-120.001,34.7353],[-120.015,34.7394],[-119.754,34.5767],[-120.015,34.7399],[-120,34.7359]];
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