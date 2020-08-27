var subSightings = [[-119.645,34.5147],[-119.761,34.5662],[-119.753,34.5046],[-119.639,34.4809],[-119.591,34.4782],[-119.752,34.5108],[-119.75,34.5014],[-119.762,34.5661],[-119.699,34.4967],[-119.751,34.6022],[-119.638,34.4813],[-119.637,34.4812],[-119.683,34.5003],[-119.641,34.4729],[-119.694,34.5001],[-119.224,34.4912],[-119.693,34.4983],[-119.693,34.4988],[-119.752,34.5106],[-119.592,34.4783],[-119.753,34.5045],[-119.753,34.6006],[-119.753,34.5031],[-119.646,34.5149],[-119.637,34.4816],[-119.637,34.4817],[-119.761,34.5657],[-119.501,34.4716],[-119.639,34.4729],[-119.75,34.5007],[-119.694,34.5016],[-119.753,34.5043],[-119.596,34.4701],[-119.223,34.4896],[-119.688,34.503],[-119.751,34.5111],[-119.591,34.4787],[-119.717,34.4875],[-119.751,34.6021],[-119.223,34.4897],[-119.586,34.4789],[-119.642,34.514],[-119.694,34.4988],[-119.637,34.4813],[-119.637,34.4818],[-119.637,34.4821],[-119.646,34.5145],[-119.697,34.4784],[-119.638,34.4812],[-119.75,34.6021],[-119.682,34.5005],[-119.569,34.4815],[-119.752,34.5113],[-119.752,34.5104],[-119.645,34.5148],[-119.686,34.5011],[-119.245,34.5367],[-119.637,34.4811],[-119.75,34.5016],[-119.64,34.4731],[-119.797,34.526],[-119.646,34.5147],[-119.64,34.4729],[-119.694,34.4989],[-119.753,34.6008],[-119.646,34.5148],[-119.223,34.4899],[-119.586,34.4791],[-119.569,34.4818],[-119.569,34.4809],[-119.75,34.5013],[-119.687,34.501],[-119.761,34.5661],[-119.971,34.7453],[-119.75,34.5008],[-119.752,34.5109],[-119.592,34.4782],[-119.641,34.4728],[-119.753,34.5044],[-119.752,34.5105],[-119.761,34.5659],[-119.761,34.566],[-119.645,34.5149],[-119.637,34.4823],[-119.569,34.482],[-119.64,34.473],[-119.752,34.511],[-119.749,34.5005],[-119.905,34.5198],[-119.569,34.4819],[-119.586,34.4793],[-119.681,34.4971],[-119.75,34.5005],[-120.183,34.5084],[-119.637,34.4815],[-119.687,34.5011],[-120.184,34.5084],[-119.75,34.602],[-119.64,34.4732],[-119.7,34.4973],[-119.586,34.4788],[-119.234,34.5025],[-119.64,34.4728],[-119.638,34.4765],[-119.75,34.5006],[-119.645,34.5146],[-119.637,34.4814],[-119.693,34.4987],[-119.63,34.4952],[-119.681,34.497],[-119.693,34.4989],[-119.75,34.5015],[-119.383,34.5108],[-119.586,34.479],[-119.569,34.4814],[-119.751,34.5232],[-119.695,34.5015],[-119.904,34.5201],[-119.686,34.5012]];
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