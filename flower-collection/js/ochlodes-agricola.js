var subSightings = [[-119.728,34.4587],[-119.637,34.4877],[-119.63,34.5115],[-119.751,34.5017],[-119.757,34.5097],[-119.633,34.5095],[-119.698,34.5005],[-119.697,34.5136],[-119.643,34.5144],[-119.757,34.5109],[-119.702,34.4732],[-119.746,34.4946],[-119.639,34.4832],[-119.694,34.5074],[-119.589,34.486],[-119.634,34.4967],[-119.638,34.4785],[-119.637,34.4876],[-119.694,34.5075],[-119.756,34.5115],[-119.636,34.4943],[-119.694,34.5043],[-119.637,34.4797],[-119.635,34.511],[-119.637,34.4821],[-119.698,34.513],[-119.611,34.4992],[-119.59,34.4872],[-119.757,34.5139],[-119.637,34.4875],[-119.698,34.5127],[-119.644,34.464],[-119.64,34.5133],[-119.634,34.4826],[-119.643,34.4649],[-119.637,34.496],[-119.644,34.4648]];
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