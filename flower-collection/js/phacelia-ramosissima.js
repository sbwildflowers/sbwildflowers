var subSightings = [[-119.764,34.5646],[-119.72,34.4748],[-119.762,34.5386],[-119.72,34.4752],[-119.686,34.476],[-119.259,34.5753],[-119.699,34.4783],[-119.956,34.5288],[-119.982,34.7578],[-119.623,34.4576],[-119.135,34.4515],[-119.728,34.4735],[-119.591,34.4532],[-119.726,34.4754],[-119.77,34.5609],[-119.764,34.5648],[-119.381,34.5071],[-119.771,34.5605],[-119.77,34.5605],[-119.503,34.4672],[-119.751,34.6018],[-119.721,34.4753],[-119.726,34.4755],[-119.771,34.5588],[-119.67,34.519],[-119.769,34.5633],[-119.733,34.4617],[-119.699,34.4777],[-119.723,34.4754],[-119.707,34.4697],[-119.72,34.4745],[-119.753,34.5097],[-119.59,34.4575],[-119.631,34.5299],[-119.725,34.4762],[-119.699,34.4776],[-119.662,34.466],[-119.654,34.4574],[-119.719,34.4745],[-119.636,34.4887],[-119.764,34.5645],[-119.77,34.5604],[-119.623,34.4587],[-119.502,34.463],[-119.721,34.4747],[-119.653,34.4567],[-119.636,34.4881],[-119.442,34.4911],[-119.636,34.4892],[-119.63,34.512],[-119.77,34.5606],[-119.66,34.5235],[-119.592,34.4596],[-119.955,34.5286],[-119.136,34.4527],[-119.698,34.4832],[-119.688,34.514],[-119.728,34.4734],[-119.63,34.5121],[-119.763,34.5647],[-119.754,34.5999],[-119.947,34.529],[-119.73,34.4607],[-119.712,34.4728],[-119.698,34.4831],[-119.635,34.4985],[-119.723,34.4762],[-119.687,34.4754],[-119.591,34.4651],[-119.506,34.4551],[-119.591,34.4533],[-119.724,34.4762],[-119.471,34.4926],[-119.724,34.4765],[-119.372,34.673],[-119.63,34.5211],[-119.723,34.4755],[-119.698,34.483],[-119.725,34.4756],[-119.674,34.5217],[-119.723,34.4759],[-119.706,34.4703],[-119.592,34.4594],[-119.135,34.4514],[-119.63,34.5125],[-119.882,34.4124],[-119.699,34.4775],[-119.691,34.4772],[-119.663,34.4671],[-119.654,34.4575],[-119.754,34.5099],[-119.725,34.4754],[-119.955,34.5287],[-119.623,34.4574],[-119.58,34.4563],[-119.847,34.4063],[-119.893,34.7892],[-119.732,34.4534],[-119.73,34.4609],[-119.719,34.4747],[-119.722,34.4755],[-119.73,34.4606],[-119.653,34.4566],[-119.591,34.453],[-119.719,34.4746],[-119.848,34.4068],[-119.636,34.4895],[-119.724,34.4764],[-119.699,34.4784],[-120.232,34.5056],[-119.636,34.4886],[-119.724,34.4757],[-119.73,34.4605],[-119.72,34.4753],[-119.636,34.4882],[-119.966,34.7497],[-119.592,34.4602],[-119.725,34.4755],[-119.444,34.4915],[-119.623,34.4575],[-119.729,34.4548],[-119.753,34.5099],[-119.512,34.4901],[-119.623,34.4577],[-119.753,34.6002],[-119.723,34.4763],[-119.764,34.5647],[-119.753,34.5104],[-119.72,34.4749],[-119.721,34.4755],[-119.623,34.458],[-119.588,34.4552],[-119.728,34.4733],[-119.733,34.4529],[-119.724,34.4763],[-119.699,34.4781],[-119.681,34.4811],[-119.636,34.4894],[-119.688,34.4757],[-119.681,34.481],[-119.748,34.4902],[-119.72,34.475],[-119.591,34.4531],[-119.724,34.4759],[-119.541,34.4865],[-119.623,34.4585],[-119.746,34.6127],[-119.754,34.6],[-119.623,34.4586],[-119.722,34.4754],[-119.723,34.476],[-119.752,34.6008],[-119.732,34.4533],[-119.591,34.4555],[-119.135,34.4534],[-119.576,34.5131],[-119.702,34.4851],[-119.732,34.4668],[-119.758,34.5367],[-119.726,34.4752],[-119.68,34.4749],[-119.754,34.5098],[-119.729,34.4607],[-119.633,34.5051],[-119.664,34.4684],[-119.75,34.6064],[-119.417,34.4922],[-119.633,34.505],[-119.7,34.4724],[-119.733,34.467],[-119.699,34.4767],[-119.651,34.4633],[-119.764,34.5649],[-119.699,34.4782],[-119.691,34.4771],[-119.721,34.4754],[-119.687,34.4752],[-119.786,34.5501],[-119.726,34.4753],[-119.702,34.4858],[-119.724,34.4761],[-119.699,34.4778],[-119.262,34.5839],[-119.945,34.5276],[-119.724,34.4756],[-119.72,34.4746],[-119.502,34.4628],[-119.723,34.4757],[-119.733,34.4669],[-119.724,34.476],[-119.47,34.4928],[-119.653,34.456],[-119.724,34.4758],[-119.098,34.8181],[-119.72,34.4747],[-119.653,34.4535],[-119.763,34.5651],[-119.699,34.4766],[-119.723,34.4756],[-119.697,34.4781],[-119.591,34.4652],[-119.945,34.5277],[-119.681,34.4571]];
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