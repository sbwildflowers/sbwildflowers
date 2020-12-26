var subSightings = [[-119.587,34.4815],[-119.647,34.4606],[-119.907,34.7989],[-119.86,34.5007],[-119.751,34.5201],[-119.74,34.4738],[-119.591,34.4918],[-119.774,34.7602],[-119.647,34.4605],[-119.953,34.527],[-119.649,34.4614],[-119.59,34.4766],[-119.635,34.4918],[-119.59,34.4768],[-119.586,34.4751],[-119.809,34.512],[-119.627,34.5338],[-119.624,34.4954],[-119.647,34.4603],[-119.602,34.4936],[-119.628,34.5314],[-120.13,34.5217],[-119.637,34.4972],[-119.976,34.5256],[-119.699,34.4897],[-119.636,34.4953],[-119.75,34.5217],[-119.751,34.514],[-119.636,34.4955],[-119.648,34.4607],[-119.805,34.5125],[-119.628,34.5325],[-119.567,34.487],[-119.75,34.515],[-119.6,34.4934],[-119.752,34.5134],[-119.751,34.5233],[-119.629,34.4955],[-119.502,34.4375],[-119.752,34.5165],[-119.567,34.4872],[-119.507,34.4688],[-119.451,34.4913],[-119.752,34.5131],[-119.74,34.4724],[-119.752,34.5157],[-119.635,34.4954],[-120.124,34.52],[-119.57,34.4872],[-119.635,34.4919],[-119.941,34.5266],[-119.611,34.4972],[-119.71,34.4954],[-119.771,34.5084],[-119.736,34.4676],[-119.763,34.5653],[-119.635,34.4953],[-119.626,34.5344],[-119.596,34.4933],[-119.743,34.4767],[-119.738,34.4682],[-119.7,34.4893],[-119.589,34.4761],[-119.75,34.5189],[-119.865,34.5029],[-119.708,34.4953],[-119.7,34.4757],[-119.727,34.5011],[-120.138,34.5196],[-119.636,34.4917],[-119.755,34.5084],[-119.715,34.4963],[-119.635,34.4914],[-120.008,34.7668],[-119.742,34.4764],[-119.75,34.5205],[-119.704,34.4935],[-119.592,34.4917],[-119.715,34.4964],[-119.635,34.4911],[-119.753,34.5987],[-119.472,34.4724],[-119.714,34.4952],[-119.599,34.4941],[-119.56,34.4868],[-119.648,34.4613],[-119.587,34.4811],[-119.701,34.4751],[-119.561,34.4871],[-119.751,34.5252],[-119.762,34.5656],[-119.587,34.4801],[-119.603,34.4931],[-119.596,34.4936],[-119.7,34.4756],[-119.808,34.5163],[-119.73,34.4612],[-119.7,34.4892],[-119.635,34.4912],[-119.7,34.4758],[-119.573,34.4878],[-119.59,34.4769],[-119.763,34.5651],[-119.581,34.4748],[-119.636,34.4922],[-119.7,34.4755],[-119.611,34.4971],[-119.585,34.475],[-119.707,34.4944],[-119.502,34.4361],[-119.701,34.4883],[-119.588,34.4806],[-119.752,34.5129],[-119.648,34.461],[-119.636,34.4916],[-119.648,34.4609],[-119.719,34.4995],[-119.587,34.4814],[-119.731,34.4637],[-119.7,34.4759],[-119.572,34.4876],[-119.716,34.497],[-119.587,34.4823],[-119.584,34.5122],[-119.636,34.4921],[-119.823,34.7513],[-119.636,34.4914],[-119.699,34.5129],[-119.599,34.4936],[-119.55,34.4885],[-119.635,34.4916],[-119.59,34.4762],[-119.75,34.5151],[-119.76,34.5668],[-119.718,34.4993],[-119.588,34.481],[-119.589,34.4862],[-119.609,34.5035],[-120.009,34.7667],[-119.965,34.5256],[-119.637,34.4966],[-119.649,34.4613],[-119.742,34.4762],[-119.636,34.4954],[-119.579,34.4897],[-119.755,34.5085],[-119.751,34.5135],[-119.818,34.529],[-119.628,34.4954],[-119.54,34.4871],[-119.612,34.497],[-120.133,34.5206],[-119.647,34.4604],[-119.819,34.5278],[-119.706,34.4941],[-119.94,34.5266],[-119.636,34.4952],[-119.762,34.5661],[-119.636,34.4913],[-119.587,34.481],[-119.591,34.4876],[-119.741,34.473],[-119.584,34.4754],[-119.59,34.4765],[-119.587,34.4813],[-119.587,34.4812],[-119.599,34.4937],[-119.647,34.4873],[-119.74,34.4726],[-119.804,34.5135],[-119.751,34.5142],[-119.586,34.4752],[-119.742,34.4763],[-119.75,34.6075],[-119.753,34.5989],[-119.637,34.4973],[-119.7,34.4754],[-119.505,34.441],[-119.751,34.5136],[-119.635,34.4925],[-119.647,34.4608],[-119.751,34.5139],[-119.496,34.4846],[-119.595,34.4919],[-119.599,34.494],[-119.611,34.4973],[-119.608,34.5046],[-119.704,34.4938],[-119.478,34.4713],[-119.602,34.4938],[-119.988,34.53],[-119.74,34.4741],[-119.587,34.4809],[-119.604,34.4932],[-119.649,34.4616],[-119.628,34.532]];
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