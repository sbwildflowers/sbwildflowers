var subSightings = [[-119.761,34.5392],[-119.785,34.4297],[-119.798,34.4239],[-120.214,34.5034],[-119.639,34.4589],[-119.801,34.4188],[-119.792,34.4182],[-119.75,34.5734],[-119.628,34.5282],[-120.237,34.4937],[-119.76,34.5373],[-119.756,34.5299],[-119.755,34.5296],[-119.788,34.4241],[-119.766,34.5649],[-119.787,34.4206],[-119.756,34.5298],[-119.77,34.5449],[-119.8,34.4198],[-119.802,34.4217],[-119.997,34.737],[-119.788,34.418],[-119.227,34.4652],[-119.754,34.5319],[-119.731,34.4687],[-119.995,34.8257],[-119.496,34.4846],[-119.777,34.4322],[-119.788,34.4179],[-119.787,34.5462],[-119.847,34.4067],[-119.802,34.4189],[-119.62,34.5404],[-119.769,34.5537],[-119.8,34.4224],[-119.255,34.4782],[-119.631,34.5091],[-119.631,34.509],[-119.731,34.4617],[-119.691,34.4606],[-119.76,34.5372],[-119.623,34.4579],[-119.146,34.7233],[-119.787,34.4193],[-119.787,34.4201],[-119.76,34.5667],[-119.581,34.4813],[-119.758,34.5684],[-119.768,34.5633],[-119.755,34.5319],[-119.765,34.5648],[-119.622,34.4561],[-119.76,34.5375],[-119.795,34.4241],[-119.775,34.5449],[-119.766,34.5648],[-119.731,34.4615],[-119.629,34.5353],[-119.778,34.553],[-119.757,34.5296],[-120.061,34.7429],[-119.76,34.537],[-119.623,34.4577],[-119.76,34.5665],[-119.758,34.5296],[-119.787,34.554],[-119.732,34.4686],[-119.802,34.4216],[-119.623,34.5353],[-119.77,34.5454],[-119.755,34.5315],[-119.707,34.4716],[-119.768,34.5632],[-119.757,34.57],[-119.955,34.539],[-119.623,34.4576],[-119.758,34.5295],[-119.626,34.5345],[-119.621,34.5362],[-119.752,34.5299],[-119.706,34.4448],[-119.793,34.4242],[-119.613,34.448],[-119.611,34.4488],[-119.703,34.4724],[-119.268,34.4752],[-119.761,34.5376],[-119.802,34.514],[-119.623,34.458],[-119.769,34.5419],[-119.754,34.5262],[-119.258,34.4737],[-119.751,34.5287],[-119.755,34.5297],[-119.452,34.4917],[-119.746,34.5557],[-119.758,34.529],[-119.763,34.5655],[-119.787,34.4205],[-119.757,34.5295],[-119.702,34.4724],[-119.786,34.5526],[-119.749,34.525],[-119.757,34.5686],[-119.729,34.4543],[-119.761,34.5393],[-119.61,34.5012],[-119.76,34.5214],[-119.709,34.4677],[-119.882,34.4128],[-119.755,34.5314],[-119.703,34.4726]];
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