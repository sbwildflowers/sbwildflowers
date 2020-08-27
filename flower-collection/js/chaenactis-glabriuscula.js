var subSightings = [[-119.645,34.5147],[-119.645,34.5162],[-119.647,34.5163],[-119.966,34.8141],[-119.61,34.5012],[-119.634,34.5103],[-119.611,34.4975],[-119.568,34.4779],[-119.634,34.5102],[-119.757,34.5701],[-119.646,34.5157],[-119.32,34.5963],[-119.614,34.4955],[-119.314,34.6979],[-119.609,34.5025],[-119.633,34.5157],[-119.598,34.4943],[-119.62,34.5405],[-119.319,34.6952],[-119.757,34.5702],[-119.631,34.5089],[-119.643,34.5144],[-119.632,34.5084],[-119.633,34.5087],[-119.372,34.6162],[-119.185,34.7271],[-119.617,34.4947],[-119.642,34.5135],[-119.919,34.767],[-119.634,34.5109],[-119.749,34.6152],[-119.646,34.5149],[-119.752,34.5734],[-119.752,34.573],[-119.752,34.5733],[-119.647,34.5172],[-119.565,34.483],[-119.612,34.4965],[-119.956,34.7819],[-119.609,34.5019],[-119.63,34.511],[-119.611,34.4974],[-119.634,34.5105],[-119.752,34.5726],[-119.56,34.4862],[-119.631,34.5092],[-119.645,34.5155],[-119.757,34.5698],[-119.634,34.5101],[-119.63,34.5115],[-119.565,34.4792],[-119.609,34.5024],[-119.633,34.5097],[-119.633,34.509],[-119.752,34.5732],[-120.044,34.742],[-119.744,34.5883],[-119.633,34.5089],[-119.631,34.5093],[-119.752,34.5729],[-119.261,34.5842],[-119.614,34.4953],[-119.645,34.5163],[-119.566,34.479],[-119.744,34.5882],[-119.565,34.4829],[-119.646,34.5145],[-119.634,34.5108],[-120.013,34.74],[-119.634,34.51],[-119.633,34.5091],[-119.635,34.5107],[-119.649,34.5185],[-119.372,34.6166],[-119.635,34.5108],[-119.61,34.5018],[-119.62,34.5406],[-119.757,34.5695],[-119.609,34.5037],[-119.647,34.5165],[-119.645,34.5148],[-119.614,34.4952],[-119.744,34.5892],[-119.631,34.509],[-119.613,34.4955],[-119.615,34.4954],[-119.752,34.5731],[-119.643,34.5141],[-119.63,34.5186],[-119.648,34.5173],[-119.753,34.5726],[-119.618,34.4947],[-119.633,34.5086],[-119.962,34.8125],[-119.633,34.5095],[-119.565,34.4791],[-119.631,34.5091],[-119.757,34.5699],[-119.321,34.6958],[-119.646,34.5147],[-119.617,34.4946],[-119.634,34.5111],[-119.63,34.5107],[-119.539,34.4869],[-119.646,34.5148],[-119.634,34.5107],[-120.043,34.7428],[-119.63,34.5114],[-119.63,34.5109],[-119.645,34.5156],[-119.633,34.5098],[-119.646,34.5158],[-119.645,34.5161],[-119.643,34.5143],[-119.612,34.4964],[-119.92,34.7669],[-119.649,34.5184],[-119.967,34.814],[-119.744,34.5889],[-119.185,34.726],[-119.614,34.4954],[-119.598,34.4944],[-119.609,34.5017],[-119.609,34.5023],[-119.648,34.5171],[-119.646,34.515],[-119.873,34.7888],[-119.752,34.5728],[-119.645,34.5157],[-119.633,34.5096],[-119.609,34.5022],[-119.957,34.7592],[-119.757,34.57],[-119.645,34.5151],[-119.648,34.5175],[-119.634,34.5099],[-119.634,34.511],[-119.61,34.5019],[-119.645,34.5154],[-119.646,34.5146],[-119.635,34.511],[-119.611,34.4976],[-119.757,34.5694],[-119.642,34.5136],[-119.645,34.5146],[-119.567,34.4786],[-119.633,34.5094],[-119.146,34.7238],[-120.035,34.7434],[-119.744,34.5891],[-119.598,34.4942],[-119.646,34.5151],[-119.753,34.5727],[-119.643,34.5142],[-119.648,34.5172],[-119.649,34.5187],[-119.648,34.5177],[-119.612,34.4962],[-119.372,34.616],[-119.643,34.5145],[-119.757,34.5703],[-119.634,34.5098],[-119.643,34.514]];
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