var subSightings = [[-119.654,34.459],[-119.585,34.4797],[-119.759,34.5248],[-119.673,34.4982],[-119.57,34.472],[-119.222,34.4902],[-119.632,34.5069],[-119.694,34.4988],[-119.759,34.5249],[-119.667,34.5228],[-119.72,34.5006],[-119.966,34.7359],[-119.633,34.5065],[-119.688,34.519],[-119.495,34.4827],[-119.632,34.5074],[-119.675,34.5233],[-119.757,34.5098],[-119.632,34.5071],[-119.595,34.4735],[-119.694,34.499],[-119.868,34.5079],[-119.69,34.5019],[-119.657,34.4635],[-119.69,34.502],[-119.968,34.739],[-119.693,34.499],[-119.68,34.497],[-119.755,34.5125],[-119.567,34.4775],[-119.835,34.5233],[-119.633,34.5063],[-119.596,34.4702],[-119.983,34.757],[-119.748,34.4894],[-119.757,34.5097],[-119.759,34.5251],[-119.633,34.505],[-119.606,34.4784],[-119.664,34.5232],[-119.681,34.4968],[-119.136,34.4534],[-119.694,34.4989],[-119.654,34.4589],[-119.972,34.7503],[-119.693,34.4989],[-119.221,34.4894],[-119.567,34.4773],[-119.753,34.5095],[-119.871,34.5073],[-119.633,34.5049],[-119.64,34.4636],[-119.733,34.5033],[-119.664,34.4691],[-119.748,34.4895],[-119.497,34.4764],[-119.764,34.5645],[-119.755,34.5123],[-119.693,34.5002],[-119.668,34.5227],[-119.59,34.4696],[-119.664,34.5227],[-119.973,34.7506],[-119.633,34.5059],[-119.595,34.4736],[-119.757,34.5099],[-119.96,34.539],[-119.664,34.5234],[-119.753,34.5096],[-119.759,34.5246],[-119.633,34.5054],[-119.975,34.7495],[-119.593,34.4734],[-119.668,34.5228],[-120.008,34.7497],[-119.585,34.4798],[-119.571,34.472],[-119.668,34.5226],[-119.971,34.7444],[-119.633,34.5055],[-119.757,34.5107],[-119.681,34.497],[-119.659,34.5235],[-119.753,34.5098],[-119.496,34.4823],[-119.755,34.5129],[-119.672,34.4977],[-119.958,34.7574],[-119.633,34.5058],[-119.586,34.4799],[-119.588,34.4694],[-119.216,34.4871],[-119.57,34.4719],[-119.753,34.5102],[-119.251,34.5316],[-119.754,34.5098],[-119.496,34.4817],[-119.976,34.7464],[-119.595,34.4733],[-119.452,34.4915],[-119.595,34.4734],[-119.7,34.4982],[-119.753,34.5097],[-119.654,34.4591],[-119.712,34.495],[-119.693,34.4986],[-120.002,34.7479],[-119.764,34.5646],[-119.567,34.477]];
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