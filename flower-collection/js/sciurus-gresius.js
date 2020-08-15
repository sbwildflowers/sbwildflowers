var subSightings = [[-119.712,34.4426],[-119.732,34.4648],[-119.734,34.4508],[-120.011,34.7511],[-119.624,34.4628],[-119.697,34.4786],[-119.689,34.4724],[-119.636,34.486],[-119.733,34.452],[-119.725,34.4761],[-119.842,34.5006],[-119.757,34.5106],[-119.633,34.5058],[-119.745,34.4931],[-119.725,34.476],[-119.726,34.4753],[-119.745,34.6007],[-119.654,34.4575],[-119.588,34.4807],[-119.633,34.4961],[-119.694,34.4574],[-119.727,34.4742],[-119.653,34.4625],[-119.734,34.4522],[-119.745,34.494],[-119.623,34.4691],[-119.757,34.5147],[-119.688,34.4689],[-119.726,34.4748],[-119.636,34.4861],[-119.675,34.458],[-119.758,34.5096],[-119.724,34.4762],[-119.68,34.4774],[-119.755,34.5131],[-119.59,34.4682],[-119.748,34.4904],[-119.83,34.5147],[-119.593,34.4589],[-119.757,34.5145],[-119.593,34.4726],[-119.654,34.4579],[-119.745,34.4934],[-119.724,34.4764],[-119.633,34.5064],[-119.732,34.4312],[-119.657,34.4637],[-119.697,34.4818],[-119.759,34.5192],[-119.728,34.4738],[-119.699,34.4724],[-119.732,34.4662],[-119.731,34.429],[-119.591,34.4527],[-119.758,34.4368],[-119.735,34.45],[-119.591,34.4579],[-119.681,34.4572],[-119.784,34.4306],[-119.786,34.421],[-119.592,34.4721],[-119.757,34.5111],[-119.698,34.4448],[-119.707,34.4692],[-119.746,34.494],[-119.687,34.4535],[-119.73,34.4611],[-119.636,34.4956],[-119.746,34.492],[-119.757,34.5161],[-119.688,34.4647],[-119.638,34.4968],[-119.624,34.4611],[-119.687,34.465],[-119.649,34.463],[-119.658,34.4655],[-119.628,34.4954],[-119.757,34.5141],[-119.768,34.4361],[-119.495,34.479],[-119.689,34.4705],[-119.729,34.4562],[-119.672,34.4975],[-119.592,34.4718],[-119.636,34.4969],[-119.624,34.4704],[-119.242,34.4977],[-119.598,34.4572],[-119.96,34.5387]];
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