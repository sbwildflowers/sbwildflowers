var subSightings = [[-119.652,34.4626],[-119.729,34.458],[-119.735,34.4506],[-119.814,34.5045],[-119.651,34.4636],[-119.766,34.4366],[-119.728,34.4612],[-119.651,34.4635],[-119.619,34.4464],[-119.654,34.4573],[-119.732,34.4652],[-119.707,34.4696],[-119.728,34.4613],[-119.651,34.4637],[-119.728,34.4578],[-119.814,34.424],[-119.73,34.4692],[-119.956,34.552],[-119.728,34.4609],[-119.728,34.4581],[-119.728,34.4601],[-119.732,34.465],[-119.65,34.4635],[-119.732,34.4664],[-119.728,34.461],[-119.654,34.4574],[-119.728,34.4582],[-119.654,34.4591],[-119.65,34.4637],[-119.728,34.4611],[-119.735,34.4505],[-119.651,34.4634],[-119.73,34.4691],[-119.706,34.4703],[-119.738,34.4267],[-119.728,34.4584],[-119.73,34.4693],[-119.732,34.4649],[-119.732,34.4665],[-119.65,34.4634],[-119.728,34.4583],[-119.734,34.4517],[-119.639,34.4631]];
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