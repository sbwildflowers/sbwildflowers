var subSightings = [[-119.633,34.5062],[-119.763,34.5648],[-119.595,34.4923],[-119.63,34.5122],[-119.631,34.5212],[-119.632,34.5069],[-119.633,34.5066],[-119.633,34.5061],[-119.596,34.4937],[-119.763,34.5655],[-119.596,34.4935],[-119.632,34.5065],[-119.633,34.5065],[-119.588,34.4915],[-119.592,34.4916],[-119.611,34.4969],[-119.632,34.5142],[-119.632,34.5074],[-119.611,34.4968],[-119.631,34.5087],[-119.596,34.4936],[-119.633,34.5064],[-119.763,34.5649],[-119.632,34.507],[-119.628,34.5119],[-119.631,34.5089],[-119.592,34.4917],[-119.634,34.5041],[-119.633,34.5063],[-119.634,34.5048],[-119.593,34.4915],[-119.606,34.5071],[-119.883,34.7361],[-119.634,34.5049]];
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