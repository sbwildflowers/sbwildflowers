var subSightings = [[-119.595,34.4924],[-119.734,34.4528],[-119.936,34.7696],[-119.758,34.568],[-119.574,34.4878],[-119.626,34.4954],[-119.613,34.496],[-119.686,34.5149],[-119.634,34.5049],[-119.574,34.4804],[-119.595,34.4923],[-119.601,34.5123],[-119.406,34.4976],[-119.478,34.49],[-119.594,34.4915],[-119.595,34.4921],[-119.596,34.4935],[-119.632,34.5144],[-119.402,34.4986],[-119.611,34.4969],[-119.757,34.515],[-119.756,34.5151],[-119.591,34.4917],[-119.888,34.7406],[-119.612,34.4967],[-119.639,34.4969],[-119.597,34.4938],[-119.614,34.4953],[-119.594,34.4913],[-119.622,34.4946],[-119.597,34.4936],[-119.883,34.736],[-119.757,34.5171],[-119.611,34.4975],[-119.634,34.5047],[-119.635,34.4868],[-119.756,34.5152],[-119.687,34.5178],[-119.636,34.4868],[-119.595,34.4922],[-119.623,34.4949],[-119.757,34.5152],[-119.384,34.5093],[-119.751,34.5581],[-119.591,34.4916],[-119.601,34.5126],[-119.957,34.7794],[-119.623,34.495],[-120.004,34.8126],[-119.687,34.5176],[-119.595,34.4925],[-119.38,34.5069],[-119.757,34.5151],[-119.596,34.4936],[-119.406,34.4977],[-119.611,34.497],[-119.625,34.4953],[-119.634,34.5044],[-119.38,34.507],[-119.635,34.49],[-119.625,34.4954],[-119.634,34.5048],[-119.574,34.4809],[-119.63,34.511],[-119.634,34.505]];
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