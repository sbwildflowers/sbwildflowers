var subSightings = [[-119.796,34.5092],[-119.611,34.4977],[-119.795,34.5098],[-119.753,34.5725],[-119.591,34.4878],[-119.922,34.7666],[-119.752,34.5731],[-119.752,34.5726],[-119.753,34.5726],[-119.757,34.5685],[-119.741,34.5227],[-119.752,34.5732],[-119.636,34.5111],[-119.75,34.5734],[-119.953,34.7968],[-119.591,34.4879],[-119.923,34.7665],[-119.591,34.4882],[-119.637,34.4973],[-119.561,34.487],[-119.779,34.5542],[-119.636,34.5113],[-119.882,34.7726],[-119.635,34.5112],[-119.694,34.4934],[-119.56,34.4868],[-119.758,34.5682],[-119.636,34.5109],[-119.742,34.5228],[-119.758,34.5683],[-119.694,34.4939],[-119.591,34.4877],[-119.637,34.4975],[-119.501,34.4864],[-119.953,34.797],[-119.572,34.4877],[-119.758,34.5684],[-119.758,34.5685],[-119.637,34.4974],[-119.697,34.5145],[-119.591,34.4883],[-119.699,34.5127],[-119.18,34.7261],[-119.795,34.5092],[-119.779,34.5544],[-119.463,34.4924],[-119.611,34.4974],[-119.636,34.511],[-119.56,34.4867],[-119.591,34.4887],[-119.651,34.5196],[-119.611,34.4978]];
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