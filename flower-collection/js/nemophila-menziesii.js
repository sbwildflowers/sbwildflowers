var subSightings = [[-119.786,34.5494],[-119.566,34.4782],[-119.761,34.566],[-119.756,34.5102],[-119.611,34.4998],[-119.636,34.4928],[-119.636,34.4926],[-119.752,34.5281],[-119.636,34.4935],[-119.765,34.5648],[-119.757,34.51],[-119.611,34.4997],[-119.756,34.5103],[-119.65,34.4612],[-119.565,34.4795],[-119.636,34.4927],[-119.636,34.4932],[-119.955,34.5402],[-119.606,34.4942],[-119.598,34.4941],[-119.758,34.5186],[-119.636,34.4953],[-119.234,34.5041],[-119.636,34.4933],[-119.757,34.5097],[-119.749,34.6124],[-119.621,34.4943],[-119.761,34.5658],[-119.975,34.7474],[-119.958,34.5376],[-119.246,34.47],[-119.636,34.4952],[-119.757,34.5162],[-119.636,34.4934],[-119.611,34.5002],[-119.594,34.4913],[-119.234,34.5039],[-119.757,34.5102],[-119.757,34.5157],[-119.757,34.5099],[-119.748,34.5998],[-119.762,34.5661],[-119.757,34.5178],[-119.756,34.5101],[-119.56,34.4864],[-119.234,34.5038],[-119.636,34.4931],[-119.757,34.5098],[-119.611,34.5003],[-119.611,34.5001],[-119.637,34.4926],[-119.757,34.5175],[-119.606,34.4941],[-119.636,34.4929],[-119.598,34.4939],[-119.757,34.5176],[-119.636,34.493],[-119.757,34.5177],[-119.637,34.4928],[-119.679,34.4984],[-119.786,34.5513],[-119.749,34.6122],[-119.749,34.6003],[-119.637,34.4931],[-119.679,34.4982],[-119.568,34.4776],[-119.611,34.4999],[-119.786,34.5503],[-119.621,34.4941],[-119.631,34.5089],[-119.573,34.4744],[-119.565,34.4796],[-119.752,34.5282],[-119.565,34.4797],[-119.786,34.5516]];
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