var subSightings = [[-119.594,34.4915],[-119.786,34.5479],[-119.669,34.5234],[-119.636,34.4948],[-119.636,34.4934],[-119.636,34.495],[-119.594,34.4917],[-119.787,34.5461],[-119.597,34.4935],[-119.633,34.5049],[-119.614,34.4954],[-119.633,34.5047],[-119.755,34.5129],[-119.594,34.4916],[-119.614,34.4955],[-119.636,34.4949],[-119.567,34.4779],[-119.755,34.5126],[-119.743,34.5225],[-119.607,34.4941],[-119.636,34.4952],[-119.567,34.4774],[-119.816,34.5346],[-119.614,34.4956],[-119.285,34.4773],[-119.765,34.5648],[-119.638,34.4968],[-119.761,34.5663],[-119.773,34.5582],[-119.589,34.4914],[-119.638,34.497],[-119.755,34.5131],[-120.034,34.7682],[-119.607,34.4942],[-119.636,34.4951],[-119.757,34.5177],[-119.759,34.5202]];
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