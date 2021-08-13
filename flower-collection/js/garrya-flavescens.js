var subSightings = [[-119.698,34.4993],[-119.698,34.4999],[-119.576,34.4748],[-119.638,34.4865],[-119.75,34.6035],[-119.639,34.4852],[-119.735,34.6053],[-119.698,34.5004],[-119.699,34.4927],[-119.572,34.4739],[-119.638,34.4866],[-119.698,34.5003],[-119.748,34.6147],[-119.636,34.486],[-119.696,34.5007],[-119.75,34.6022],[-119.699,34.4928],[-119.746,34.5929],[-119.637,34.4872],[-119.75,34.5006],[-119.637,34.4869],[-119.733,34.614],[-119.748,34.6139],[-119.732,34.5976],[-119.751,34.6118],[-119.75,34.6025],[-119.693,34.5051],[-119.691,34.4886],[-119.575,34.4744],[-119.699,34.4987],[-119.575,34.4748],[-119.694,34.5003],[-119.695,34.5024],[-119.699,34.4918],[-119.573,34.474],[-119.738,34.5986],[-119.751,34.6019],[-119.753,34.5727],[-119.575,34.4747],[-119.637,34.487],[-119.574,34.4739],[-120.032,34.5339],[-119.639,34.4854],[-119.732,34.6108],[-119.699,34.4986],[-119.573,34.4744],[-119.752,34.6114],[-119.639,34.4845],[-119.752,34.6012],[-119.699,34.4911],[-119.751,34.602],[-119.574,34.474],[-119.7,34.4981],[-119.698,34.5005],[-119.699,34.4988],[-119.639,34.4853],[-119.699,34.491],[-120.032,34.534],[-119.748,34.499],[-119.699,34.495],[-119.751,34.6017],[-119.699,34.4912]];
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