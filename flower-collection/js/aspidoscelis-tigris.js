var subSightings = [[-119.643,34.4613],[-119.644,34.4636],[-119.646,34.4608],[-119.628,34.4756],[-119.699,34.4942],[-119.644,34.4645],[-119.698,34.4837],[-119.751,34.5733],[-119.632,34.4807],[-119.627,34.4737],[-119.633,34.4961],[-119.714,34.4723],[-119.628,34.4955],[-119.708,34.4728],[-119.706,34.4712],[-119.636,34.4868],[-119.636,34.4936],[-119.75,34.5155],[-119.757,34.5697],[-119.718,34.4726],[-119.712,34.4727],[-119.639,34.485],[-119.635,34.4985],[-119.644,34.464],[-119.636,34.4914],[-119.636,34.489],[-119.701,34.4752],[-119.637,34.4823],[-119.698,34.4806],[-119.706,34.4709],[-119.636,34.498],[-119.644,34.461],[-119.639,34.4788],[-119.634,34.4826],[-119.632,34.4809],[-119.643,34.4677],[-119.636,34.4916],[-119.639,34.4789],[-119.751,34.5977],[-119.609,34.5022],[-119.636,34.4951],[-119.698,34.4808],[-119.638,34.4785],[-119.633,34.482],[-119.716,34.4719],[-119.637,34.4873],[-119.714,34.4718],[-119.639,34.4786],[-119.628,34.4754],[-119.7,34.4847],[-119.644,34.4611],[-119.709,34.4728],[-119.701,34.4848],[-119.636,34.4932],[-119.637,34.482],[-119.626,34.4726],[-119.644,34.4647],[-119.712,34.4731],[-119.636,34.4949],[-119.682,34.4755],[-119.711,34.4732],[-119.636,34.4956],[-119.723,34.4756],[-119.636,34.492],[-119.812,34.5242],[-119.643,34.4664],[-119.699,34.4965],[-119.637,34.477],[-119.637,34.4959],[-119.632,34.4813],[-119.637,34.4957],[-119.637,34.4772],[-119.698,34.4836],[-119.633,34.479],[-119.636,34.4926],[-119.637,34.4774],[-119.647,34.4603],[-119.622,34.4821],[-119.744,34.5879],[-119.638,34.4865],[-119.712,34.495],[-119.639,34.4834],[-119.697,34.4785]];
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