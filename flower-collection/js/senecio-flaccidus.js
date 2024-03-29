var subSightings = [[-119.537,34.4687],[-119.686,34.4921],[-119.552,34.4859],[-119.566,34.4813],[-119.693,34.5006],[-119.719,34.4997],[-119.634,34.51],[-119.547,34.487],[-119.566,34.4816],[-119.588,34.4805],[-119.646,34.5157],[-119.568,34.4805],[-119.554,34.4641],[-119.639,34.4843],[-119.743,34.506],[-119.568,34.4789],[-119.639,34.4842],[-119.68,34.513],[-119.638,34.4839],[-119.676,34.4987],[-119.683,34.482],[-119.723,34.5881],[-119.639,34.4839],[-119.711,34.4949],[-119.693,34.5019],[-119.715,34.5829],[-119.674,34.4905],[-119.639,34.4838],[-119.701,34.4936],[-119.548,34.4871],[-119.95,34.5271],[-119.765,34.507],[-119.677,34.4917],[-119.504,34.467],[-120.009,34.7623],[-119.686,34.4873],[-119.685,34.4922],[-119.698,34.5],[-120.018,34.7837],[-119.577,34.4733],[-119.549,34.488],[-119.681,34.4998],[-119.682,34.4913],[-119.699,34.4768],[-119.701,34.4934],[-119.641,34.4865],[-119.691,34.5025],[-119.677,34.4989],[-119.64,34.5129],[-119.551,34.487],[-119.551,34.4874],[-119.633,34.5094],[-119.587,34.4805],[-119.699,34.4784],[-119.684,34.4843],[-119.64,34.5131],[-119.549,34.4885],[-119.753,34.5098],[-119.549,34.4887],[-119.551,34.4871],[-119.701,34.4949],[-119.503,34.4669],[-119.644,34.5144],[-119.571,34.4812],[-119.675,34.4904],[-119.693,34.5005],[-119.594,34.4692],[-119.609,34.4786],[-119.688,34.4908],[-119.633,34.5093],[-119.687,34.4884],[-119.675,34.5094],[-120.018,34.7836],[-119.68,34.4977],[-119.881,34.7721],[-119.562,34.4858],[-119.883,34.7763],[-119.638,34.4842],[-119.321,34.6965],[-119.701,34.496],[-119.68,34.5129],[-119.752,34.5977],[-119.551,34.4877],[-119.693,34.5009],[-119.716,34.5837],[-119.602,34.4701],[-119.589,34.4801],[-119.688,34.5031],[-119.754,34.5099],[-119.595,34.4691],[-119.551,34.4878],[-119.986,34.7506],[-119.682,34.5004],[-119.679,34.5174],[-119.602,34.4749],[-119.68,34.4973],[-119.553,34.4641],[-119.764,34.507],[-119.689,34.5032],[-119.638,34.4861],[-119.728,34.5907],[-119.682,34.4984],[-119.698,34.4999],[-119.672,34.5014],[-119.689,34.4902],[-119.699,34.4989],[-119.568,34.4795],[-119.504,34.4669],[-119.638,34.4865],[-119.689,34.5218],[-119.763,34.5994],[-119.542,34.4699],[-119.565,34.4791],[-119.64,34.4856],[-119.576,34.4808],[-119.565,34.4804],[-119.732,34.5761],[-119.633,34.5091],[-119.566,34.478],[-119.566,34.4811],[-120.015,34.7808],[-119.683,34.4821],[-119.576,34.4805],[-119.638,34.4844],[-119.702,34.4934],[-119.757,34.6005],[-119.699,34.4965],[-119.635,34.511],[-119.634,34.511],[-119.165,34.728],[-119.685,34.4847],[-119.579,34.4809],[-119.689,34.491],[-119.545,34.4874],[-119.319,34.6955],[-119.693,34.5004],[-119.186,34.727],[-119.638,34.4843],[-119.716,34.4972],[-119.87,34.7729],[-119.783,34.5486],[-119.579,34.4808],[-119.673,34.499],[-119.545,34.4873],[-119.639,34.4855],[-119.91,34.7713],[-119.702,34.4935],[-119.951,34.5272],[-119.639,34.4841]];
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