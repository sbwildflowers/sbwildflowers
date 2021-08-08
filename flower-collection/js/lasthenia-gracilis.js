var subSightings = [[-120.105,34.6899],[-120.06,34.7563],[-119.929,34.7666],[-120.05,34.7472],[-120.059,34.7529],[-119.612,34.4965],[-119.612,34.496],[-120.058,34.7409],[-120.054,34.7516],[-120.068,34.7596],[-120.051,34.7441],[-118.996,34.1119],[-120.014,34.7398],[-119.61,34.5013],[-119.612,34.4958],[-120.044,34.7429],[-119.928,34.7664],[-119.612,34.4961],[-120.057,34.751],[-120.052,34.7526],[-119.981,34.7955],[-120.057,34.753],[-119.612,34.4959],[-119.751,34.5734],[-119.981,34.791],[-119.75,34.5735],[-120,34.7372],[-119.981,34.7956],[-119.75,34.5734],[-120.05,34.747],[-120.068,34.7594],[-119.981,34.7921],[-119.613,34.4958],[-120.013,34.7401],[-119.61,34.5012],[-120.043,34.7429],[-120.015,34.7398],[-120,34.737],[-120.033,34.7432],[-120.05,34.7473],[-119.612,34.4957],[-120.013,34.7402],[-120.044,34.743],[-119.613,34.4955],[-119.613,34.4957],[-120.052,34.7529],[-120.064,34.7595],[-120.05,34.7471],[-119.928,34.7665],[-119.612,34.4963],[-120.014,34.74],[-120.057,34.754],[-119.612,34.4962],[-120.058,34.7418],[-120.053,34.7517]];
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