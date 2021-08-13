var subSightings = [[-119.8,34.4188],[-119.8,34.4187],[-119.836,34.4162],[-119.733,34.4669],[-119.642,34.4532],[-119.643,34.4649],[-119.71,34.4668],[-119.328,34.287],[-119.74,34.4209],[-119.593,34.4728],[-119.724,34.4758],[-119.589,34.4552],[-119.705,34.4721],[-120.239,34.4944],[-119.396,34.3253],[-119.643,34.4648],[-119.659,34.4749],[-119.513,34.4169],[-119.487,34.3844],[-119.586,34.4701],[-119.685,34.414],[-119.802,34.4192],[-119.72,34.4749],[-119.757,34.5689],[-119.798,34.4183],[-119.718,34.4736],[-119.502,34.4357],[-119.653,34.4573],[-119.796,34.4187],[-119.797,34.4188],[-119.651,34.4561],[-119.787,34.421],[-119.63,34.5131],[-119.675,34.4553],[-119.787,34.4213],[-119.651,34.4562],[-119.734,34.4268],[-119.512,34.4192],[-119.798,34.4185],[-119.315,34.2799],[-119.731,34.4688],[-119.627,34.5221],[-119.67,34.4549],[-119.357,34.3109],[-119.732,34.4283],[-119.729,34.4725],[-119.384,34.5079],[-119.724,34.4769],[-119.702,34.4852],[-119.651,34.456],[-119.722,34.4755],[-119.629,34.5291],[-119.654,34.4578],[-119.77,34.5606],[-119.664,34.4538],[-119.598,34.4647],[-119.725,34.4757],[-119.787,34.4201],[-119.786,34.5526],[-119.598,34.4648],[-119.712,34.4653],[-119.729,34.4544],[-119.845,34.4066],[-119.628,34.4539],[-119.732,34.4669],[-119.83,34.4187],[-119.651,34.4564],[-119.73,34.4277],[-119.65,34.4563],[-119.649,34.4594],[-119.815,34.5433],[-119.683,34.4538],[-119.626,34.5344],[-119.709,34.4731],[-119.512,34.4189],[-119.885,34.415],[-119.726,34.4757],[-119.718,34.4726],[-119.746,34.4856],[-119.787,34.4203],[-119.629,34.4536],[-119.748,34.4984],[-119.644,34.4644],[-119.63,34.4771],[-119.642,34.4529],[-119.68,34.4781],[-119.631,34.453],[-119.732,34.4282],[-119.631,34.5199],[-119.315,34.2828],[-119.8,34.4184],[-119.72,34.4748],[-119.509,34.4241],[-119.797,34.4238],[-119.732,34.4281],[-119.782,34.5506],[-119.689,34.464],[-119.727,34.4744],[-119.721,34.4753],[-119.848,34.4069],[-119.846,34.4062],[-119.742,34.4784],[-119.424,34.3505],[-119.739,34.4058],[-119.729,34.4724],[-119.74,34.4075],[-119.631,34.5128],[-119.739,34.4061],[-119.846,34.4061],[-119.724,34.4762],[-119.698,34.471],[-119.733,34.4269],[-119.591,34.4555],[-119.731,34.4274],[-119.63,34.5292],[-119.721,34.4754],[-119.799,34.4186],[-119.708,34.4729],[-119.654,34.4572],[-119.73,34.4524],[-119.767,34.5644],[-119.63,34.4772],[-119.628,34.5216],[-119.735,34.4649],[-119.845,34.406],[-119.644,34.4649],[-119.629,34.512],[-119.672,34.5012],[-119.732,34.4287],[-119.788,34.5458],[-119.352,34.3069]];
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