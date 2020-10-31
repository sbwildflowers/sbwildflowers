var subSightings = [[-119.67,34.5196],[-119.636,34.486],[-119.649,34.4598],[-119.29,34.4787],[-119.639,34.474],[-119.746,34.4959],[-119.757,34.5712],[-119.757,34.5143],[-119.587,34.48],[-119.578,34.4745],[-119.641,34.4715],[-119.372,34.673],[-119.75,34.6037],[-119.787,34.5481],[-119.245,34.5359],[-120.053,34.7563],[-119.77,34.5515],[-119.768,34.5639],[-119.639,34.4738],[-119.644,34.4641],[-119.29,34.4784],[-119.631,34.5107],[-119.746,34.4945],[-119.63,34.5113],[-119.259,34.5752],[-119.589,34.4698],[-119.745,34.4933],[-119.638,34.4865],[-119.632,34.5147],[-119.759,34.5673],[-119.75,34.4992],[-119.749,34.6037],[-119.631,34.5086],[-119.787,34.5496],[-119.585,34.4793],[-119.277,34.5222],[-119.32,34.6956],[-119.746,34.4947],[-119.637,34.495],[-119.29,34.4785],[-119.68,34.497],[-119.291,34.4785],[-119.769,34.5502]];
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