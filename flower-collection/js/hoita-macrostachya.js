var subSightings = [[-119.542,34.4865],[-119.596,34.4932],[-119.725,34.4762],[-119.606,34.4939],[-119.732,34.4668],[-119.598,34.494],[-119.707,34.4727],[-119.427,34.4895],[-119.593,34.4913],[-119.581,34.4905],[-119.597,34.4935],[-119.688,34.519],[-119.541,34.4866],[-119.68,34.4967],[-119.957,34.7794],[-119.732,34.4663],[-119.745,34.4927],[-119.596,34.493],[-119.734,34.4513],[-119.687,34.5174],[-119.595,34.4924],[-119.596,34.4936],[-119.747,34.4903],[-119.681,34.4968],[-119.596,34.4929],[-119.732,34.466],[-119.987,34.803],[-119.595,34.4922],[-119.681,34.4967],[-119.596,34.4933],[-119.681,34.4969],[-119.581,34.4906],[-119.732,34.4653],[-119.38,34.5069],[-119.581,34.4908],[-119.728,34.4612],[-119.591,34.4917],[-119.731,34.466],[-119.732,34.4651],[-119.596,34.4935],[-119.732,34.4669],[-119.383,34.5078],[-119.731,34.4646],[-119.574,34.4878],[-119.745,34.4928],[-119.65,34.4637],[-119.707,34.4728],[-119.588,34.4915],[-119.592,34.4915],[-119.732,34.4652],[-119.686,34.5169],[-119.595,34.4923],[-119.689,34.52],[-119.732,34.467],[-119.733,34.4668],[-119.747,34.4905],[-119.581,34.4907],[-119.745,34.4926],[-119.687,34.5179],[-119.731,34.4655],[-119.733,34.4669],[-119.597,34.4933],[-119.596,34.4928]];
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