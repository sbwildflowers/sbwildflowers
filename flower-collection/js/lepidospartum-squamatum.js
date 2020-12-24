var subSightings = [[-119.766,34.5413],[-119.601,34.5101],[-119.758,34.5401],[-119.761,34.5397],[-119.609,34.5022],[-119.626,34.5345],[-119.595,34.5135],[-119.602,34.5117],[-119.734,34.5358],[-119.302,34.5953],[-119.769,34.5502],[-119.767,34.5399],[-119.761,34.5401],[-119.764,34.5405],[-119.787,34.5469],[-119.676,34.5239],[-119.61,34.502],[-119.77,34.5508],[-119.609,34.5023],[-119.379,34.5065],[-119.773,34.546],[-119.605,34.5071],[-119.62,34.5367],[-119.62,34.537],[-119.77,34.5452],[-119.185,34.7269],[-119.736,34.5384],[-119.769,34.55],[-119.716,34.5396],[-119.606,34.5069],[-119.77,34.5462],[-119.631,34.5188],[-119.776,34.5455],[-119.628,34.5346],[-119.77,34.545],[-119.609,34.5021],[-119.185,34.7268],[-119.62,34.5383],[-119.714,34.5349],[-119.568,34.5226],[-119.612,34.4964],[-119.63,34.5117],[-119.608,34.5029],[-119.321,34.6965],[-119.613,34.4962],[-119.524,34.4876],[-119.147,34.7241],[-119.185,34.7264],[-119.264,34.5653],[-119.351,34.6038],[-119.892,34.7544],[-119.612,34.4966],[-119.601,34.5117],[-119.749,34.5383],[-119.62,34.5368],[-119.625,34.5346],[-119.995,34.8259],[-119.321,34.6962],[-119.766,34.5398],[-119.612,34.4961],[-119.146,34.7233],[-119.601,34.5118],[-119.761,34.5403],[-119.619,34.5365],[-119.755,34.5398],[-119.724,34.5364],[-119.791,34.5324],[-119.612,34.4965],[-119.762,34.5402],[-119.609,34.5024],[-119.732,34.5207],[-119.609,34.5025],[-119.754,34.5396],[-119.623,34.5352],[-119.775,34.7602],[-119.629,34.5348],[-119.602,34.5116],[-119.763,34.54],[-119.601,34.512],[-119.763,34.5399],[-119.762,34.5404],[-119.958,34.8104],[-119.77,34.5461],[-119.762,34.5398],[-119.753,34.5394],[-119.833,34.5238],[-119.768,34.5409],[-119.768,34.5399],[-119.777,34.7594],[-119.896,34.7585],[-119.771,34.5554],[-119.767,34.5405],[-119.764,34.5402],[-119.765,34.5406],[-119.606,34.507],[-119.626,34.5348],[-119.767,34.5398],[-119.57,34.5038],[-119.747,34.5381],[-119.601,34.5112],[-119.61,34.5016],[-119.734,34.537],[-119.631,34.5189],[-119.625,34.5344],[-119.609,34.502],[-119.738,34.5394],[-119.611,34.5055],[-119.591,34.5145],[-119.62,34.5405],[-119.895,34.7585],[-119.256,34.7166],[-119.626,34.5343],[-119.609,34.5038],[-119.606,34.5071],[-119.725,34.5346],[-119.624,34.5349],[-119.625,34.512],[-119.259,34.5751],[-119.765,34.5398],[-119.605,34.507],[-119.714,34.5351],[-119.478,34.4901],[-119.61,34.5018],[-119.29,34.4785],[-119.769,34.5501],[-119.764,34.5387],[-119.61,34.5017],[-119.779,34.7554],[-119.775,34.5446],[-119.774,34.5438],[-119.613,34.4961],[-119.767,34.5425],[-119.601,34.5116],[-119.774,34.5436],[-119.617,34.5111],[-119.612,34.4962],[-119.622,34.536],[-119.609,34.5039],[-119.607,34.5071],[-119.732,34.5209],[-119.375,34.5051],[-119.622,34.5361],[-120.102,34.7231],[-119.944,34.7717],[-119.762,34.5403],[-119.525,34.4874],[-119.723,34.5378],[-119.775,34.544],[-119.676,34.5236],[-119.769,34.5491],[-119.77,34.5467],[-119.535,34.4878],[-119.769,34.554],[-119.381,34.5073],[-119.18,34.726],[-119.243,34.5539],[-119.762,34.5399],[-119.622,34.5359],[-119.321,34.6959],[-119.262,34.5839],[-119.767,34.5421],[-119.383,34.5078],[-119.931,34.768],[-119.864,34.74],[-119.62,34.5369],[-119.62,34.5381],[-119.761,34.5396],[-119.622,34.5362],[-119.554,34.4959],[-119.61,34.5019],[-119.185,34.727],[-119.723,34.5382],[-119.674,34.5471],[-119.609,34.5019],[-119.612,34.496],[-119.595,34.4925],[-119.622,34.5358],[-119.612,34.4963]];
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