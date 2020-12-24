var subSightings = [[-119.566,34.5267],[-119.708,34.4683],[-119.724,34.4758],[-119.825,34.4226],[-119.275,34.4706],[-119.712,34.4651],[-119.513,34.4184],[-119.75,34.597],[-119.75,34.5971],[-119.723,34.4756],[-119.29,34.4784],[-119.012,34.09],[-119.787,34.756],[-119.738,34.5396],[-119.835,34.4181],[-119.282,34.476],[-119.783,34.755],[-119.735,34.4664],[-119.728,34.4597],[-119.502,34.4365],[-119.772,34.5457],[-119.503,34.4404],[-119.832,34.418],[-119.711,34.535],[-119.772,34.5456],[-119.458,34.4923],[-119.735,34.4671],[-119.77,34.5452],[-119.729,34.4546],[-119.502,34.4373],[-119.769,34.5431],[-119.728,34.459],[-119.925,34.7665],[-119.728,34.4598],[-119.717,34.5849],[-119.606,34.5069],[-119.724,34.4756],[-119.732,34.5457],[-119.738,34.4692],[-119.671,34.5067],[-119.73,34.4552],[-119.937,34.806],[-119.261,34.4717],[-119.364,34.3867],[-119.835,34.4182],[-119.737,34.4692],[-119.831,34.4179],[-119.734,34.4629],[-119.503,34.4389],[-119.826,34.4215],[-119.74,34.475],[-119.502,34.4353],[-119.267,34.476],[-119.281,34.4758],[-119.739,34.4713],[-119.274,34.472],[-119.528,34.3965],[-119.729,34.4545],[-119.729,34.455],[-119.893,34.7857],[-119.729,34.4552],[-119.728,34.4592],[-119.735,34.4666],[-119.746,34.5927],[-119.737,34.4688],[-119.728,34.4546],[-119.737,34.4679],[-119.689,34.4528],[-119.742,34.4763],[-119.74,34.4727],[-119.666,34.4678],[-119.755,34.4602],[-119.766,34.5421],[-119.672,34.508],[-119.72,34.4748],[-119.507,34.4359],[-119.712,34.4654],[-119.85,34.7477],[-119.606,34.5067],[-119.738,34.4684],[-119.738,34.4691],[-119.732,34.5456],[-119.705,34.5279],[-119.767,34.5424],[-119.735,34.4669],[-119.742,34.4762],[-119.736,34.4677],[-119.74,34.4728],[-119.74,34.4713],[-119.234,34.4661],[-119.729,34.456],[-119.743,34.4772],[-119.509,34.4383],[-119.732,34.4685],[-119.905,34.7625],[-119.735,34.4668],[-119.032,34.0874],[-119.731,34.4686],[-119.217,34.4827],[-119.506,34.4424],[-119.731,34.4638],[-119.67,34.5066],[-119.818,34.7518],[-119.728,34.4595],[-119.507,34.4433],[-119.732,34.5455],[-119.77,34.5524],[-119.733,34.546],[-119.743,34.4776],[-119.728,34.4599],[-119.607,34.5069],[-119.715,34.5648],[-119.949,34.801],[-119.738,34.4687],[-119.747,34.5926],[-119.735,34.4667],[-119.506,34.4431],[-119.731,34.4687],[-119.729,34.4548],[-119.742,34.476],[-119.73,34.455],[-119.607,34.5071],[-119.74,34.4753],[-119.725,34.4762],[-119.72,34.4749],[-119.872,34.7741],[-119.736,34.4679],[-119.825,34.4227],[-119.729,34.4547],[-119.916,34.7655],[-119.743,34.4771],[-119.822,34.4231],[-119.774,34.7606],[-119.672,34.5071],[-119.723,34.4755],[-119.728,34.4596],[-119.733,34.4617],[-119.565,34.5391],[-119.507,34.4537],[-119.62,34.5391],[-119.735,34.467],[-119.731,34.4689],[-119.461,34.4923],[-119.729,34.4596],[-119.947,34.8065],[-119.732,34.4684],[-119.73,34.4551],[-119.729,34.4625],[-119.832,34.4179],[-119.712,34.4652],[-119.712,34.4653],[-119.777,34.5459],[-119.366,34.3873],[-119.627,34.5227],[-119.877,34.4174]];
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