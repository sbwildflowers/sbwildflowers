var subSightings = [[-119.779,34.5592],[-119.612,34.4964],[-120.073,34.5164],[-119.048,34.0932],[-120.058,34.7578],[-119.004,34.1174],[-119.593,34.4721],[-120.23,34.4718],[-119.787,34.5488],[-120.211,34.494],[-119.591,34.4745],[-119.627,34.5225],[-120.23,34.4719],[-119.77,34.547],[-119.752,34.6089],[-119.779,34.5591],[-119.748,34.5956],[-119.046,34.0933],[-119.715,34.5391],[-119.746,34.613],[-119.75,34.6043],[-119.697,34.4781],[-119.612,34.4965],[-119.591,34.4744],[-119.32,34.5963],[-120.231,34.4773],[-120.182,34.5073],[-120.056,34.7553],[-119.743,34.4804],[-119.01,34.0911],[-119.743,34.4805],[-120.232,34.4779],[-119.753,34.6091],[-120.23,34.4973],[-119.748,34.5957],[-120.23,34.4972]];
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