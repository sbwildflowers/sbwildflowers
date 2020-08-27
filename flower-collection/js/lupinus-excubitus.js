var subSightings = [[-120,34.7357],[-120.052,34.7579],[-120.002,34.7453],[-119.972,34.7299],[-119.995,34.7369],[-120.052,34.7576],[-120.049,34.7609],[-119.917,34.7043],[-120.01,34.7677],[-119.975,34.7314],[-119.972,34.7302],[-120.02,34.7686],[-120.011,34.7574],[-119.975,34.7311],[-120.035,34.768],[-120.012,34.768],[-119.968,34.7396],[-119.976,34.7315],[-119.99,34.7361],[-120.012,34.7407],[-120.03,34.7689],[-120.004,34.7344],[-120.035,34.7678],[-119.995,34.7446],[-119.995,34.7383],[-120.019,34.7697],[-119.986,34.7348],[-120.036,34.7678],[-120.009,34.763],[-120.056,34.7474],[-120.008,34.7646],[-119.995,34.7452],[-119.998,34.7365],[-120.023,34.7845],[-119.982,34.7527],[-120.011,34.779],[-119.924,34.7183]];
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