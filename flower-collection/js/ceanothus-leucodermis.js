var subSightings = [[-119.236,34.5032],[-119.75,34.6076],[-119.383,34.5076],[-119.96,34.5246],[-119.84,34.7509],[-119.455,34.4766],[-119.734,34.6144],[-119.994,34.5312],[-119.952,34.5265],[-119.902,34.7612],[-119.882,34.7767],[-119.75,34.6074],[-119.867,34.7767],[-119.8,34.7561],[-119.956,34.5246],[-120.004,34.5281],[-119.905,34.7635],[-120.002,34.5283],[-119.472,34.4728],[-119.883,34.7733],[-119.995,34.8262],[-119.859,34.7421],[-119.981,34.5265],[-119.874,34.7717],[-119.471,34.4739],[-119.75,34.6065],[-119.893,34.7558],[-120.006,34.5278],[-119.472,34.4726],[-119.46,34.476],[-119.445,34.4765],[-119.96,34.5247],[-119.876,34.7719],[-119.875,34.7704],[-120.006,34.5277],[-119.473,34.4713],[-119.777,34.7585],[-119.849,34.749],[-119.989,34.5302],[-119.874,34.7718],[-119.263,34.5555],[-119.472,34.4722],[-120.007,34.5279],[-120,34.8137],[-119.952,34.5264],[-119.808,34.7577],[-119.876,34.7703],[-119.984,34.5288],[-119.262,34.5838],[-119.823,34.7512],[-119.89,34.7788],[-119.874,34.7704],[-119.352,34.6052],[-119.456,34.4767],[-119.885,34.7361],[-119.451,34.4763],[-119.777,34.7592],[-119.904,34.7633],[-119.463,34.4755],[-119.75,34.6077],[-119.777,34.7593],[-120.005,34.5277],[-119.449,34.4763],[-119.452,34.4764],[-119.888,34.7433],[-119.842,34.7506],[-119.955,34.5258],[-119.469,34.474],[-119.95,34.8016],[-119.875,34.7703],[-119.75,34.6079],[-119.992,34.5308],[-119.351,34.6037],[-119.828,34.7506],[-119.858,34.7433],[-119.955,34.5246],[-119.882,34.7763],[-119.995,34.5311],[-119.778,34.7572],[-119.876,34.772]];
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