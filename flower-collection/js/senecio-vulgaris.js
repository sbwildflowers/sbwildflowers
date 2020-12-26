var subSightings = [[-119.903,34.5204],[-119.737,34.4266],[-119.722,34.4755],[-119.718,34.4726],[-119.66,34.4707],[-119.742,34.4814],[-119.638,34.479],[-119.64,34.4633],[-119.769,34.5632],[-119.747,34.486],[-119.643,34.4524],[-119.637,34.478],[-119.742,34.4796],[-119.785,34.5567],[-119.663,34.4661],[-119.611,34.4957],[-119.594,34.4725],[-119.742,34.4797],[-119.644,34.4647],[-119.653,34.4509],[-119.73,34.4621],[-119.642,34.4532],[-119.637,34.4781],[-119.592,34.4748],[-119.642,34.5139],[-119.699,34.4766],[-119.605,34.4552],[-119.804,34.4246],[-119.764,34.4117],[-119.738,34.4267],[-119.644,34.4641],[-119.644,34.4646],[-119.594,34.4914],[-119.751,34.5029],[-119.642,34.453],[-119.65,34.4613],[-119.73,34.4622],[-119.73,34.4629],[-119.745,34.4849],[-119.736,34.4677],[-119.78,34.5583],[-119.752,34.5117],[-119.749,34.4995],[-119.499,34.3862],[-119.247,34.4683],[-119.737,34.468],[-119.67,34.4546],[-119.645,34.4639],[-119.232,34.4662],[-119.642,34.5141],[-119.714,34.4723],[-119.738,34.4221],[-119.642,34.4529],[-119.623,34.4686],[-119.644,34.4643],[-119.499,34.3864],[-119.738,34.4227],[-119.688,34.4653],[-119.705,34.4723],[-119.663,34.466],[-119.749,34.5591],[-119.902,34.5206],[-119.651,34.4777],[-119.611,34.4501],[-119.678,34.4559],[-119.65,34.4611],[-119.738,34.469],[-119.589,34.4861],[-119.624,34.4633],[-119.736,34.4264],[-119.834,34.5293],[-119.786,34.553],[-119.592,34.4564],[-119.605,34.4547],[-119.685,34.4544],[-119.685,34.4542],[-119.743,34.4826],[-119.65,34.4612],[-119.73,34.4625],[-119.744,34.5226],[-119.663,34.4673],[-119.733,34.4286],[-119.637,34.4782],[-119.712,34.4727],[-119.732,34.4285],[-119.643,34.4522],[-119.709,34.4728],[-119.744,34.4838],[-119.644,34.464],[-119.653,34.4569],[-119.729,34.4719],[-119.591,34.4635],[-119.224,34.4737],[-119.874,34.7723],[-119.703,34.4725],[-119.651,34.4639],[-119.749,34.4999],[-119.688,34.4687],[-119.642,34.4527],[-119.691,34.4679],[-119.227,34.4653],[-119.244,34.4662],[-119.628,34.4715],[-119.642,34.5142],[-119.715,34.4723],[-119.729,34.4554],[-119.642,34.514],[-119.644,34.4638],[-119.69,34.4763],[-119.639,34.4612],[-119.644,34.4637],[-119.703,34.4743]];
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