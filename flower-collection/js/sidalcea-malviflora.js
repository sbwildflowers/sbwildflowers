var subSightings = [[-119.76,34.5382],[-119.689,34.4735],[-119.689,34.4724],[-119.756,34.5125],[-119.774,34.5459],[-119.753,34.5277],[-119.761,34.5393],[-119.749,34.4881],[-119.761,34.5383],[-119.689,34.4731],[-119.757,34.5326],[-119.729,34.4609],[-119.758,34.537],[-119.749,34.4876],[-119.773,34.5461],[-119.759,34.5266],[-120.058,34.5345],[-119.729,34.4612],[-119.76,34.5224],[-119.757,34.5314],[-119.613,34.4957],[-119.689,34.4727],[-119.591,34.4607],[-119.759,34.5277],[-119.774,34.5462],[-119.786,34.5489],[-119.761,34.5385],[-119.753,34.5276],[-119.77,34.545],[-119.688,34.4749],[-119.758,34.5286],[-119.831,34.5218],[-119.688,34.4643],[-119.757,34.5177],[-119.76,34.5234],[-119.759,34.5281],[-119.83,34.5159],[-119.786,34.5527],[-119.774,34.5463],[-119.759,34.527],[-119.753,34.5279],[-119.758,34.5352],[-119.69,34.4635],[-119.756,34.5126],[-119.753,34.5281],[-119.688,34.4748],[-119.758,34.5185],[-119.69,34.4634],[-119.758,34.5372],[-119.757,34.5292],[-119.749,34.4875],[-119.759,34.5218],[-119.76,34.5247],[-119.685,34.4754],[-119.76,34.5235],[-119.757,34.5143],[-119.756,34.5152],[-119.758,34.5377],[-119.757,34.5175],[-119.757,34.5319],[-119.729,34.461],[-119.747,34.4973],[-119.757,34.531],[-119.69,34.4632],[-119.757,34.5325],[-119.757,34.5346],[-119.76,34.5226],[-119.758,34.5376],[-119.759,34.5371],[-119.757,34.5329],[-119.828,34.5136],[-119.76,34.5216],[-119.689,34.473],[-119.758,34.529],[-119.729,34.4608],[-119.684,34.4756],[-119.685,34.4752],[-119.591,34.4702],[-119.76,34.5233],[-119.76,34.5232],[-119.684,34.4757],[-119.834,34.5243],[-119.749,34.4883],[-119.759,34.5377],[-119.759,34.5278],[-119.689,34.4739],[-119.761,34.5382],[-119.687,34.4754],[-119.76,34.5383],[-119.757,34.5342],[-119.834,34.5238],[-119.786,34.5481],[-119.76,34.5373],[-119.762,34.5383],[-119.757,34.5307],[-119.759,34.5267],[-119.759,34.5372],[-119.688,34.4669],[-119.684,34.4755],[-119.76,34.5242],[-119.753,34.5275],[-119.777,34.7592],[-119.591,34.4771],[-119.757,34.5313],[-119.759,34.5274],[-119.786,34.5528],[-119.759,34.528],[-119.758,34.5375],[-119.755,34.5319],[-119.591,34.4684],[-119.76,34.5245],[-119.753,34.528],[-119.689,34.4636],[-119.757,34.5176],[-119.688,34.4644],[-119.95,34.5664],[-119.688,34.4676],[-119.688,34.4667],[-119.757,34.5145],[-119.688,34.467],[-119.59,34.47],[-119.683,34.4758],[-119.76,34.5237],[-119.69,34.4628],[-119.689,34.4645],[-119.757,34.5352],[-119.757,34.5166],[-119.755,34.5296],[-119.773,34.546],[-119.757,34.5297],[-119.749,34.4884],[-119.82,34.5437],[-119.684,34.4759],[-119.76,34.5384],[-119.76,34.5225],[-119.796,34.5405],[-119.749,34.4889],[-119.758,34.5186],[-119.757,34.5311],[-119.729,34.4611],[-119.77,34.5457],[-119.688,34.4675],[-119.689,34.4638],[-119.689,34.4696],[-119.689,34.4728],[-119.659,34.466],[-119.786,34.5526],[-119.77,34.5451],[-119.758,34.5289],[-119.759,34.5196],[-119.757,34.5295],[-119.757,34.534],[-119.689,34.4637],[-119.762,34.5381],[-119.756,34.5297],[-119.76,34.5229],[-119.758,34.5374],[-119.757,34.5154],[-119.759,34.5379],[-119.689,34.4639],[-119.758,34.5373],[-119.785,34.5489],[-119.757,34.5291],[-119.758,34.5365],[-119.759,34.5279],[-119.798,34.5403],[-119.762,34.5385],[-119.689,34.4741],[-119.757,34.5315],[-119.758,34.5361],[-119.753,34.5278],[-119.591,34.4608],[-119.786,34.548],[-119.69,34.4627],[-119.755,34.5294],[-119.757,34.5156],[-119.758,34.5371],[-119.774,34.5457],[-119.773,34.5457],[-119.759,34.52],[-119.73,34.4612],[-119.757,34.5301],[-119.757,34.535],[-119.755,34.5124],[-119.73,34.4609],[-119.752,34.5282],[-119.758,34.5351],[-119.756,34.5129],[-119.758,34.5293],[-119.757,34.5294],[-119.76,34.5215],[-119.76,34.5222],[-119.755,34.5125],[-119.684,34.4754],[-119.772,34.5456],[-119.761,34.5384]];
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