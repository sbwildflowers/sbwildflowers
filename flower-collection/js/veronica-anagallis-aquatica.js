var subSightings = [[-119.625,34.4953],[-119.606,34.507],[-119.73,34.4554],[-119.734,34.5368],[-119.633,34.5064],[-119.761,34.5393],[-119.631,34.5302],[-119.965,34.7839],[-119.628,34.5268],[-119.63,34.5121],[-119.628,34.5269],[-119.63,34.5122],[-119.609,34.5038],[-119.73,34.4551],[-119.633,34.5063],[-119.629,34.5119],[-119.73,34.4552],[-119.731,34.4553],[-119.761,34.5392],[-119.632,34.5177],[-119.63,34.5134],[-119.63,34.5127],[-119.628,34.5273],[-119.629,34.512],[-119.607,34.507],[-119.762,34.5392],[-119.731,34.455],[-119.761,34.5391],[-119.629,34.5121],[-119.63,34.5125],[-119.627,34.5259],[-119.632,34.5144],[-119.631,34.5213],[-119.622,34.452],[-119.731,34.4552],[-119.729,34.4717],[-119.615,34.5099],[-119.731,34.4551],[-119.631,34.5289],[-119.663,34.4789],[-119.622,34.4518],[-119.596,34.4936]];
$(document).ready(function() {
	var vectorSource = new ol.source.Vector({
      //create empty vector
    });

	//create a bunch of icons and add to source vector
	subSightings.forEach(function(item,index) {
		var iconFeature = new ol.Feature({
		          geometry: new  
		            ol.geom.Point(ol.proj.fromLonLat(item)),
		        name: 'Flower',
		        population: 4000,
		        rainfall: 500
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
        src: 'flower.png'
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