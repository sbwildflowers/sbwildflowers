var subSightings = [[-119.639,34.4851],[-119.282,34.4759],[-119.754,34.5749],[-119.638,34.479],[-119.642,34.5142],[-119.593,34.4692],[-119.639,34.4802],[-119.635,34.5009],[-119.639,34.4546],[-119.619,34.4573],[-119.639,34.4786],[-119.749,34.5242],[-119.758,34.5363],[-119.639,34.4803],[-119.637,34.4778],[-119.637,34.4774],[-119.644,34.4636],[-119.661,34.4786],[-119.637,34.4775],[-119.74,34.4752],[-119.721,34.4745],[-119.782,34.5588],[-119.783,34.5589],[-119.758,34.5365],[-119.705,34.5173],[-119.274,34.4712],[-119.609,34.5034],[-119.589,34.4745],[-119.638,34.4786],[-119.592,34.4596],[-119.671,34.5072],[-119.595,34.458],[-119.628,34.4953],[-119.76,34.5665],[-119.721,34.4744],[-119.502,34.4862],[-119.633,34.5087],[-119.662,34.4667],[-119.64,34.5136],[-119.638,34.4787],[-119.631,34.5183],[-119.639,34.4805],[-119.644,34.4643],[-119.635,34.4829],[-119.525,34.4875],[-119.74,34.4753],[-119.627,34.5226],[-119.245,34.5359],[-119.533,34.4886],[-119.758,34.5684],[-119.645,34.4598],[-119.589,34.4751],[-119.644,34.4749],[-119.551,34.4861],[-119.781,34.559],[-119.644,34.479],[-119.749,34.5243],[-119.637,34.498],[-119.638,34.4801],[-119.639,34.4785],[-119.643,34.5143],[-119.718,34.4725],[-119.595,34.4926],[-119.63,34.5131],[-119.75,34.6061],[-119.688,34.4757],[-119.638,34.4785],[-119.59,34.4874],[-119.643,34.4783],[-119.749,34.5252],[-119.638,34.4802],[-119.596,34.4936],[-119.755,34.574],[-119.751,34.503],[-119.29,34.4782],[-119.459,34.4922],[-119.639,34.4717],[-119.395,34.5007],[-119.638,34.4781],[-119.612,34.4555],[-119.664,34.4684],[-119.503,34.487],[-119.651,34.4627],[-119.696,34.4952],[-119.633,34.5157],[-119.513,34.4687],[-119.268,34.4743],[-119.644,34.4623],[-119.639,34.4974],[-119.637,34.4776],[-119.717,34.4737],[-119.633,34.4833],[-119.64,34.5135],[-119.639,34.4832],[-119.639,34.4841],[-119.753,34.5052],[-119.638,34.4764],[-119.588,34.4782],[-119.638,34.4765],[-119.456,34.4915],[-119.637,34.4979],[-119.608,34.4544],[-119.562,34.4871],[-119.637,34.4783],[-119.654,34.4593]];
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