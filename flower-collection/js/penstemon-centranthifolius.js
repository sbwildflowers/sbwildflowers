var subSightings = [[-119.771,34.5605],[-119.445,34.4765],[-119.606,34.5065],[-119.245,34.5367],[-119.635,34.5393],[-119.781,34.5507],[-119.724,34.5912],[-119.987,34.8028],[-119.606,34.5067],[-119.637,34.542],[-119.147,34.7231],[-119.455,34.4765],[-119.628,34.5318],[-119.606,34.5068],[-119.77,34.5605],[-120.005,34.8029],[-119.621,34.5364],[-119.259,34.575],[-119.606,34.5064],[-119.963,34.7819],[-119.771,34.5604],[-119.752,34.6119],[-119.606,34.5062],[-119.891,34.753],[-119.748,34.601],[-119.77,34.5606],[-119.155,34.7272],[-119.321,34.5965],[-119.147,34.7243],[-119.723,34.591],[-119.972,34.7879],[-119.163,34.7281],[-119.626,34.5342],[-119.77,34.5611],[-119.452,34.4764],[-119.372,34.6162],[-119.75,34.6075],[-119.32,34.6955],[-119.771,34.5603],[-119.372,34.6168],[-119.999,34.8003],[-119.763,34.5377],[-119.606,34.5063],[-119.769,34.5522],[-119.875,34.7719],[-119.146,34.7234],[-119.606,34.5066],[-119.907,34.7989],[-119.628,34.5314],[-119.62,34.5367],[-119.961,34.7808],[-119.384,34.5085],[-119.752,34.612],[-119.991,34.802],[-119.936,34.7695],[-119.75,34.6076],[-119.781,34.5506],[-119.962,34.7818],[-120,34.8009],[-119.771,34.5606],[-119.449,34.4762],[-119.75,34.6077]];
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