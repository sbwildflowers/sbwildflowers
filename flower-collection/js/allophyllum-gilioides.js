var subSightings = [[-119.746,34.4856],[-119.722,34.4755],[-119.712,34.4949],[-119.636,34.4883],[-119.65,34.463],[-119.706,34.4944],[-119.638,34.4802],[-119.643,34.4671],[-119.596,34.465],[-119.747,34.601],[-119.644,34.4639],[-119.636,34.4889],[-119.496,34.4822],[-119.644,34.4647],[-119.638,34.48],[-119.639,34.4717],[-119.639,34.4804],[-119.645,34.4644],[-119.636,34.4888],[-119.755,34.5078],[-119.954,34.5286],[-119.663,34.4677],[-119.956,34.5293],[-119.749,34.4886],[-119.663,34.4667],[-119.702,34.486],[-119.601,34.4646],[-119.636,34.4864],[-119.753,34.5093],[-119.63,34.4775],[-119.648,34.4617],[-119.756,34.5116],[-119.639,34.4803],[-119.644,34.4641],[-119.644,34.4646],[-119.65,34.4618],[-119.539,34.4869],[-119.622,34.4535],[-119.702,34.475],[-119.649,34.4628],[-119.636,34.4544],[-119.66,34.4801],[-119.63,34.5131],[-119.958,34.5259],[-119.952,34.5276],[-119.75,34.6064],[-119.752,34.5105],[-119.569,34.4707],[-119.707,34.4733],[-119.636,34.4884],[-119.752,34.5106],[-119.596,34.4933],[-119.65,34.4628],[-119.659,34.4652],[-119.596,34.4651],[-119.954,34.527],[-119.785,34.5565],[-119.638,34.4803],[-119.754,34.5997],[-119.649,34.4588],[-119.383,34.5076],[-119.749,34.6004],[-119.644,34.4643],[-119.752,34.5104],[-119.654,34.4576],[-119.951,34.5272],[-119.636,34.4885],[-119.707,34.4734],[-119.746,34.6007],[-119.65,34.4609],[-119.638,34.4799],[-119.697,34.5115],[-119.588,34.455],[-119.603,34.4678],[-119.635,34.4544],[-119.65,34.4611],[-119.636,34.4542],[-119.757,34.5123],[-119.764,34.5645],[-119.643,34.4613],[-119.754,34.5998],[-119.495,34.4808],[-119.75,34.6065],[-119.649,34.4641],[-119.644,34.4648],[-119.763,34.5648],[-119.748,34.4864],[-119.662,34.4661],[-119.596,34.4936],[-119.644,34.465],[-119.495,34.4805],[-119.764,34.5647],[-119.636,34.4543],[-119.638,34.4801],[-119.711,34.4951],[-119.597,34.4935],[-119.637,34.4543],[-119.495,34.4791],[-119.664,34.4686],[-119.757,34.5114],[-119.65,34.461],[-119.639,34.4806],[-119.651,34.4608],[-119.633,34.5172],[-119.606,34.5063],[-119.722,34.5013],[-119.662,34.4663],[-119.651,34.4609],[-119.496,34.4834],[-119.713,34.4951],[-119.603,34.4677],[-119.636,34.454],[-119.636,34.4865],[-119.753,34.5096],[-119.644,34.4644],[-119.748,34.6008],[-119.648,34.4619],[-119.496,34.4839],[-119.751,34.5231],[-119.644,34.464],[-119.644,34.4645],[-119.649,34.462],[-119.637,34.4539],[-119.643,34.4618],[-119.635,34.504],[-119.955,34.527],[-119.945,34.5295],[-119.751,34.6018],[-119.752,34.52],[-119.764,34.5644],[-119.629,34.453],[-119.291,34.4785],[-119.663,34.4669],[-119.638,34.4796],[-119.601,34.4643],[-119.639,34.4575],[-119.636,34.489],[-119.644,34.4642],[-119.496,34.4814],[-119.702,34.4859],[-119.644,34.4649],[-119.751,34.6019],[-119.639,34.4805],[-119.707,34.4735],[-119.588,34.4782],[-119.588,34.4804],[-119.711,34.4952],[-119.591,34.453],[-119.649,34.4633],[-119.785,34.5564],[-119.949,34.5272],[-119.643,34.47],[-119.634,34.504],[-119.639,34.4576],[-119.705,34.4718],[-119.642,34.47],[-119.754,34.5098],[-119.639,34.4718],[-119.591,34.4561],[-119.597,34.4651],[-119.756,34.5128],[-119.96,34.533],[-119.644,34.4638],[-119.645,34.4695],[-119.569,34.4708],[-119.651,34.4611],[-119.764,34.5646],[-119.644,34.4637],[-119.864,34.5022],[-119.596,34.4934]];
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