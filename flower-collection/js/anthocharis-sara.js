var subSightings = [[-119.872,34.787],[-119.956,34.5454],[-119.568,34.4805],[-119.247,34.4682],[-119.649,34.4634],[-119.732,34.4543],[-119.622,34.4947],[-119.759,34.538],[-119.741,34.476],[-119.69,34.4618],[-119.591,34.4917],[-119.986,34.8011],[-119.757,34.5713],[-119.952,34.7748],[-119.955,34.5573],[-119.729,34.4609],[-119.633,34.5097],[-119.639,34.4806],[-119.719,34.4742],[-119.638,34.5102],[-119.636,34.4863],[-119.563,34.4874],[-119.723,34.4756],[-119.729,34.4711],[-119.632,34.508],[-119.723,34.4755],[-119.585,34.4915],[-119.636,34.4957],[-119.638,34.497],[-119.571,34.4721],[-119.791,34.5342],[-119.632,34.5076],[-119.596,34.4935],[-119.754,34.5726],[-119.991,34.7984],[-119.743,34.4802],[-119.928,34.7664],[-119.956,34.5551],[-119.729,34.4723],[-119.719,34.4741],[-119.74,34.4738],[-119.735,34.4653],[-119.643,34.4611],[-119.644,34.4638],[-119.946,34.7724],[-119.622,34.4675],[-119.963,34.8128],[-119.757,34.5158],[-119.763,34.5653],[-119.719,34.4745],[-119.754,34.5314],[-119.644,34.464],[-119.672,34.5245],[-119.251,34.4707],[-119.632,34.5068],[-119.638,34.4969],[-119.756,34.5103],[-119.76,34.5385],[-119.872,34.7874],[-119.787,34.5498],[-119.449,34.4909],[-119.991,34.8192],[-119.745,34.4933],[-119.003,34.1186],[-119.595,34.4918],[-119.961,34.8121],[-119.635,34.5009],[-119.7,34.4851],[-119.578,34.4893],[-119.65,34.462],[-120.064,34.7366],[-119.589,34.4915]];
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