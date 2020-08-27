var subSightings = [[-119.623,34.4579],[-119.637,34.4978],[-119.634,34.5041],[-119.636,34.4876],[-119.587,34.4786],[-119.751,34.5022],[-119.751,34.502],[-119.636,34.4877],[-119.635,34.4878],[-119.755,34.5123],[-119.635,34.4876],[-119.609,34.5038],[-119.587,34.4818],[-119.609,34.5039],[-119.751,34.6017],[-119.635,34.4869],[-119.635,34.4868],[-119.623,34.4581],[-119.633,34.5063],[-119.581,34.4905],[-119.638,34.4972],[-119.586,34.4787],[-119.637,34.497],[-119.636,34.4874],[-119.241,34.5419],[-119.638,34.497],[-119.751,34.5021],[-119.588,34.484],[-119.604,34.4934],[-119.586,34.4788],[-119.624,34.4624],[-119.757,34.5135],[-119.586,34.4789],[-119.751,34.5019],[-119.592,34.4917],[-119.636,34.4875],[-119.634,34.5042],[-119.688,34.4655],[-119.586,34.4798],[-119.751,34.5017],[-119.637,34.4971],[-119.636,34.4868],[-119.136,34.4521],[-119.136,34.452],[-119.757,34.5156],[-119.637,34.4975],[-119.604,34.4932],[-119.586,34.4791],[-119.586,34.4799],[-119.73,34.4612],[-119.634,34.5169],[-119.69,34.4637],[-119.587,34.4821],[-119.624,34.4622],[-119.73,34.4611],[-120.044,34.5353],[-119.635,34.487],[-119.592,34.4916],[-119.604,34.4933],[-119.758,34.5137],[-119.73,34.4613],[-119.586,34.479],[-119.742,34.5226],[-119.638,34.4971],[-119.688,34.4651],[-119.76,34.5204],[-119.636,34.4869],[-119.757,34.5137],[-119.637,34.4972],[-119.689,34.4726],[-119.731,34.4617],[-119.76,34.5206],[-119.755,34.5121],[-119.587,34.4787]];
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