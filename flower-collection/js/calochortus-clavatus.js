var subSightings = [[-119.718,34.5648],[-119.743,34.5867],[-119.747,34.5933],[-119.65,34.5199],[-119.747,34.5913],[-119.75,34.6082],[-119.75,34.6063],[-119.75,34.6025],[-119.754,34.5754],[-119.756,34.5718],[-119.779,34.5543],[-119.756,34.5714],[-119.746,34.5925],[-119.904,34.7631],[-119.756,34.5724],[-119.631,34.5089],[-119.644,34.5158],[-119.748,34.6128],[-119.752,34.5727],[-119.013,34.0875],[-119.741,34.5533],[-119.754,34.5311],[-119.787,34.5482],[-119.749,34.6036],[-120.015,34.7809],[-119.747,34.5926],[-119.648,34.5174],[-119.75,34.5969],[-119.787,34.5483],[-119.752,34.5733],[-119.787,34.5494],[-119.753,34.599],[-119.752,34.573],[-119.756,34.5717],[-119.743,34.5542],[-119.741,34.5539],[-120.009,34.7613],[-119.75,34.6057],[-119.746,34.593],[-119.753,34.5625],[-119.752,34.5726],[-119.746,34.5901],[-119.749,34.5652],[-119.645,34.5155],[-119.75,34.6055],[-119.744,34.5903],[-119.744,34.5858],[-119.747,34.5927],[-119.746,34.5908],[-119.763,34.5994],[-119.774,34.6291],[-119.738,34.5521],[-119.787,34.5495],[-119.757,34.5685],[-119.749,34.5697],[-119.757,34.5717],[-119.756,34.5721],[-119.75,34.5831],[-119.752,34.5732],[-119.786,34.5522],[-119.65,34.5197],[-119.78,34.5544],[-119.785,34.5524],[-119.75,34.606],[-119.755,34.5304],[-120.096,34.6964],[-119.753,34.5989],[-119.74,34.5531],[-119.755,34.5747],[-119.755,34.5759],[-119.745,34.5902],[-119.717,34.5849],[-119.756,34.5723],[-119.78,34.5557],[-119.892,34.7544],[-119.644,34.5159],[-119.749,34.5624],[-119.744,34.5545],[-119.785,34.5523],[-119.75,34.5968],[-119.757,34.5709],[-119.756,34.5716],[-119.746,34.5913],[-119.749,34.5957],[-119.754,34.5768],[-119.645,34.5158],[-119.755,34.5306],[-119.754,34.5622],[-119.756,34.5715],[-119.76,34.5664],[-119.746,34.5927],[-119.644,34.516],[-119.774,34.629],[-119.754,34.5752],[-119.755,34.5765],[-119.75,34.6076],[-119.757,34.5686],[-119.754,34.5308],[-119.78,34.5546],[-119.741,34.5531],[-119.751,34.602],[-119.753,34.5988],[-119.749,34.6038],[-119.744,34.5856],[-119.786,34.5528],[-119.75,34.6062],[-119.752,34.5731],[-119.014,34.0895],[-119.75,34.5966],[-120.096,34.6951],[-119.739,34.569],[-119.755,34.599],[-119.749,34.5654],[-119.748,34.5717],[-119.754,34.5991],[-119.779,34.5541],[-119.75,34.6053],[-119.787,34.5481],[-119.741,34.5538],[-119.756,34.5726],[-120.01,34.7604],[-119.942,34.772],[-119.754,34.5756],[-119.754,34.5753],[-119.744,34.5548],[-119.78,34.5556],[-119.746,34.5924],[-119.75,34.5834],[-119.755,34.5989],[-119.746,34.5911],[-119.734,34.5473],[-120.01,34.7608],[-119.651,34.5199],[-119.746,34.5902],[-119.756,34.5733],[-119.756,34.572],[-119.753,34.5987],[-119.645,34.5156],[-119.741,34.5679],[-119.755,34.5305],[-119.744,34.5902],[-119.757,34.5714],[-120.01,34.7603],[-119.737,34.5686],[-119.651,34.5198],[-119.748,34.567],[-120.01,34.7612],[-119.755,34.53],[-119.756,34.5722],[-119.78,34.5549],[-119.754,34.5309],[-119.755,34.5307],[-119.645,34.5157],[-119.747,34.593],[-119.752,34.5728],[-120.009,34.7614],[-119.746,34.5928],[-119.754,34.5755],[-119.888,34.7396],[-119.645,34.5159],[-119.757,34.5713],[-119.748,34.5718],[-119.651,34.52],[-119.644,34.5157],[-119.755,34.5763],[-119.753,34.6086],[-119.757,34.5711],[-119.665,34.5225],[-119.929,34.7663],[-119.748,34.5928],[-119.761,34.5663],[-119.754,34.5992],[-119.756,34.5719],[-119.748,34.5693],[-119.758,34.5681],[-119.884,34.7364],[-119.785,34.5571],[-119.748,34.5677],[-119.769,34.5631],[-119.754,34.599],[-119.763,34.5656],[-119.786,34.5495],[-119.737,34.5516],[-119.75,34.6051],[-119.747,34.5682],[-119.751,34.5734],[-119.757,34.5687],[-119.744,34.5859],[-119.759,34.5672],[-119.76,34.6034],[-119.78,34.5545],[-119.75,34.5961],[-119.648,34.5178],[-119.757,34.5712],[-119.969,34.7226],[-120.696,35.235],[-119.746,34.5926],[-119.75,34.5832],[-119.757,34.571],[-119.779,34.5544],[-119.87,34.7374],[-119.787,34.5496],[-119.774,34.6289]];
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