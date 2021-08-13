var subSightings = [[-119.751,34.5734],[-119.756,34.5727],[-119.751,34.5735],[-119.751,34.5606],[-119.754,34.577],[-119.748,34.5734],[-119.756,34.5718],[-119.748,34.57],[-119.751,34.5613],[-119.749,34.5579],[-119.754,34.5782],[-119.748,34.5662],[-119.756,34.5729],[-119.74,34.5686],[-119.752,34.5619],[-119.749,34.5733],[-119.75,34.6074],[-119.755,34.5727],[-119.749,34.5709],[-119.748,34.5726],[-119.749,34.5736],[-119.746,34.5754],[-119.748,34.572],[-119.755,34.573],[-119.749,34.5734],[-119.752,34.5621],[-119.749,34.5699],[-119.748,34.5657],[-119.748,34.5739],[-119.748,34.5735],[-119.749,34.5739],[-119.749,34.5574],[-119.755,34.5728],[-119.749,34.5712],[-119.748,34.5736],[-119.75,34.5734],[-119.75,34.5575],[-119.749,34.558],[-119.755,34.5729],[-119.751,34.5732],[-119.754,34.5781],[-119.748,34.5731],[-119.752,34.5623],[-119.753,34.5798],[-119.749,34.5738],[-119.749,34.5737],[-119.751,34.5733],[-119.751,34.5615],[-119.748,34.5737],[-119.748,34.5702],[-119.748,34.5663],[-119.751,34.5578],[-119.749,34.5702],[-119.752,34.5622],[-119.756,34.5728],[-119.748,34.5668],[-119.749,34.5731],[-119.754,34.5783],[-119.748,34.567],[-119.749,34.5573],[-119.749,34.571],[-119.754,34.5774],[-119.756,34.573],[-119.748,34.5701],[-119.748,34.5718],[-119.757,34.5733],[-119.748,34.5723],[-119.751,34.5612],[-119.755,34.5724],[-119.75,34.5599]];
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