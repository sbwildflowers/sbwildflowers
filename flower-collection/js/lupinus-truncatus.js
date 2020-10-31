var subSightings = [[-119.673,34.5003],[-119.675,34.4573],[-119.633,34.4962],[-119.752,34.5043],[-119.637,34.4977],[-119.242,34.4674],[-119.681,34.5157],[-119.637,34.4976],[-119.676,34.4572],[-119.743,34.478],[-119.637,34.4978],[-119.745,34.4927],[-120.239,34.4944],[-119.787,34.4207],[-119.633,34.4963],[-119.241,34.4679],[-119.785,34.5573],[-120.237,34.494],[-119.625,34.4954],[-119.92,34.7671],[-120.233,34.4971],[-119.622,34.4943],[-119.673,34.5004],[-120.06,34.7387],[-119.77,34.5606],[-120.055,34.7481],[-119.743,34.4781],[-120.074,34.513],[-119.786,34.5478],[-119.673,34.5005],[-120.234,34.4971],[-119.642,34.5138],[-119.785,34.5571],[-120.073,34.5131],[-119.239,34.4686],[-119.752,34.5044],[-119.681,34.5159],[-119.627,34.4955],[-120.06,34.7397],[-119.723,34.4756],[-119.681,34.5158],[-119.642,34.5139],[-119.513,34.4866],[-119.785,34.5572],[-119.687,34.4753],[-119.676,34.4571],[-120.053,34.7566],[-119.687,34.4752],[-119.787,34.5461],[-119.633,34.4961]];
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