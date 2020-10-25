var subSightings = [[-119.788,34.4182],[-119.8,34.4223],[-119.773,34.4363],[-119.788,34.421],[-119.8,34.4263],[-119.844,34.4068],[-119.8,34.42],[-119.794,34.42],[-119.825,34.4221],[-119.802,34.4229],[-119.79,34.418],[-119.8,34.4196],[-119.798,34.4202],[-119.846,34.4384],[-119.826,34.4225],[-119.802,34.4224],[-119.788,34.4208],[-119.788,34.4185],[-119.788,34.4239],[-119.788,34.4219],[-119.879,34.4254],[-119.844,34.4069],[-119.795,34.4205],[-119.8,34.4199],[-119.799,34.4205],[-119.8,34.4211],[-119.8,34.4201],[-119.793,34.4291],[-119.802,34.4223],[-119.8,34.4197],[-119.88,34.4251],[-119.794,34.4187],[-119.8,34.4212],[-119.8,34.4198],[-119.788,34.4212],[-119.798,34.4204],[-119.794,34.4198],[-119.787,34.4216],[-119.793,34.4292],[-119.879,34.4253],[-119.788,34.4216],[-119.802,34.423],[-119.8,34.4193],[-119.799,34.4204],[-119.844,34.407],[-119.795,34.4204],[-119.788,34.4242],[-119.787,34.4195],[-119.799,34.4201],[-119.8,34.4209],[-119.788,34.4217]];
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