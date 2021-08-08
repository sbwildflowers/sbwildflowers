var subSightings = [[-119.835,34.4251],[-119.833,34.4174],[-119.692,34.4488],[-119.806,34.4255],[-119.812,34.5044],[-119.402,34.4987],[-119.633,34.515],[-119.751,34.4354],[-119.77,34.5612],[-119.579,34.4159],[-119.666,34.4176],[-119.882,34.4128],[-119.882,34.4129],[-119.629,34.5123],[-119.882,34.413],[-119.691,34.4492],[-119.76,34.5665],[-119.77,34.5608],[-119.761,34.5391],[-119.691,34.4491],[-119.633,34.4229],[-119.487,34.3844],[-119.692,34.449],[-119.63,34.5299],[-119.771,34.5606],[-119.755,34.5733],[-119.881,34.4129],[-119.627,34.5227],[-119.632,34.5177],[-119.606,34.507],[-119.402,34.4988],[-119.811,34.4248],[-119.811,34.4251],[-119.81,34.4251],[-119.634,34.4229],[-119.811,34.4249],[-119.691,34.449],[-119.605,34.4309],[-119.833,34.4175]];
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