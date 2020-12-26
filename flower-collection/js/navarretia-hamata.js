var subSightings = [[-119.647,34.4606],[-119.746,34.4856],[-119.775,34.7602],[-119.637,34.4971],[-119.697,34.4782],[-119.613,34.4956],[-119.628,34.5335],[-119.649,34.4614],[-119.613,34.4957],[-119.611,34.496],[-119.747,34.486],[-119.718,34.473],[-119.643,34.465],[-119.933,34.7684],[-119.717,34.4736],[-119.714,34.472],[-119.609,34.504],[-119.607,34.5062],[-119.714,34.4717],[-119.817,34.5426],[-119.647,34.4603],[-119.714,34.4725],[-119.637,34.4972],[-119.611,34.4961],[-119.63,34.5353],[-119.644,34.4647],[-119.636,34.4973],[-119.649,34.4612],[-119.898,34.7585],[-119.612,34.4958],[-119.444,34.4915],[-119.627,34.5335],[-119.759,34.5378],[-119.718,34.4739],[-119.712,34.4717],[-119.712,34.4723],[-119.607,34.5059],[-119.628,34.5319],[-119.627,34.4953],[-119.643,34.4651],[-119.711,34.4732],[-119.594,34.4916],[-119.638,34.4971],[-119.623,34.5352],[-119.611,34.4956],[-119.714,34.4724],[-119.716,34.4724],[-119.754,34.5317],[-119.798,34.5277],[-119.638,34.4972],[-119.717,34.4739],[-119.712,34.4719],[-119.624,34.5348],[-119.454,34.4918],[-119.62,34.5401],[-119.63,34.5354],[-119.713,34.4717],[-119.627,34.5341],[-119.713,34.472],[-119.611,34.4965],[-119.637,34.497],[-119.612,34.4965],[-119.65,34.4611],[-119.643,34.4523],[-119.538,34.4873],[-119.715,34.4722],[-119.65,34.4559],[-119.612,34.4959],[-119.607,34.4541],[-119.717,34.4735],[-119.773,34.7597],[-119.648,34.4613],[-119.808,34.5117],[-119.629,34.4954],[-119.453,34.4915],[-119.644,34.4648],[-119.607,34.5057],[-119.611,34.4963],[-119.644,34.465],[-119.995,34.8255],[-119.65,34.4612],[-119.627,34.4954],[-119.599,34.4942],[-119.613,34.4958],[-119.629,34.5353],[-119.433,34.4904],[-119.611,34.4964],[-119.607,34.454],[-119.612,34.496],[-119.718,34.4738],[-119.612,34.4964],[-119.747,34.4856],[-119.648,34.461],[-119.637,34.4976],[-119.607,34.5052],[-119.443,34.4912],[-119.609,34.4948],[-119.693,34.4724],[-119.649,34.4613],[-120.209,34.5035],[-119.648,34.4611],[-119.643,34.4652],[-119.797,34.527],[-119.649,34.4615],[-119.717,34.4737],[-119.65,34.4614],[-119.621,34.5363],[-119.647,34.4604],[-119.644,34.4649],[-119.717,34.4722],[-119.819,34.5432],[-119.717,34.4738],[-119.719,34.474],[-119.792,34.5277],[-119.609,34.495],[-119.717,34.4731],[-119.747,34.4861],[-119.747,34.4858],[-119.648,34.4612],[-119.719,34.4739],[-119.715,34.4723],[-119.922,34.7659],[-119.644,34.4651],[-119.713,34.4721],[-119.717,34.4733],[-119.718,34.4737],[-119.647,34.4608],[-119.643,34.4518],[-119.717,34.4734],[-119.713,34.4723],[-119.711,34.4733],[-119.538,34.4871],[-119.798,34.5272],[-119.606,34.5067],[-119.488,34.487],[-119.711,34.4731],[-119.594,34.4915],[-119.649,34.4616],[-119.628,34.532],[-119.607,34.5061]];
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