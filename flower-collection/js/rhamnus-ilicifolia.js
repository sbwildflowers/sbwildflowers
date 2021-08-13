var subSightings = [[-119.695,34.5075],[-119.76,34.5215],[-119.639,34.4757],[-119.742,34.479],[-119.744,34.4844],[-119.635,34.4996],[-119.655,34.5239],[-119.774,34.629],[-119.592,34.4752],[-119.569,34.4708],[-119.566,34.4842],[-120.038,34.5315],[-119.755,34.5083],[-119.64,34.473],[-119.732,34.4532],[-119.749,34.4876],[-119.639,34.4828],[-119.225,34.4962],[-119.635,34.501],[-119.253,34.4939],[-120.036,34.5304],[-119.699,34.4921],[-119.957,34.5315],[-119.254,34.4664],[-120.022,34.5336],[-119.634,34.5006],[-120.009,34.7618],[-119.748,34.6148],[-119.634,34.4999],[-119.743,34.4821],[-119.763,34.6316],[-119.72,34.4747],[-119.59,34.4746],[-119.744,34.5896],[-120.036,34.5303],[-119.749,34.4989],[-119.746,34.4946],[-119.642,34.4701],[-119.592,34.4749],[-119.383,34.51],[-119.701,34.4727],[-119.626,34.4713],[-119.639,34.4756],[-119.751,34.5022],[-120.01,34.7604],[-120.01,34.5291],[-119.65,34.4635],[-119.223,34.4917],[-119.585,34.4792],[-119.729,34.4608],[-119.637,34.4958],[-119.919,34.5236],[-120.026,34.5335],[-120.052,34.7532],[-119.644,34.4632],[-119.638,34.4796],[-119.746,34.4947],[-119.638,34.4759],[-119.286,34.4781],[-119.729,34.4609],[-119.638,34.4821],[-119.575,34.4747],[-119.219,34.4821],[-120.009,34.5291],[-119.717,34.4866],[-119.59,34.4752],[-119.697,34.4816],[-119.769,34.5532],[-119.759,34.5676],[-119.7,34.4778],[-119.589,34.4748],[-119.638,34.4824],[-119.637,34.4874],[-119.76,34.5382],[-119.761,34.5376],[-119.134,34.4498],[-119.592,34.4751],[-119.639,34.4837],[-119.638,34.4763],[-119.592,34.475],[-119.636,34.4859],[-119.759,34.5378],[-119.69,34.4763],[-119.746,34.4949],[-119.745,34.493],[-119.635,34.5009],[-119.682,34.4755],[-119.757,34.514],[-119.637,34.4875],[-119.785,34.5566],[-119.586,34.4792],[-119.589,34.4744],[-119.743,34.4822],[-119.76,34.5223],[-120.002,34.7435],[-119.586,34.4915],[-119.748,34.4976],[-119.755,34.5098],[-119.633,34.4782],[-119.652,34.4565],[-119.725,34.4759],[-119.745,34.4932],[-119.745,34.4929],[-119.644,34.4625],[-119.753,34.5988],[-119.636,34.5016],[-119.761,34.5385],[-119.702,34.4743],[-119.756,34.5724],[-119.753,34.599],[-119.75,34.5012],[-119.727,34.4736],[-119.636,34.4898],[-119.748,34.4989],[-119.689,34.4731],[-119.745,34.4928],[-119.744,34.4845],[-119.588,34.4832],[-119.746,34.4945],[-119.748,34.498],[-119.698,34.4783],[-119.702,34.4855],[-119.638,34.4826],[-119.699,34.4765],[-119.752,34.6011],[-119.638,34.4827],[-119.75,34.5016],[-119.746,34.4943],[-119.625,34.4721],[-119.688,34.4757],[-119.638,34.4861],[-119.634,34.5003],[-119.589,34.4745],[-119.634,34.5005],[-119.623,34.4948],[-119.635,34.4985],[-119.957,34.5359],[-119.217,34.48],[-119.225,34.4935],[-119.758,34.5337],[-119.634,34.5],[-119.749,34.499],[-119.274,34.4746],[-119.638,34.4855],[-119.749,34.4995],[-119.751,34.502],[-119.635,34.5005],[-119.688,34.4691],[-119.224,34.4911],[-119.773,34.5462],[-119.762,34.566],[-119.75,34.5963],[-119.642,34.4702],[-119.592,34.4706],[-119.757,34.5143],[-119.72,34.4746],[-120.213,34.5033],[-119.247,34.4701],[-119.759,34.5377],[-119.753,34.6004],[-119.645,34.4609],[-119.706,34.4697],[-119.291,34.4787],[-119.644,34.4626],[-119.634,34.4828],[-119.638,34.4797],[-119.633,34.5156],[-119.636,34.4907],[-119.751,34.5023],[-119.905,34.7639],[-119.588,34.4782],[-119.626,34.4714],[-119.746,34.4962],[-119.756,34.5726],[-119.743,34.4824],[-119.637,34.4773],[-119.636,34.4897],[-119.753,34.5982],[-119.639,34.4754],[-119.635,34.4983],[-119.223,34.4904],[-119.638,34.4768]];
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