var subSightings = [[-119.757,34.5312],[-120.06,34.7386],[-120.063,34.7386],[-119.955,34.7584],[-119.757,34.5297],[-120.06,34.7382],[-119.607,34.4944],[-120.06,34.7397],[-119.757,34.5162],[-120.064,34.7371],[-119.609,34.4951],[-119.774,34.5459],[-120.063,34.738],[-120.063,34.7373],[-120.065,34.7368],[-119.995,34.8257],[-119.605,34.5071],[-120.097,34.6929],[-119.786,34.5518],[-119.637,34.4971],[-119.757,34.5317],[-119.786,34.5494],[-120.048,34.7447],[-119.757,34.5175],[-119.614,34.4953],[-119.637,34.4972],[-119.606,34.4941],[-119.758,34.532],[-119.608,34.4945],[-119.758,34.5184],[-119.773,34.5461],[-119.597,34.4943],[-119.597,34.494],[-119.614,34.4956],[-119.757,34.5315],[-119.638,34.4971],[-119.757,34.5314],[-119.607,34.4945],[-119.995,34.8255],[-119.613,34.4956],[-119.606,34.5069],[-119.786,34.5519],[-119.757,34.5158],[-120.097,34.6927],[-119.787,34.5491],[-119.77,34.545],[-119.758,34.529],[-119.757,34.5295],[-119.786,34.5495],[-119.786,34.552],[-119.757,34.5174],[-119.757,34.5178],[-119.757,34.5177],[-120.062,34.7412],[-119.757,34.5345],[-119.757,34.5159],[-120.062,34.7381],[-119.997,34.8005],[-119.759,34.52],[-119.609,34.495],[-119.614,34.4954],[-120.06,34.7387],[-119.612,34.4959],[-119.757,34.5176],[-119.787,34.549],[-119.613,34.4957],[-119.774,34.5461],[-119.761,34.5384],[-120.061,34.7397],[-119.758,34.5323],[-119.773,34.5459],[-119.597,34.4941],[-119.757,34.5161],[-119.761,34.5383],[-119.609,34.5042],[-119.757,34.5296],[-119.77,34.5451],[-119.638,34.497],[-120.062,34.741],[-119.611,34.497],[-119.613,34.4955],[-119.637,34.497],[-120.062,34.7388],[-119.757,34.5342],[-119.772,34.5447],[-119.597,34.4942],[-119.757,34.5294],[-119.762,34.5375],[-119.757,34.5313],[-119.995,34.8258],[-119.758,34.5179],[-120.102,34.7205],[-120.062,34.7411],[-119.761,34.5382],[-119.608,34.4944],[-119.757,34.5156],[-119.611,34.4981],[-120.049,34.7443],[-119.758,34.5183],[-119.757,34.5163],[-120.061,34.74],[-120.098,34.6922],[-119.774,34.5462],[-119.745,34.599],[-119.773,34.546],[-119.749,34.6006],[-119.761,34.5376],[-120.048,34.7445],[-120.065,34.737]];
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