var subSightings = [[-119.591,34.4772],[-119.609,34.4776],[-119.574,34.477],[-119.574,34.4771],[-119.677,34.491],[-119.611,34.4777],[-119.945,34.5277],[-119.506,34.4675],[-119.67,34.5037],[-119.954,34.5286],[-119.612,34.4959],[-119.639,34.4834],[-119.935,34.5272],[-119.588,34.4805],[-119.496,34.4844],[-119.589,34.4802],[-119.955,34.5287],[-119.67,34.5038],[-119.496,34.4846],[-119.266,34.5556],[-119.575,34.4787],[-119.679,34.4917],[-119.477,34.4707],[-119.574,34.4808],[-119.578,34.481],[-120.049,34.7609],[-119.682,34.4976],[-120.158,34.516],[-119.291,34.4782],[-119.58,34.4809],[-119.574,34.4781],[-119.505,34.4675],[-120.052,34.7574],[-119.678,34.4917],[-119.383,34.5103],[-119.24,34.5437],[-119.804,34.5136],[-119.435,34.4907],[-119.593,34.4779],[-119.421,34.4897],[-119.586,34.4798],[-119.956,34.5288],[-119.466,34.4751],[-119.515,34.4882],[-119.475,34.4695],[-119.956,34.5295],[-119.501,34.4655],[-119.688,34.4527],[-119.574,34.481],[-119.574,34.4785],[-119.671,34.5034],[-119.679,34.4921],[-119.643,34.4871],[-119.587,34.4801],[-119.945,34.5279],[-119.679,34.492],[-119.542,34.4865],[-119.809,34.5177],[-119.639,34.484],[-119.592,34.4782],[-119.515,34.4889],[-119.513,34.4871],[-119.447,34.4759],[-119.639,34.4848],[-119.29,34.4784],[-119.636,34.4875],[-119.49,34.4666],[-119.586,34.4799],[-119.574,34.4809],[-119.61,34.4776],[-119.496,34.485],[-119.639,34.4846],[-119.58,34.4808],[-119.587,34.4804],[-119.591,34.4773],[-119.469,34.4917],[-119.669,34.5037],[-119.589,34.4803],[-119.28,34.519],[-119.503,34.4666],[-120.047,34.7609],[-119.588,34.4804],[-119.502,34.4665],[-119.802,34.514],[-119.573,34.4804],[-119.585,34.4802],[-119.642,34.4857],[-119.671,34.5033],[-119.526,34.4669],[-119.646,34.4872],[-119.587,34.4803],[-119.515,34.4881],[-119.612,34.4957],[-119.502,34.4667],[-119.58,34.4806],[-119.589,34.4801],[-119.32,34.696],[-119.67,34.5039],[-119.936,34.5271],[-119.646,34.487],[-119.628,34.4851],[-119.591,34.4785],[-119.641,34.486],[-119.628,34.4847],[-119.429,34.4896],[-119.579,34.4807],[-119.619,34.482],[-119.574,34.4786],[-119.589,34.48],[-119.447,34.4758],[-119.579,34.4811],[-119.642,34.4871],[-119.579,34.481],[-119.671,34.5035],[-119.432,34.4903],[-119.26,34.5555],[-119.642,34.4858],[-119.579,34.4809],[-119.502,34.468],[-119.63,34.4849],[-119.502,34.4666],[-119.655,34.4616],[-119.953,34.5277],[-119.579,34.4808],[-119.575,34.4788],[-119.513,34.4873],[-119.573,34.48],[-119.681,34.4973],[-119.639,34.4841]];
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