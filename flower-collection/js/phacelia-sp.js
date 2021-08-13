var subSightings = [[-119.716,34.4926],[-119.644,34.4638],[-119.644,34.4646],[-119.644,34.4641],[-119.701,34.4868],[-119.638,34.4784],[-119.77,34.6275],[-120.206,34.5039],[-119.725,34.4756],[-119.77,34.6257],[-119.732,34.5708],[-119.639,34.4804],[-119.749,34.6166],[-119.754,34.5992],[-119.757,34.569],[-119.71,34.4733],[-119.644,34.4639],[-120.232,34.4991],[-119.638,34.4787],[-119.644,34.4642],[-119.874,34.7355],[-119.945,34.5281],[-119.632,34.5079],[-119.629,34.4771],[-119.886,34.7368],[-119.847,34.4064],[-119.746,34.4956],[-119.873,34.7357],[-119.693,34.4999],[-119.639,34.4833],[-119.75,34.6031],[-119.717,34.5856],[-119.644,34.464],[-119.755,34.599],[-119.699,34.4926]];
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