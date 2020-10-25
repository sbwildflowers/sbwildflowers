var subSightings = [[-120.023,34.5339],[-120.044,34.5349],[-120.052,34.5359],[-120.031,34.5336],[-120.205,34.4926],[-120.219,34.4964],[-120.049,34.5365],[-120.076,34.5174],[-120.215,34.496],[-119.93,34.7667],[-120.02,34.5322],[-120.238,34.4879],[-120.238,34.4877],[-120.174,34.5091],[-120.196,34.5047],[-120.24,34.4848],[-120.046,34.5359],[-120.072,34.5144],[-120.211,34.4943],[-120.224,34.4982],[-120.198,34.5029],[-119.384,34.5096],[-120.241,34.4863],[-119.135,34.4505],[-120.049,34.5364],[-120.039,34.5332],[-120.241,34.487],[-119.136,34.4524],[-120.239,34.4859],[-120.074,34.5235],[-120.048,34.5365],[-120.196,34.5046],[-120.215,34.4961],[-120.208,34.4933],[-120.066,34.5303],[-120.223,34.4968],[-119.384,34.5085],[-120.04,34.5335],[-120.205,34.4935],[-119.383,34.5075],[-120.026,34.5335],[-120.224,34.4956],[-120.215,34.4956],[-120.204,34.4929],[-120.048,34.5364],[-120.19,34.506],[-120.205,34.4942],[-120.236,34.4822],[-120.198,34.5031],[-120.222,34.4967],[-119.639,34.4805],[-120.232,34.4783],[-120.237,34.4897]];
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