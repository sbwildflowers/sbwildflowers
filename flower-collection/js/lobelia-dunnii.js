var subSightings = [[-119.591,34.464],[-119.633,34.506],[-119.634,34.5048],[-119.59,34.4694],[-119.633,34.5049],[-119.591,34.4638],[-119.586,34.47],[-119.637,34.4962],[-119.633,34.5059],[-119.591,34.4637],[-119.786,34.5574],[-119.65,34.4638],[-119.595,34.4736],[-119.623,34.4694],[-119.66,34.4732],[-119.651,34.4635],[-119.586,34.4699],[-119.786,34.55],[-119.623,34.4693],[-119.633,34.5066],[-119.595,34.4738],[-119.633,34.5062],[-119.65,34.4637],[-119.659,34.4666],[-119.595,34.492],[-119.763,34.5648],[-119.495,34.4792],[-119.591,34.4632],[-119.786,34.5583],[-119.763,34.5649],[-119.633,34.5061],[-119.659,34.4669],[-119.594,34.4916],[-119.623,34.4692],[-119.77,34.5609],[-119.595,34.4733],[-119.771,34.5607],[-119.594,34.4913],[-119.66,34.4799],[-119.633,34.505],[-119.594,34.4705],[-119.651,34.4637],[-120.011,34.7511],[-119.624,34.4694],[-119.592,34.4721],[-119.623,34.4689],[-119.651,34.4639],[-119.591,34.4635],[-119.634,34.5049],[-119.633,34.5058],[-119.595,34.4739],[-119.594,34.4738],[-119.763,34.565],[-119.624,34.4693],[-119.594,34.4915],[-119.595,34.4737],[-119.633,34.5051],[-119.594,34.4706],[-119.747,34.5753],[-119.594,34.4739],[-119.594,34.4914],[-119.595,34.4734],[-119.633,34.5064],[-119.591,34.4634],[-119.77,34.5618],[-119.66,34.4805],[-119.66,34.4804],[-119.632,34.5068],[-119.634,34.5051],[-119.651,34.4638],[-119.66,34.4796],[-119.65,34.4662],[-119.659,34.4668],[-119.624,34.4692],[-119.623,34.4691],[-119.634,34.505],[-119.633,34.5063],[-119.585,34.4705],[-119.786,34.5572],[-119.633,34.5065],[-119.655,34.4591],[-119.496,34.484],[-119.496,34.4833],[-119.592,34.4723],[-119.595,34.4731],[-119.654,34.4589],[-119.495,34.483],[-119.631,34.5086],[-119.584,34.4706],[-119.594,34.4727],[-119.629,34.5213],[-119.585,34.4704],[-119.574,34.4876],[-119.686,34.5162],[-119.574,34.4878],[-119.624,34.4691],[-119.592,34.4722],[-119.586,34.4701],[-119.591,34.4636],[-119.595,34.4735]];
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