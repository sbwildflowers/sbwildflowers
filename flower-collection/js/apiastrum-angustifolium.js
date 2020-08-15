var subSightings = [[-119.639,34.4746],[-119.748,34.4866],[-119.756,34.5715],[-119.639,34.4745],[-119.585,34.4916],[-119.594,34.4722],[-119.746,34.4953],[-119.496,34.4812],[-119.631,34.5097],[-119.644,34.461],[-119.752,34.5807],[-120.239,34.4831],[-119.636,34.4951],[-119.756,34.5729],[-119.778,34.5592],[-119.594,34.4723],[-119.626,34.4739],[-119.644,34.463],[-119.746,34.495],[-119.75,34.5971],[-119.644,34.4632],[-119.644,34.4611],[-119.747,34.4967],[-119.649,34.4577],[-119.636,34.5016],[-119.59,34.4747],[-119.635,34.5032],[-119.639,34.4748],[-119.748,34.4867],[-119.752,34.5732],[-119.59,34.4748],[-119.639,34.4736],[-119.625,34.4725],[-119.752,34.5731],[-119.636,34.502],[-119.65,34.4611],[-119.639,34.4735],[-119.681,34.4749],[-119.637,34.4772],[-119.651,34.4609],[-119.563,34.4859],[-120.239,34.4832],[-119.625,34.4724],[-119.759,34.5676],[-119.746,34.4961],[-119.761,34.5665],[-119.635,34.5031],[-119.635,34.5009],[-119.591,34.4749],[-119.644,34.4628],[-119.689,34.4667],[-119.787,34.5482],[-119.756,34.5117],[-119.634,34.5041],[-119.746,34.4945],[-119.593,34.4722],[-119.59,34.4749],[-119.59,34.4746],[-119.756,34.5723],[-119.644,34.4621],[-119.633,34.5087],[-119.591,34.4745],[-119.592,34.4711],[-119.746,34.4948],[-119.958,34.5323],[-119.783,34.5585],[-119.759,34.5669],[-119.635,34.5033],[-119.782,34.5591],[-119.625,34.4726],[-119.757,34.5178],[-119.752,34.5806],[-119.82,34.5433],[-119.636,34.4935],[-119.591,34.4747],[-119.635,34.5021],[-119.644,34.4625],[-119.746,34.4946],[-119.642,34.5135],[-119.635,34.5036],[-119.746,34.4954],[-119.746,34.4949],[-119.639,34.4726],[-119.634,34.5007],[-119.626,34.4736],[-119.639,34.4734],[-119.639,34.4738],[-119.644,34.4627],[-119.5,34.4737],[-119.746,34.4964],[-119.639,34.4747],[-119.634,34.5],[-119.746,34.4956],[-119.639,34.4737],[-119.594,34.4718],[-119.592,34.4707],[-119.746,34.496],[-119.749,34.4876],[-119.634,34.4999],[-119.591,34.4746],[-119.757,34.5715],[-119.637,34.51],[-119.594,34.4727],[-119.635,34.5006],[-119.645,34.4608],[-119.609,34.4549],[-119.639,34.4733],[-119.591,34.4748],[-119.946,34.8074],[-120.052,34.7534],[-119.644,34.4626],[-119.634,34.5005],[-119.763,34.5384],[-119.595,34.4921],[-119.746,34.4955],[-119.644,34.4634],[-119.644,34.4624],[-119.635,34.5034],[-119.758,34.5345]];
$(document).ready(function() {
	var vectorSource = new ol.source.Vector({
      //create empty vector
    });

	//create a bunch of icons and add to source vector
	subSightings.forEach(function(item,index) {
		var iconFeature = new ol.Feature({
		          geometry: new  
		            ol.geom.Point(ol.proj.fromLonLat(item)),
		        name: 'Flower',
		        population: 4000,
		        rainfall: 500
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
        src: 'flower.png'
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