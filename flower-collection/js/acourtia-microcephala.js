var subSightings = [[-119.645,34.4608],[-119.244,34.4678],[-119.76,34.5371],[-119.636,34.5014],[-119.643,34.4611],[-119.789,34.5372],[-119.82,34.5431],[-119.789,34.5464],[-119.611,34.4976],[-119.787,34.5545],[-119.758,34.5685],[-119.602,34.4936],[-119.6,34.4936],[-119.786,34.5481],[-119.747,34.5682],[-119.771,34.5589],[-119.782,34.5503],[-119.75,34.6064],[-119.24,34.4697],[-119.787,34.5492],[-119.757,34.5689],[-119.79,34.5391],[-119.596,34.4936],[-119.773,34.546],[-119.91,34.766],[-119.595,34.4929],[-119.62,34.5366],[-120.052,34.7536],[-119.696,34.5099],[-119.761,34.5663],[-119.771,34.557],[-119.723,34.4755],[-119.584,34.4913],[-119.611,34.4985],[-119.739,34.553],[-119.758,34.5683],[-119.643,34.4612],[-119.639,34.5115],[-119.248,34.4703],[-119.502,34.4597],[-119.502,34.4601],[-119.74,34.5529],[-119.599,34.494],[-119.79,34.5395],[-119.757,34.5695],[-119.955,34.5404],[-119.747,34.5683],[-119.699,34.4764],[-119.702,34.4731],[-119.641,34.5135],[-119.84,34.7508],[-119.585,34.4915],[-119.737,34.4678],[-119.782,34.5504],[-119.702,34.4733],[-119.76,34.5668],[-119.651,34.456],[-119.649,34.4636],[-119.588,34.4852],[-119.649,34.4637],[-119.588,34.4857],[-119.787,34.5546],[-119.645,34.4607],[-119.588,34.4853],[-119.747,34.584],[-119.787,34.5493],[-119.748,34.5567],[-119.77,34.5503],[-119.753,34.5727],[-119.783,34.5484],[-119.644,34.4611],[-119.98,34.8141],[-119.757,34.5692],[-119.769,34.5504],[-119.777,34.559],[-119.731,34.5444],[-119.256,34.471],[-119.78,34.5507],[-119.643,34.4613],[-119.981,34.7958],[-119.759,34.5673],[-119.785,34.5573],[-119.78,34.5548],[-120.006,34.8101],[-119.738,34.4685],[-119.78,34.5563],[-119.48,34.4886],[-119.602,34.4935],[-120.006,34.8105],[-119.588,34.4855],[-119.588,34.4858],[-119.289,34.4788],[-119.578,34.4894],[-119.759,34.5674],[-119.602,34.4937],[-119.611,34.4986],[-119.596,34.4935],[-120.006,34.811],[-119.586,34.4915],[-119.289,34.4789],[-119.502,34.4599],[-119.757,34.5694],[-119.778,34.7568],[-119.753,34.5726],[-119.757,34.5698],[-119.246,34.4687],[-119.761,34.5662],[-119.963,34.7588],[-119.747,34.4968],[-119.91,34.7659],[-119.5,34.4724],[-119.746,34.5553],[-119.791,34.5413],[-119.587,34.4918],[-119.479,34.4893],[-119.785,34.5572],[-119.592,34.4917],[-119.77,34.5451],[-119.769,34.5524],[-119.995,34.8254],[-119.707,34.4728],[-119.507,34.445],[-119.644,34.4612],[-119.636,34.5015],[-119.723,34.4757],[-119.786,34.5566],[-119.286,34.4777],[-119.65,34.4638],[-119.732,34.5456],[-119.747,34.556],[-119.786,34.5552],[-119.747,34.4967],[-119.782,34.5589],[-119.757,34.57],[-119.737,34.5511],[-119.602,34.4938],[-119.579,34.4895],[-119.762,34.5661],[-119.261,34.4753],[-119.755,34.5297],[-119.767,34.631],[-119.702,34.4732],[-119.789,34.5357],[-119.611,34.4979],[-119.717,34.5849],[-119.76,34.53],[-119.708,34.4729],[-119.739,34.5529],[-119.816,34.541],[-119.645,34.4609],[-119.643,34.461],[-119.579,34.4898],[-119.752,34.6114],[-119.738,34.5527],[-119.749,34.4997],[-119.699,34.4763],[-119.913,34.7686],[-119.758,34.5357],[-119.757,34.5697],[-119.596,34.4933],[-119.579,34.4896],[-119.589,34.4857]];
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