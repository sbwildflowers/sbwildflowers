var subSightings = [[-119.767,34.5425],[-119.762,34.5664],[-119.749,34.6034],[-119.775,34.5452],[-119.75,34.5981],[-119.752,34.5298],[-119.77,34.5452],[-119.63,34.511],[-119.768,34.564],[-119.677,34.5221],[-119.746,34.5927],[-119.68,34.5144],[-119.769,34.5435],[-119.755,34.5989],[-119.624,34.4955],[-119.75,34.6025],[-119.677,34.5226],[-119.902,34.7825],[-119.772,34.5572],[-119.672,34.5071],[-119.037,34.086],[-119.746,34.5926],[-119.627,34.5245],[-119.762,34.541],[-119.635,34.5031],[-119.624,34.4953],[-119.676,34.5227],[-119.676,34.5236],[-119.672,34.5072],[-119.761,34.5663],[-119.635,34.5032],[-119.767,34.5422],[-119.747,34.5936],[-119.058,34.0975],[-119.511,34.4197],[-119.678,34.5182],[-119.766,34.5651],[-119.765,34.5651],[-119.68,34.5147],[-119.675,34.5235],[-119.769,34.5636],[-119.776,34.5452],[-119.779,34.5542],[-119.635,34.503],[-119.015,34.1077],[-119.762,34.5662],[-119.63,34.5299],[-119.279,34.4759],[-119.624,34.4954],[-119.786,34.5522],[-119.75,34.5979],[-119.63,34.5224],[-119.746,34.5928],[-119.276,34.475],[-119.631,34.5106],[-119.763,34.5413],[-119.678,34.5121],[-119.635,34.5034],[-119.762,34.5659],[-119.764,34.5414],[-119.903,34.7803],[-119.768,34.5635],[-119.63,34.5109],[-119.053,34.0921],[-119.044,34.0955],[-119.771,34.5452],[-119.779,34.5543],[-119.689,34.5219],[-119.766,34.5421],[-119.042,34.0952],[-119.629,34.5225],[-119.77,34.5619],[-119.757,34.5713],[-119.628,34.4956],[-119.75,34.5982],[-119.767,34.5424],[-119.754,34.5312],[-119.767,34.5426],[-119.762,34.5407],[-119.636,34.5017],[-119.63,34.5108],[-119.511,34.4191],[-119.046,34.0933],[-119.635,34.5009],[-119.777,34.5459],[-119.75,34.6042],[-119.678,34.5181],[-119.678,34.5185],[-119.751,34.5978],[-119.025,34.0897],[-119.758,34.568],[-119.771,34.5572],[-119.047,34.094],[-119.046,34.0926],[-119.752,34.5977],[-119.746,34.5396],[-119.762,34.5409],[-119.753,34.599],[-119.627,34.4957],[-119.766,34.5418],[-119.77,34.5454],[-119.631,34.5108],[-119.724,34.5354],[-119.636,34.5009],[-119.904,34.7794],[-119.042,34.0964],[-119.768,34.5431],[-119.748,34.5957],[-119.77,34.5451],[-119.748,34.5956],[-119.753,34.5989],[-119.764,34.5416],[-119.773,34.5467],[-119.754,34.5991],[-119.764,34.5415],[-119.749,34.6031],[-119.636,34.5015],[-119.762,34.5408],[-119.636,34.5011],[-119.615,34.4955],[-119.777,34.5586],[-119.278,34.4756],[-119.653,34.52],[-119.767,34.5423],[-119.747,34.5933],[-119.673,34.523],[-119.771,34.5601],[-119.772,34.5458],[-119.746,34.5929],[-119.78,34.5544],[-119.766,34.5423],[-119.75,34.6027],[-119.76,34.5663],[-119.762,34.566],[-119.629,34.4955],[-119.762,34.5663],[-119.672,34.5242],[-119.749,34.5957],[-119.629,34.4957],[-119.779,34.5544],[-119.766,34.5422],[-119.385,34.5089],[-119.679,34.5209],[-119.681,34.5158],[-119.747,34.5935],[-119.636,34.501],[-119.776,34.545],[-119.016,34.111],[-119.636,34.5008],[-119.77,34.5453],[-119.766,34.5419],[-119.289,34.4786],[-119.679,34.5206],[-119.757,34.5989],[-119.766,34.542]];
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