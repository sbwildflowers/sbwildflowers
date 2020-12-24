var subSightings = [[-119.756,34.5129],[-119.766,34.6307],[-119.817,34.529],[-119.653,34.4569],[-119.632,34.5076],[-119.636,34.4949],[-119.681,34.4968],[-119.649,34.463],[-119.634,34.5048],[-119.636,34.4862],[-119.586,34.4796],[-119.659,34.4651],[-119.76,34.5227],[-119.601,34.4938],[-119.628,34.5278],[-119.623,34.4556],[-119.639,34.4572],[-119.653,34.4561],[-119.768,34.5633],[-119.768,34.5632],[-119.65,34.4654],[-119.58,34.49],[-119.639,34.5112],[-119.606,34.5066],[-119.636,34.4909],[-119.594,34.4915],[-119.576,34.4885],[-119.698,34.501],[-119.758,34.5187],[-119.638,34.4971],[-119.755,34.5193],[-119.637,34.497],[-119.681,34.4969],[-119.75,34.6071],[-119.596,34.4936],[-119.59,34.4695],[-119.728,34.4596],[-119.645,34.5148],[-119.755,34.5081],[-119.728,34.4735],[-119.602,34.4934],[-119.634,34.5099],[-119.62,34.5391],[-119.637,34.4977],[-119.671,34.5193],[-119.756,34.5113],[-119.758,34.5136],[-119.63,34.5116],[-119.762,34.5662],[-119.634,34.5041],[-119.632,34.5072],[-119.632,34.5147],[-119.628,34.5217],[-119.591,34.4603],[-119.619,34.4941],[-119.766,34.631],[-119.637,34.4975],[-119.654,34.4588],[-119.651,34.4637],[-119.636,34.4873],[-119.625,34.4954],[-119.654,34.4596],[-119.631,34.53],[-119.7,34.4971],[-119.6,34.4651],[-119.757,34.515],[-119.757,34.5151],[-119.755,34.5294],[-119.653,34.4614],[-119.591,34.4636],[-119.651,34.4639],[-119.65,34.4637]];
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