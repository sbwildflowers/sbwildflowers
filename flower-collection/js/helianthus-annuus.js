var subSightings = [[-119.627,34.5223],[-119.63,34.5223],[-119.631,34.5198],[-119.682,34.4819],[-119.626,34.5236],[-119.627,34.5237],[-119.63,34.5225],[-119.629,34.523],[-119.627,34.5263],[-119.631,34.5193],[-119.629,34.5225],[-119.631,34.5199],[-119.628,34.5235],[-119.631,34.5212],[-119.629,34.5271],[-119.629,34.5273],[-119.771,34.4346],[-119.627,34.526],[-119.627,34.5238],[-119.631,34.5218],[-119.627,34.5243],[-119.626,34.5237],[-119.631,34.5204],[-119.629,34.5274],[-119.63,34.5212],[-119.628,34.5242],[-119.627,34.5221],[-119.63,34.5285],[-119.631,34.5301],[-119.631,34.5205],[-119.627,34.5252],[-119.631,34.5201],[-119.63,34.5293],[-119.631,34.5203],[-119.627,34.5251],[-119.628,34.5267],[-119.627,34.5241],[-119.631,34.5202],[-119.628,34.5219]];
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