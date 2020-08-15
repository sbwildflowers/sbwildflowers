var subSightings = [[-119.747,34.5944],[-119.611,34.4502],[-119.749,34.4337],[-119.627,34.4716],[-119.729,34.4567],[-119.639,34.457],[-119.766,34.5421],[-119.762,34.541],[-119.786,34.4274],[-119.731,34.4552],[-119.75,34.6173],[-119.28,34.5185],[-119.729,34.4566],[-119.629,34.512],[-119.752,34.5977],[-119.729,34.4614],[-119.754,34.5778],[-119.729,34.4564],[-120.233,34.4802],[-119.732,34.4548],[-119.728,34.4581],[-119.731,34.4553],[-119.712,34.4653],[-119.751,34.6089],[-119.73,34.4624],[-119.729,34.4569],[-119.78,34.5586],[-119.794,34.4242],[-119.729,34.4579],[-119.723,34.5845],[-119.729,34.4561],[-120.03,34.4641],[-119.653,34.456],[-119.783,34.5497],[-119.722,34.4755],[-119.732,34.454],[-119.749,34.5734],[-119.721,34.4753],[-119.728,34.4579],[-119.765,34.5418],[-119.787,34.5499],[-119.746,34.5942],[-119.74,34.4285],[-119.729,34.4568],[-119.752,34.6096],[-119.775,34.5579],[-119.784,34.5483],[-119.766,34.5648],[-119.703,34.4725],[-119.749,34.6041],[-119.281,34.4758],[-119.492,34.4869],[-119.751,34.4354],[-119.778,34.5525],[-119.794,34.4241],[-119.773,34.5577],[-119.626,34.4954],[-119.724,34.4759],[-119.65,34.5185],[-119.729,34.457],[-119.787,34.5475],[-119.729,34.456],[-119.729,34.4543],[-120.054,34.7432],[-119.765,34.5417],[-119.728,34.458],[-119.756,34.5721],[-119.75,34.603],[-119.744,34.4301],[-119.013,34.0872],[-119.729,34.4563],[-119.737,34.4677],[-119.728,34.4598],[-119.767,34.5422],[-119.786,34.553],[-119.766,34.5422],[-119.751,34.4355],[-119.743,34.5875],[-119.601,34.5126],[-119.783,34.5489],[-119.79,34.418],[-119.66,34.4741],[-119.769,34.5622],[-119.786,34.5537],[-119.73,34.4623],[-119.73,34.4622],[-119.723,34.5836],[-119.728,34.4561],[-119.723,34.4754],[-119.779,34.553],[-119.728,34.4576],[-119.729,34.4562],[-119.743,34.4809],[-119.767,34.5423],[-119.728,34.4593],[-119.587,34.4781],[-119.763,34.6226],[-119.732,34.4549],[-119.751,34.6091],[-119.78,34.559],[-119.875,34.4175],[-119.782,34.5589],[-119.786,34.5535],[-119.875,34.4177],[-119.729,34.458],[-119.74,34.4282]];
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