var subSightings = [[-119.741,34.4178],[-119.641,34.4541],[-119.65,34.4653],[-119.729,34.4715],[-119.633,34.5063],[-119.591,34.454],[-119.651,34.4639],[-119.641,34.4535],[-119.73,34.4551],[-119.651,34.4645],[-119.651,34.464],[-119.65,34.464],[-119.639,34.4551],[-119.77,34.5609],[-119.654,34.4584],[-119.733,34.4669],[-119.639,34.4553],[-119.629,34.5122],[-119.797,34.4261],[-119.651,34.4646],[-119.651,34.4638],[-119.741,34.4176],[-119.654,34.4576],[-119.65,34.4651],[-119.65,34.4641],[-119.729,34.4718],[-119.652,34.4624],[-119.727,34.4745],[-119.653,34.4625],[-119.65,34.4652],[-119.74,34.4209],[-119.731,34.4552],[-119.741,34.4183],[-119.648,34.4643],[-119.729,34.4716],[-119.638,34.4973],[-119.651,34.4641],[-119.623,34.4652],[-119.651,34.4643],[-119.38,34.507],[-119.654,34.4572],[-119.651,34.4642],[-119.64,34.4543],[-119.651,34.4644],[-119.77,34.5607],[-119.652,34.4623],[-119.657,34.4634]];
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