var subSightings = [[-119.729,34.4719],[-119.632,34.5185],[-119.402,34.4986],[-119.597,34.4936],[-119.59,34.4694],[-119.634,34.5049],[-119.526,34.4872],[-119.56,34.4865],[-119.772,34.5457],[-119.67,34.5067],[-119.633,34.5074],[-119.628,34.5345],[-119.632,34.5074],[-119.776,34.5447],[-119.685,34.523],[-119.63,34.5121],[-119.79,34.5453],[-119.632,34.5079],[-119.596,34.4927],[-119.633,34.5073],[-119.763,34.5398],[-120.007,34.8091],[-119.774,34.7603],[-119.631,34.5191],[-119.611,34.4972],[-119.634,34.4968],[-119.746,34.5927],[-119.612,34.4966],[-119.627,34.5119],[-119.747,34.5229],[-119.633,34.5154],[-119.628,34.5279],[-119.767,34.5418],[-119.672,34.5023],[-119.633,34.505],[-119.597,34.4704],[-119.79,34.5448],[-119.729,34.4718],[-119.786,34.5587],[-119.631,34.5305],[-119.835,34.5265],[-119.688,34.5189],[-119.735,34.5371],[-119.67,34.519],[-119.713,34.5346],[-119.632,34.5066],[-119.646,34.5148],[-119.59,34.4695],[-119.631,34.5211],[-119.627,34.5247],[-119.632,34.5147],[-119.746,34.5398],[-119.593,34.4916],[-119.778,34.5464],[-119.627,34.5262],[-119.612,34.4967],[-119.631,34.5085],[-119.617,34.5364],[-119.551,34.486],[-119.383,34.5094],[-119.761,34.539],[-119.766,34.5641],[-119.631,34.5089],[-119.904,34.7789],[-119.632,34.5073],[-119.68,34.5141],[-119.785,34.5561],[-119.748,34.5383],[-119.634,34.5046],[-119.745,34.5059],[-119.63,34.5126],[-119.766,34.5411],[-119.68,34.5148],[-119.629,34.5272],[-119.751,34.539],[-119.316,34.2809],[-119.452,34.4916],[-119.676,34.5111],[-119.611,34.4973],[-119.691,34.521],[-119.786,34.5503],[-119.747,34.5231],[-119.765,34.5418],[-119.632,34.5065],[-119.786,34.5536],[-119.785,34.5553],[-119.633,34.5072],[-119.63,34.5122],[-119.757,34.57],[-119.766,34.6321],[-119.687,34.5176],[-119.63,34.5118],[-119.631,34.5301],[-119.596,34.4936],[-119.632,34.5075],[-119.611,34.4967],[-119.631,34.5186],[-119.748,34.5231],[-119.9,34.7815],[-119.724,34.5352],[-119.786,34.5578],[-119.618,34.4943],[-120.007,34.8089],[-119.607,34.4941],[-119.769,34.563],[-119.565,34.5325],[-119.689,34.4901],[-119.764,34.5647],[-119.547,34.4917],[-119.631,34.5198],[-119.68,34.5139],[-119.588,34.4709],[-119.632,34.5148],[-119.754,34.5396]];
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