var subSightings = [[-119.76,34.5668],[-120.207,34.4911],[-119.764,34.5646],[-119.593,34.4909],[-120.066,34.76],[-119.76,34.5384],[-119.689,34.4643],[-119.757,34.5334],[-119.759,34.5372],[-119.79,34.5398],[-119.689,34.4646],[-119.959,34.5348],[-120.234,34.497],[-120.241,34.4882],[-119.757,34.5688],[-120.205,34.4927],[-119.757,34.5317],[-119.759,34.5678],[-120.205,34.4929],[-120.183,34.5073],[-120.234,34.4907],[-120.238,34.4884],[-120.242,34.5061],[-119.778,34.559],[-119.689,34.4653],[-119.757,34.5316],[-119.757,34.5345],[-120.091,34.5323],[-119.759,34.5676],[-119.757,34.5332],[-120.241,34.4948],[-120.061,34.7422],[-119.757,34.5362],[-120.226,34.5004],[-119.642,34.4617],[-120.207,34.493],[-119.772,34.5452],[-119.744,34.4837],[-119.757,34.5346],[-120.237,34.489],[-120.207,34.4929],[-119.75,34.5826],[-119.72,34.4744],[-119.757,34.5318],[-119.758,34.5364],[-120.237,34.4942],[-119.757,34.5313],[-120.189,34.5074],[-119.61,34.4956],[-119.756,34.5132],[-119.744,34.4839],[-120.183,34.5072],[-119.757,34.5126],[-119.057,34.0956],[-120.204,34.4982],[-119.785,34.5481],[-119.779,34.5535],[-120.233,34.497],[-119.782,34.5591],[-119.758,34.5354],[-119.023,34.1099],[-120.237,34.4889],[-120.226,34.4975],[-119.782,34.559],[-119.786,34.5526],[-120.238,34.4939],[-119.589,34.4862],[-119.757,34.5327],[-119.762,34.5382],[-119.587,34.4804],[-119.744,34.4848],[-120.244,34.494],[-120.207,34.4928],[-120.205,34.4926],[-119.757,34.533],[-118.996,34.1169],[-120.206,34.4913],[-119.758,34.536],[-119.757,34.5319],[-119.966,34.76],[-119.816,34.5347],[-119.78,34.558],[-119.76,34.5383],[-120.205,34.4951],[-119.759,34.5282],[-119.749,34.5737],[-119.787,34.548],[-120.224,34.4954],[-119.744,34.4838],[-120.206,34.4912],[-119.606,34.4944],[-119.784,34.558],[-119.759,34.5379],[-119.251,34.4707],[-119.749,34.4873],[-120.072,34.5153],[-120.238,34.4883],[-119.757,34.5342],[-119.688,34.4661],[-119.757,34.5119],[-119.019,34.1108],[-119.689,34.4642],[-120.244,34.4931],[-119.786,34.5519],[-119.757,34.5329],[-120.222,34.4961],[-120.239,34.4886],[-120.241,34.4947],[-119.76,34.5373],[-120.209,34.4936],[-120.237,34.4888],[-120.066,34.5361],[-119.016,34.1103],[-120.24,34.4945],[-120.238,34.4942],[-119.759,34.5276],[-119.82,34.5436],[-119.024,34.0901],[-119.636,34.4859],[-119.75,34.6083],[-119.757,34.5315],[-119.76,34.5251],[-120.207,34.4912],[-119.78,34.5579],[-119.758,34.5366],[-119.609,34.4956],[-119.762,34.5381],[-119.611,34.4982],[-120.206,34.4911],[-119.759,34.5281],[-120.207,34.491],[-120.194,34.505],[-120.22,34.5036],[-120.23,34.5015],[-119.015,34.1077],[-119.757,34.5314],[-120.204,34.4985],[-119.78,34.5583],[-120.227,34.4969],[-119.757,34.5335],[-120.059,34.534],[-119.6,34.4935],[-119.743,34.4829],[-119.757,34.5347],[-120.238,34.4872],[-119.688,34.4646],[-119.758,34.5358],[-119.757,34.5328],[-120.207,34.4932],[-119.594,34.4919],[-119.786,34.5527],[-119.757,34.5331],[-119.762,34.5383],[-120.049,34.7447],[-119.762,34.5375],[-120.238,34.4881],[-119.75,34.6084],[-119.689,34.4641],[-119.78,34.5582],[-118.999,34.1195],[-119.759,34.5277],[-120.224,34.5031],[-120.227,34.497],[-119.743,34.4827],[-120.236,34.4892],[-120.226,34.498],[-119.819,34.5433],[-119.744,34.484],[-120.203,34.4978],[-120.194,34.5051],[-119.759,34.5378],[-119.642,34.4618],[-119.642,34.4619],[-120.226,34.5005]];
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