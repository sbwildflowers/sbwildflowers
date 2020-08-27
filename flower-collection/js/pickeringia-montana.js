var subSightings = [[-119.645,34.4695],[-119.645,34.4692],[-119.963,34.5238],[-120.026,34.5335],[-119.645,34.4694],[-119.68,34.4781],[-119.643,34.4699],[-119.751,34.5211],[-119.648,34.4611],[-119.751,34.5212],[-119.495,34.4657],[-119.75,34.5218],[-119.568,34.4873],[-119.951,34.5267],[-119.518,34.4694],[-119.81,34.5183],[-119.649,34.4613],[-120.202,34.5],[-119.643,34.4702],[-119.644,34.4696],[-119.752,34.5126],[-119.753,34.5158],[-119.841,34.5008],[-119.704,34.4938],[-119.699,34.497],[-119.75,34.5193],[-119.644,34.4701],[-119.815,34.5257],[-119.644,34.4697],[-119.751,34.521],[-119.56,34.4868],[-119.753,34.5126],[-119.645,34.4693],[-119.638,34.4842],[-119.554,34.4686],[-119.709,34.4953],[-119.965,34.5255],[-119.921,34.5254],[-119.952,34.5273],[-119.699,34.4897],[-119.768,34.5064],[-119.635,34.4835],[-119.752,34.5125],[-119.649,34.4615],[-119.644,34.4695],[-119.643,34.4666],[-119.881,34.5111],[-119.65,34.4614],[-119.75,34.5213],[-119.69,34.4866],[-119.753,34.5157],[-119.881,34.511],[-119.699,34.4901],[-119.866,34.5058],[-119.638,34.4843],[-119.647,34.4606],[-119.844,34.5001],[-119.954,34.5261],[-119.888,34.514],[-119.681,34.4784],[-119.644,34.4691],[-119.954,34.526],[-119.751,34.5209],[-119.699,34.4971],[-119.556,34.469],[-119.649,34.4614],[-119.715,34.4945],[-119.647,34.4607],[-119.812,34.5235],[-120.178,34.5081],[-119.695,34.4718],[-119.694,34.4719],[-119.248,34.4959],[-119.638,34.4841],[-119.7,34.4897],[-119.752,34.5196],[-119.645,34.4618],[-119.568,34.4871],[-119.638,34.4844],[-119.65,34.4616],[-119.494,34.466],[-119.285,34.4775],[-119.75,34.5194],[-119.753,34.516],[-119.932,34.527],[-119.691,34.4875],[-119.75,34.5192],[-119.645,34.4691],[-119.99,34.5304]];
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