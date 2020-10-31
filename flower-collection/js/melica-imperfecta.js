var subSightings = [[-119.639,34.4804],[-119.644,34.4644],[-119.651,34.4615],[-119.593,34.4715],[-119.638,34.4791],[-119.7,34.4852],[-119.639,34.4724],[-119.637,34.4816],[-119.385,34.5088],[-119.757,34.5117],[-119.645,34.4639],[-119.644,34.4621],[-119.644,34.4639],[-119.636,34.4901],[-119.638,34.4793],[-119.724,34.4757],[-119.637,34.4785],[-119.746,34.4962],[-119.637,34.4812],[-119.674,34.5093],[-119.728,34.4735],[-119.636,34.4941],[-119.644,34.4645],[-119.638,34.4788],[-119.749,34.5002],[-119.661,34.4672],[-119.746,34.4961],[-119.685,34.4754],[-119.648,34.4614],[-119.641,34.4728],[-119.653,34.4606],[-119.64,34.4731],[-119.645,34.464],[-119.642,34.4726],[-119.636,34.4921],[-119.649,34.4754],[-119.639,34.4789],[-119.651,34.4637],[-119.644,34.4749],[-119.633,34.4798],[-119.639,34.4808],[-119.725,34.4758],[-119.638,34.479],[-119.757,34.5097],[-119.65,34.4611],[-119.75,34.5005],[-119.638,34.4794],[-119.687,34.4684],[-119.649,34.4578],[-119.638,34.4814],[-119.639,34.4807],[-119.66,34.4698],[-119.281,34.4755],[-119.757,34.5115],[-119.707,34.4724],[-119.644,34.4642],[-119.688,34.4684],[-119.611,34.4518],[-119.641,34.4729],[-119.649,34.4593],[-119.644,34.4632],[-119.639,34.4788],[-119.636,34.4916],[-119.645,34.4642],[-119.647,34.4627],[-119.624,34.4645],[-119.749,34.4996],[-119.746,34.4963],[-119.644,34.4638],[-119.72,34.4747],[-119.701,34.4869],[-119.639,34.4735],[-119.636,34.4952],[-119.645,34.4641],[-119.746,34.4946],[-119.638,34.4768],[-119.638,34.4792],[-119.644,34.464]];
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