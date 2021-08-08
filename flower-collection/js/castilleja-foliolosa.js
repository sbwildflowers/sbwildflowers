var subSightings = [[-119.701,34.4879],[-119.564,34.4875],[-119.744,34.5865],[-119.752,34.5196],[-119.643,34.4656],[-119.834,34.5293],[-119.645,34.4691],[-119.643,34.4647],[-119.584,34.4753],[-119.746,34.4852],[-119.643,34.4681],[-119.643,34.4614],[-119.642,34.4714],[-119.634,34.4969],[-119.701,34.4868],[-119.642,34.4719],[-119.888,34.7749],[-119.751,34.5189],[-119.754,34.5216],[-119.643,34.4704],[-119.643,34.4677],[-119.643,34.466],[-120.076,34.5206],[-119.754,34.5221],[-119.754,34.5225],[-119.702,34.4747],[-119.755,34.5766],[-120.028,34.5332],[-119.72,34.4744],[-119.644,34.4645],[-119.809,34.512],[-119.769,34.5081],[-119.702,34.475],[-119.763,34.5653],[-119.75,34.5186],[-119.643,34.4616],[-119.644,34.464],[-119.755,34.5728],[-119.668,34.5065],[-119.641,34.4716],[-119.216,34.4836],[-119.634,34.4968],[-119.643,34.4615],[-119.756,34.5728],[-119.743,34.5866],[-119.643,34.4669],[-119.255,34.4846],[-119.751,34.5202],[-119.702,34.4748],[-119.643,34.4617],[-119.642,34.4713],[-119.78,34.5571],[-119.751,34.5217],[-119.714,34.4947],[-119.75,34.5201],[-119.701,34.4866],[-119.752,34.5199],[-119.642,34.4716],[-119.75,34.5184],[-119.873,34.7728],[-119.701,34.4862],[-119.513,34.4866],[-119.644,34.4683],[-119.645,34.4692],[-119.744,34.5867],[-119.643,34.4667],[-119.215,34.4825],[-119.642,34.4718],[-119.755,34.5756],[-119.763,34.5649],[-119.751,34.5205],[-119.643,34.4668],[-119.643,34.4662],[-119.75,34.5189],[-119.644,34.4649],[-119.754,34.522],[-119.701,34.4873],[-119.701,34.4865],[-119.698,34.4828],[-119.644,34.4641],[-119.763,34.5655],[-119.642,34.4715],[-119.78,34.557],[-119.644,34.4648],[-119.698,34.4829],[-119.755,34.5765],[-119.644,34.4684],[-119.75,34.5185],[-119.869,34.7729],[-119.701,34.4863],[-119.701,34.4867],[-119.641,34.4717],[-119.701,34.4861],[-119.75,34.5217],[-119.643,34.4666],[-119.75,34.5206],[-119.755,34.5764],[-119.643,34.4613],[-119.751,34.5204],[-119.643,34.4679],[-119.744,34.5866],[-119.642,34.4703],[-119.998,34.5301],[-119.641,34.4718],[-119.642,34.4701],[-119.648,34.4613],[-119.648,34.4612],[-119.644,34.465],[-119.743,34.5867],[-119.645,34.4642],[-119.644,34.4681],[-119.749,34.5196],[-119.642,34.47],[-119.763,34.5652],[-119.643,34.4672],[-119.643,34.467],[-119.643,34.468],[-119.746,34.4853],[-119.874,34.7718],[-119.512,34.4867],[-119.763,34.5651],[-119.642,34.4717],[-119.751,34.52],[-119.701,34.4882],[-119.754,34.5754]];
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