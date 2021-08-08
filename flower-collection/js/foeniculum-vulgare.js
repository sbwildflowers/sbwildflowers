var subSightings = [[-119.728,34.4579],[-120.226,34.5],[-119.627,34.4578],[-119.792,34.4183],[-119.763,34.5412],[-119.639,34.4843],[-119.623,34.4681],[-119.587,34.4697],[-119.588,34.463],[-119.762,34.5399],[-119.745,34.4928],[-119.793,34.4184],[-119.79,34.4196],[-119.792,34.5152],[-119.641,34.4538],[-119.8,34.4194],[-119.595,34.4923],[-120.232,34.4778],[-119.678,34.4722],[-120.057,34.5354],[-119.723,34.5387],[-119.619,34.482],[-119.796,34.4205],[-119.639,34.4841],[-119.644,34.4595],[-119.649,34.4738],[-119.635,34.4585],[-119.639,34.4845],[-119.775,34.5445],[-119.639,34.4576],[-119.592,34.4915],[-120.222,34.5021],[-119.591,34.4555],[-119.592,34.4916],[-119.639,34.484],[-119.599,34.4565],[-119.315,34.2799],[-119.654,34.4586],[-119.596,34.4679],[-119.629,34.4576],[-119.268,34.474],[-119.004,34.0953],[-120.031,34.464],[-119.907,34.52],[-119.661,34.466],[-119.662,34.4661],[-119.639,34.459],[-119.639,34.4842],[-119.651,34.4642],[-119.752,34.5046],[-119.728,34.4588],[-119.29,34.4785],[-119.223,34.4896],[-119.611,34.4509],[-119.625,34.4579],[-119.865,34.5062],[-119.638,34.4603]];
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