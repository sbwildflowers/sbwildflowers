var subSightings = [[-119.645,34.4608],[-120.239,34.4834],[-119.641,34.4728],[-119.783,34.5589],[-120.238,34.4862],[-119.644,34.4627],[-119.572,34.4877],[-119.602,34.4936],[-119.496,34.4779],[-119.897,34.5192],[-119.96,34.5337],[-119.513,34.4877],[-119.782,34.559],[-119.641,34.4727],[-119.644,34.4631],[-120.073,34.5164],[-119.644,34.462],[-119.596,34.493],[-119.697,34.4784],[-119.957,34.5315],[-119.732,34.5769],[-119.649,34.4576],[-119.78,34.5577],[-119.572,34.4743],[-119.501,34.4716],[-119.643,34.4618],[-119.593,34.4718],[-120.201,34.5034],[-119.747,34.4859],[-119.025,34.0877],[-119.754,34.5214],[-119.649,34.4581],[-119.501,34.4717],[-119.954,34.5401],[-120.238,34.4866],[-119.957,34.532],[-120.199,34.5019],[-119.957,34.5306],[-119.756,34.5103],[-119.75,34.5254],[-119.609,34.4549],[-119.575,34.4882],[-119.588,34.4835],[-119.5,34.4736],[-119.712,34.4727],[-119.715,34.4849],[-119.506,34.4545],[-119.592,34.4711],[-118.995,34.1043],[-119.644,34.463],[-119.57,34.4706],[-119.644,34.4628],[-119.234,34.5039],[-119.604,34.4931],[-119.572,34.4744],[-119.644,34.4632],[-119.714,34.4726],[-119.257,34.4782],[-119.612,34.4552],[-120.188,34.5077],[-119.65,34.456],[-119.639,34.473],[-119.649,34.4572],[-119.644,34.4629],[-119.643,34.4616],[-119.596,34.4931],[-119.752,34.5193],[-119.639,34.4727],[-119.642,34.4623],[-119.779,34.5543],[-119.881,34.5111],[-119.593,34.4903],[-119.641,34.4729],[-119.757,34.5124],[-119.586,34.48],[-119.642,34.47],[-119.643,34.4619],[-119.957,34.5308],[-119.588,34.4833],[-120.033,34.7432],[-119.564,34.4858],[-119.608,34.4544],[-119.897,34.5193],[-119.769,34.5075],[-120.076,34.5206],[-119.759,34.5678],[-119.496,34.4777],[-119.779,34.5533],[-119.756,34.5104],[-119.74,34.5531],[-119.6,34.4937],[-119.572,34.4741],[-119.569,34.4706],[-119.569,34.4705],[-119.721,34.4744],[-119.564,34.486],[-119.585,34.4794],[-119.642,34.4725],[-119.957,34.5357],[-119.642,34.4625],[-119.233,34.5037],[-119.58,34.4899],[-119.644,34.4621],[-119.592,34.4715],[-119.59,34.4749],[-119.573,34.4723],[-119.642,34.4727],[-119.721,34.4745],[-119.587,34.4833],[-119.234,34.5038],[-119.697,34.4785],[-120.239,34.4832],[-119.957,34.531],[-119.5,34.4724],[-119.644,34.4623],[-119.96,34.5356],[-119.642,34.4724],[-119.954,34.5408],[-119.957,34.5337],[-119.609,34.4547],[-119.712,34.4728],[-119.642,34.4726],[-119.782,34.5591],[-119.615,34.4559],[-119.717,34.4891],[-119.586,34.4795],[-119.651,34.4559],[-119.697,34.4783],[-119.644,34.4619],[-119.564,34.4861],[-119.605,34.4543],[-119.587,34.4828],[-119.783,34.5587],[-119.595,34.4922],[-119.897,34.5187],[-119.59,34.4748],[-119.588,34.4851],[-119.644,34.4618],[-120.238,34.4863],[-119.644,34.4622],[-119.713,34.4716],[-119.643,34.4617],[-119.983,34.8143],[-119.602,34.4938],[-120.238,34.4824],[-119.592,34.4713],[-119.691,34.4678],[-119.693,34.5051],[-119.025,34.0889],[-119.644,34.4633],[-119.664,34.4657],[-119.719,34.4743],[-119.315,34.698],[-119.985,34.8152],[-119.602,34.4934],[-119.759,34.5679],[-119.615,34.4557],[-119.645,34.4609],[-119.78,34.5551],[-119.649,34.4575],[-119.644,34.4626],[-119.957,34.5309],[-119.587,34.483],[-119.593,34.4902],[-119.702,34.4748],[-119.783,34.5586],[-119.57,34.4707],[-119.649,34.4578],[-119.644,34.464],[-120.056,34.743],[-119.645,34.4599],[-120.201,34.5008],[-119.695,34.5086],[-119.564,34.4852],[-119.955,34.5394],[-119.589,34.4749],[-119.784,34.5583]];
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