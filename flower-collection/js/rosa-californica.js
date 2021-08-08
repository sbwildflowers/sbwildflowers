var subSightings = [[-119.732,34.4684],[-119.623,34.457],[-119.608,34.5053],[-119.74,34.4046],[-119.528,34.3964],[-119.732,34.468],[-119.595,34.4929],[-119.774,34.7605],[-119.63,34.5121],[-119.733,34.4617],[-119.63,34.4953],[-119.633,34.5149],[-119.927,34.7661],[-119.757,34.57],[-119.003,34.0939],[-119.626,34.4954],[-119.79,34.431],[-119.63,34.4955],[-119.739,34.4059],[-119.628,34.5268],[-119.63,34.4956],[-119.751,34.5017],[-119.751,34.5021],[-119.72,34.4748],[-119.764,34.5645],[-119.625,34.4953],[-119.626,34.4953],[-119.61,34.5017],[-119.609,34.503],[-119.733,34.4683],[-119.732,34.4532],[-119.766,34.6321],[-119.757,34.5703],[-119.77,34.5611],[-119.741,34.4049],[-119.592,34.4915],[-119.733,34.4682],[-119.732,34.4682],[-119.598,34.4939],[-119.733,34.468],[-119.609,34.5021],[-119.626,34.4955],[-119.769,34.4368],[-119.739,34.4058],[-119.732,34.4534],[-119.743,34.404],[-119.971,34.7502],[-119.598,34.4938],[-119.75,34.5581],[-119.63,34.5122],[-119.628,34.527],[-119.74,34.4045],[-119.632,34.5149],[-119.62,34.494],[-119.627,34.527],[-119.592,34.4916],[-119.759,34.5277],[-119.61,34.5011],[-119.688,34.5531],[-119.75,34.5582],[-119.631,34.5142],[-119.607,34.4937],[-119.732,34.4533],[-119.768,34.437],[-119.751,34.502],[-119.743,34.4038],[-119.63,34.4954],[-119.732,34.4681],[-119.733,34.4681],[-119.757,34.5704],[-119.846,34.4089],[-119.732,34.4657],[-119.631,34.4956],[-119.813,34.4244],[-119.759,34.5279],[-119.628,34.5219],[-119.757,34.5705],[-119.732,34.4679],[-119.725,34.4762],[-119.574,34.4879],[-119.74,34.4047],[-119.629,34.5213],[-119.808,34.7578]];
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