var subSightings = [[-119.735,34.4496],[-119.65,34.4626],[-119.72,34.4748],[-119.313,34.6979],[-119.709,34.4727],[-119.63,34.5117],[-119.783,34.433],[-119.673,34.5248],[-119.592,34.4716],[-119.531,34.4877],[-119.649,34.4631],[-119.287,34.4779],[-119.996,34.7363],[-119.631,34.5302],[-119.999,34.8195],[-119.711,34.4734],[-119.998,34.7364],[-119.71,34.4733],[-119.664,34.4683],[-119.134,34.4499],[-119.714,34.4722],[-119.591,34.4621],[-119.653,34.4617],[-119.677,34.4558],[-119.733,34.4523],[-119.772,34.5575],[-119.743,34.4803],[-119.681,34.4823],[-119.784,34.4323],[-119.743,34.4804],[-119.71,34.473],[-119.769,34.5523],[-119.591,34.4622],[-119.725,34.476],[-119.638,34.4968],[-119.771,34.5588],[-119.743,34.4802],[-119.53,34.4873],[-119.641,34.4628],[-119.712,34.4727],[-119.742,34.4812],[-119.638,34.4967],[-119.782,34.5503],[-119.787,34.546],[-119.771,34.5574],[-119.742,34.4797],[-119.633,34.5148],[-119.65,34.4634],[-119.592,34.4715],[-119.77,34.5621],[-119.771,34.5589],[-119.771,34.5586],[-119.592,34.4717],[-119.627,34.5256],[-119.72,34.4747],[-119.688,34.4691],[-119.742,34.4814],[-119.723,34.4756],[-119.568,34.5034],[-119.629,34.5119],[-119.735,34.4495],[-119.593,34.4589],[-119.557,34.4971],[-119.727,34.4737]];
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