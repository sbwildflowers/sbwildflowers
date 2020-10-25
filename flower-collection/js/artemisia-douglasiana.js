var subSightings = [[-119.732,34.4668],[-119.649,34.4637],[-119.727,34.4738],[-119.883,34.736],[-119.77,34.5609],[-119.73,34.455],[-119.639,34.4606],[-119.846,34.4089],[-119.763,34.4362],[-119.639,34.4561],[-119.63,34.5122],[-119.588,34.4807],[-119.612,34.4544],[-119.623,34.4578],[-119.592,34.4565],[-119.682,34.4978],[-119.627,34.5223],[-119.542,34.4865],[-119.452,34.4915],[-119.639,34.4582],[-119.845,34.406],[-119.654,34.4576],[-119.612,34.4545],[-119.823,34.423],[-119.591,34.4587],[-119.749,34.6124],[-119.699,34.4724],[-119.804,34.444],[-119.426,34.4894],[-119.764,34.5646],[-119.733,34.4541],[-119.732,34.4659],[-119.631,34.5202],[-119.592,34.4915],[-119.729,34.4718],[-119.729,34.4715],[-119.593,34.4569],[-119.611,34.4554],[-119.729,34.4719],[-119.824,34.4226],[-119.64,34.4611],[-119.829,34.4209],[-119.654,34.4574],[-119.595,34.4922],[-119.739,34.4045],[-119.761,34.539],[-119.642,34.5136],[-119.924,34.7667],[-120.013,34.7532],[-119.27,34.4748],[-119.74,34.4049],[-119.731,34.4638],[-119.77,34.5524],[-119.826,34.4225],[-119.135,34.4512],[-119.588,34.4809],[-119.65,34.4634],[-119.763,34.5649],[-119.623,34.4579],[-119.595,34.4921],[-119.63,34.5128],[-119.623,34.4652],[-119.591,34.4555],[-119.639,34.461],[-119.595,34.4923],[-119.59,34.4575],[-119.764,34.5647],[-119.728,34.46],[-119.29,34.4784],[-119.811,34.4249],[-119.724,34.5352],[-119.813,34.5046],[-119.504,34.4374],[-119.758,34.5187],[-119.592,34.4562],[-119.588,34.4808],[-119.639,34.4578],[-119.649,34.4635],[-119.591,34.4542],[-119.739,34.4051],[-119.633,34.5151],[-119.699,34.4722],[-119.816,34.5109],[-119.508,34.4254],[-119.591,34.459],[-119.763,34.5648],[-119.729,34.4717],[-119.603,34.51],[-119.628,34.5217],[-119.724,34.4762],[-119.73,34.4606],[-119.592,34.4597],[-119.594,34.4916],[-119.629,34.512],[-119.592,34.4568],[-119.38,34.5069],[-119.649,34.4636],[-119.729,34.4716],[-119.611,34.452],[-119.751,34.5021],[-119.611,34.4489],[-119.732,34.4663],[-119.74,34.4124],[-119.587,34.4697],[-119.564,34.5365],[-119.592,34.4564],[-119.72,34.4748],[-119.598,34.494],[-119.786,34.5502],[-119.732,34.4667],[-119.639,34.4614],[-119.751,34.502],[-119.851,34.7466],[-119.591,34.4676],[-119.74,34.4046],[-119.61,34.501],[-119.632,34.5149],[-119.755,34.4602],[-119.272,34.4749],[-119.83,34.4188],[-119.732,34.4537],[-119.633,34.5173],[-119.662,34.4668],[-119.758,34.5186],[-119.639,34.4568],[-119.688,34.5141],[-119.663,34.467],[-119.804,34.5134],[-119.593,34.4704],[-119.732,34.4532],[-119.634,34.4547],[-119.003,34.094],[-119.681,34.4824],[-120.206,34.4913],[-119.623,34.458],[-119.726,34.4754],[-119.631,34.5085],[-119.314,34.2794],[-119.628,34.5118],[-119.701,34.5595],[-119.688,34.5214],[-119.824,34.4228],[-119.504,34.4375],[-119.732,34.4535],[-119.762,34.5664],[-119.73,34.4552],[-119.594,34.4915],[-119.592,34.4549],[-119.762,34.5392],[-119.73,34.4551],[-119.406,34.4975],[-119.732,34.4664],[-119.681,34.4797],[-119.722,34.4755],[-119.597,34.4578],[-119.592,34.4558],[-119.63,34.5121],[-120.216,34.5031],[-119.65,34.4638],[-119.578,34.489],[-119.612,34.4966],[-119.757,34.5704],[-119.527,34.3969],[-119.801,34.5137],[-119.628,34.5216]];
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