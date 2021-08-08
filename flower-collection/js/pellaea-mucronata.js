var subSightings = [[-119.681,34.4784],[-119.215,34.4833],[-119.643,34.4646],[-119.745,34.5901],[-119.644,34.4647],[-119.701,34.4867],[-119.702,34.4853],[-119.637,34.4785],[-119.641,34.4729],[-119.643,34.4674],[-119.86,34.7411],[-119.632,34.4779],[-119.75,34.584],[-119.644,34.4638],[-119.644,34.4643],[-119.699,34.4838],[-119.747,34.4858],[-119.636,34.4957],[-119.7,34.4853],[-119.644,34.4685],[-119.859,34.7425],[-119.699,34.4837],[-119.568,34.487],[-119.785,34.7555],[-119.7,34.4848],[-119.809,34.5121],[-119.563,34.4873],[-119.569,34.4873],[-119.645,34.4644],[-120.028,34.5332],[-119.767,34.5597],[-119.644,34.465],[-119.224,34.4954],[-119.609,34.4771],[-119.611,34.4976],[-119.644,34.4646],[-119.63,34.4778],[-119.643,34.4645],[-119.643,34.4666],[-119.715,34.4938],[-119.859,34.7415],[-119.643,34.4663],[-120.029,34.5335],[-119.635,34.4544],[-119.999,34.5298],[-119.864,34.7805],[-119.625,34.4722],[-119.712,34.4709],[-119.643,34.4701],[-119.56,34.4868],[-119.701,34.485],[-119.504,34.4643],[-120.052,34.7523],[-119.694,34.4847],[-119.633,34.4542],[-119.627,34.4743],[-119.75,34.5005],[-119.644,34.4639],[-119.602,34.4737],[-119.752,34.5116],[-119.91,34.7719],[-119.639,34.4742],[-119.636,34.4901],[-119.625,34.4724],[-119.643,34.4664],[-119.612,34.4552],[-119.643,34.4662],[-119.703,34.4934],[-119.99,34.823],[-119.563,34.4876],[-119.751,34.5019],[-119.773,34.5464],[-119.888,34.7742],[-119.716,34.4903],[-119.641,34.4711],[-119.643,34.4676],[-119.655,34.4526],[-119.7,34.4842],[-119.636,34.4958],[-119.562,34.4874],[-119.644,34.464],[-119.633,34.4777],[-119.747,34.4859],[-119.645,34.4645],[-119.691,34.4877],[-119.659,34.4739],[-119.638,34.4786],[-119.625,34.4723],[-119.859,34.7408],[-119.701,34.4851],[-119.638,34.4782],[-119.643,34.4675],[-119.645,34.464],[-119.644,34.4641],[-119.644,34.4649],[-119.636,34.4541],[-119.639,34.4786],[-119.256,34.4827],[-119.643,34.4672],[-119.643,34.4678],[-119.642,34.4614],[-119.643,34.4671],[-119.644,34.4837],[-119.643,34.4681],[-119.698,34.4836],[-119.643,34.4614],[-119.562,34.4872],[-119.565,34.4873],[-119.608,34.4763],[-119.572,34.4876],[-119.644,34.4684],[-119.644,34.4645],[-119.644,34.4648]];
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