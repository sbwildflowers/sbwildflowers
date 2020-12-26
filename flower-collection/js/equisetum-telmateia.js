var subSightings = [[-119.771,34.5606],[-119.74,34.4202],[-119.639,34.458],[-119.642,34.4527],[-119.77,34.5606],[-119.612,34.4541],[-119.591,34.4668],[-119.591,34.4677],[-119.639,34.4581],[-119.639,34.4554],[-119.591,34.4639],[-119.74,34.4208],[-119.641,34.4533],[-119.612,34.4539],[-119.591,34.4629],[-119.402,34.4987],[-119.641,34.4534],[-119.74,34.4204],[-119.586,34.4704],[-119.593,34.4557],[-119.639,34.4555],[-119.611,34.455],[-119.732,34.465],[-119.591,34.4636],[-119.643,34.4517],[-119.74,34.4209],[-119.645,34.451],[-119.654,34.4589],[-119.641,34.4539],[-119.686,34.5149],[-119.639,34.4557],[-119.77,34.5609],[-119.591,34.4635],[-119.591,34.4637],[-119.592,34.4618],[-119.612,34.4535],[-119.64,34.4546],[-119.724,34.4767],[-119.643,34.4521],[-119.612,34.454]];
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