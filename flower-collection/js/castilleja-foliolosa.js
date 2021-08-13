var subSightings = [[-119.513,34.4866],[-119.75,34.5217],[-119.744,34.5867],[-119.701,34.4868],[-119.634,34.4969],[-119.702,34.475],[-119.888,34.7749],[-119.255,34.4846],[-119.215,34.4825],[-119.755,34.5728],[-119.874,34.7718],[-119.873,34.7728],[-119.643,34.466],[-119.755,34.5756],[-119.642,34.4718],[-119.75,34.5189],[-119.644,34.4683],[-119.643,34.4667],[-119.668,34.5065],[-119.642,34.4713],[-119.754,34.5216],[-119.642,34.4701],[-119.714,34.4947],[-119.701,34.4882],[-119.72,34.4744],[-119.643,34.4679],[-119.751,34.52],[-119.643,34.4615],[-119.751,34.5189],[-119.642,34.4719],[-119.642,34.4703],[-119.644,34.4641],[-119.763,34.5651],[-119.998,34.5301],[-119.744,34.5865],[-119.643,34.4662],[-119.702,34.4747],[-119.751,34.5205],[-119.749,34.5196],[-119.643,34.4668],[-119.75,34.5184],[-119.648,34.4613],[-119.564,34.4875],[-119.834,34.5293],[-119.643,34.4616],[-119.644,34.465],[-119.698,34.4828],[-119.645,34.4642],[-119.75,34.5201],[-119.809,34.512],[-119.643,34.4704],[-119.701,34.4861],[-119.642,34.4714],[-119.752,34.5199],[-119.701,34.4865],[-119.642,34.47],[-119.643,34.4613],[-119.701,34.4866],[-119.644,34.4645],[-119.643,34.4614],[-119.644,34.4648],[-119.743,34.5866],[-119.698,34.4829],[-120.028,34.5332],[-119.645,34.4692],[-119.643,34.4666],[-119.645,34.4691],[-120.076,34.5206],[-119.701,34.4867],[-119.643,34.4669],[-119.634,34.4968],[-119.701,34.4879],[-119.763,34.5653],[-119.641,34.4717],[-119.746,34.4852],[-119.642,34.4716],[-119.641,34.4718],[-119.644,34.4681],[-119.869,34.7729],[-119.701,34.4863],[-119.751,34.5217],[-119.648,34.4612],[-119.763,34.5652],[-119.754,34.522],[-119.75,34.5186],[-119.643,34.4672],[-119.755,34.5764],[-119.752,34.5196],[-119.644,34.4684],[-119.643,34.4681],[-119.763,34.5649],[-119.643,34.4677],[-119.643,34.467],[-119.751,34.5202],[-119.75,34.5206],[-119.769,34.5081],[-119.216,34.4836],[-119.643,34.4656],[-119.643,34.4647],[-119.75,34.5185],[-119.754,34.5754],[-119.642,34.4715],[-119.641,34.4716],[-119.642,34.4717],[-119.643,34.4617],[-119.78,34.5571],[-119.763,34.5655],[-119.755,34.5766],[-119.755,34.5765],[-119.751,34.5204],[-119.78,34.557],[-119.584,34.4753],[-119.701,34.4873],[-119.512,34.4867],[-119.743,34.5867],[-119.756,34.5728],[-119.746,34.4853],[-119.702,34.4748],[-119.754,34.5221],[-119.644,34.4649],[-119.643,34.468],[-119.644,34.464],[-119.744,34.5866],[-119.701,34.4862],[-119.754,34.5225]];
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