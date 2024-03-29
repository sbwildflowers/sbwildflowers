var subSightings = [[-119.597,34.4573],[-119.805,34.4243],[-119.728,34.4599],[-119.728,34.4583],[-119.831,34.4194],[-119.732,34.4536],[-119.729,34.4573],[-119.728,34.4585],[-120.226,34.4992],[-119.729,34.4555],[-119.729,34.4557],[-119.732,34.4543],[-119.728,34.458],[-120.226,34.4994],[-119.732,34.4538],[-119.73,34.4553],[-119.729,34.4574],[-119.729,34.4559],[-119.723,34.4756],[-119.818,34.4237],[-119.732,34.4537],[-119.729,34.4554],[-119.803,34.4236],[-119.728,34.4589],[-119.831,34.4193],[-120.23,34.4969],[-119.729,34.4544],[-119.72,34.4748],[-119.729,34.4558],[-119.74,34.4081],[-119.826,34.4225],[-120.23,34.497],[-119.729,34.4572],[-119.803,34.4244],[-120.221,34.5032],[-119.731,34.4551],[-119.725,34.4762],[-119.728,34.4595],[-119.729,34.4543],[-119.728,34.4588],[-119.728,34.4609],[-119.729,34.4576]];
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