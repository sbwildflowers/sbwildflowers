var subSightings = [[-119.59,34.4773],[-119.591,34.4772],[-119.464,34.4755],[-119.53,34.4692],[-119.568,34.4673],[-119.507,34.4688],[-119.488,34.4663],[-119.512,34.4687],[-119.485,34.4676],[-119.595,34.4768],[-119.589,34.4754],[-119.752,34.517],[-119.735,34.6055],[-119.586,34.475],[-119.59,34.4771],[-119.547,34.4686],[-119.522,34.4683],[-119.58,34.4744],[-119.604,34.4674],[-119.638,34.4839],[-119.751,34.5135],[-119.584,34.4752],[-119.649,34.4874],[-119.603,34.4752],[-119.472,34.4721],[-119.755,34.5198],[-119.544,34.4697],[-119.603,34.4677],[-119.639,34.4838],[-119.59,34.4768],[-119.95,34.5271],[-119.464,34.4754],[-119.58,34.4742],[-119.59,34.4772],[-119.714,34.4945],[-119.751,34.5157],[-119.604,34.4675],[-119.34,34.6031],[-119.537,34.469],[-119.589,34.4756],[-119.597,34.4749],[-119.934,34.5271],[-119.593,34.4771],[-119.665,34.4901],[-119.577,34.4729],[-119.604,34.4676],[-119.59,34.4776],[-119.752,34.5171],[-119.603,34.4679],[-119.645,34.4694],[-119.557,34.469],[-119.649,34.4875],[-119.493,34.4661],[-119.714,34.495],[-119.669,34.4889],[-119.59,34.4767],[-119.851,34.4108],[-119.469,34.474],[-119.485,34.4698],[-119.591,34.4773],[-119.623,34.4826],[-119.592,34.4772],[-119.557,34.4691],[-119.755,34.5202],[-119.725,34.5009],[-119.735,34.6054],[-119.589,34.4755],[-119.589,34.4752],[-119.59,34.4769],[-119.603,34.4678],[-119.692,34.4859],[-119.59,34.477],[-119.755,34.52],[-119.722,34.5012],[-119.752,34.5169],[-119.543,34.4699],[-119.543,34.4698],[-119.372,34.6162],[-119.604,34.4672],[-119.638,34.4838],[-119.547,34.4685],[-119.451,34.4762],[-119.592,34.4773],[-119.535,34.4686],[-119.586,34.4752],[-119.54,34.4702],[-119.533,34.4681],[-119.552,34.4682],[-119.547,34.4688],[-119.638,34.484],[-119.507,34.469],[-119.644,34.4863],[-119.718,34.4994],[-119.645,34.4695],[-119.75,34.5154],[-119.504,34.4669],[-119.542,34.47],[-119.645,34.4865],[-119.584,34.4756],[-119.64,34.4856],[-119.7,34.496],[-119.513,34.4687],[-119.647,34.4873],[-119.587,34.4753],[-119.709,34.4952],[-119.604,34.4673],[-119.475,34.4697],[-119.751,34.5134],[-119.548,34.4685],[-119.499,34.4656],[-119.502,34.4666],[-119.54,34.4701],[-119.605,34.4674],[-119.527,34.4666],[-119.618,34.482]];
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