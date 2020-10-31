var subSightings = [[-119.729,34.4574],[-119.729,34.4544],[-119.671,34.5207],[-119.635,34.4604],[-119.729,34.4554],[-120.232,34.4798],[-119.688,34.4664],[-119.771,34.544],[-119.634,34.4584],[-120.223,34.4961],[-119.728,34.4581],[-119.728,34.459],[-119.729,34.4558],[-119.631,34.5198],[-119.758,34.5186],[-119.725,34.4756],[-119.757,34.5108],[-119.671,34.5204],[-119.732,34.4541],[-119.725,34.4762],[-119.741,34.4288],[-119.634,34.4587],[-119.725,34.4755],[-120.205,34.4931],[-119.511,34.4213],[-119.729,34.4559],[-119.732,34.4538],[-119.639,34.4615],[-119.736,34.4661],[-119.729,34.4555],[-119.77,34.5436],[-119.728,34.4569],[-119.688,34.4528],[-119.728,34.4589],[-119.732,34.4542],[-120.231,34.4759],[-119.728,34.458],[-120.232,34.4799],[-119.729,34.456],[-120.237,34.4885],[-120.233,34.4802],[-119.729,34.4565],[-119.732,34.4533],[-119.729,34.4573],[-119.688,34.4756],[-119.671,34.5209],[-119.717,34.4725]];
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