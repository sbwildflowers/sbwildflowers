var subSightings = [[-119.692,34.4607],[-119.627,34.4956],[-119.758,34.5376],[-120.234,34.4965],[-119.791,34.5412],[-119.759,34.5377],[-119.76,34.5665],[-119.958,34.7835],[-119.611,34.4964],[-119.637,34.4971],[-120.059,34.7444],[-119.785,34.5578],[-119.611,34.4963],[-119.611,34.4961],[-119.637,34.4973],[-119.785,34.5559],[-119.772,34.5592],[-119.638,34.497],[-119.682,34.4746],[-119.773,34.546],[-119.759,34.5378],[-119.638,34.4972],[-119.78,34.5583],[-119.757,34.5317],[-119.637,34.4972],[-119.76,34.5385],[-119.613,34.4955],[-119.757,34.5316],[-119.609,34.4953],[-119.789,34.5381],[-119.627,34.4955],[-119.627,34.4954],[-119.757,34.5327],[-119.774,34.5462],[-119.635,34.4953],[-119.639,34.4975],[-119.78,34.5586],[-119.785,34.556],[-119.773,34.5462],[-119.748,34.5243],[-119.638,34.4971],[-119.76,34.5663],[-119.762,34.538]];
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