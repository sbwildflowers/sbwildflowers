var subSightings = [[-119.613,34.4957],[-119.752,34.5729],[-119.747,34.601],[-119.597,34.4939],[-119.742,34.4792],[-119.6,34.4937],[-119.643,34.4594],[-119.757,34.5121],[-119.644,34.4621],[-119.742,34.4789],[-119.631,34.4955],[-119.749,34.5736],[-119.581,34.4905],[-119.636,34.4868],[-119.626,34.4954],[-119.645,34.5148],[-119.786,34.5504],[-119.532,34.488],[-119.595,34.4922],[-119.643,34.4616],[-119.646,34.5148],[-119.623,34.4655],[-119.453,34.4916],[-119.659,34.4661],[-119.646,34.5151],[-119.634,34.5041],[-119.743,34.4804],[-119.746,34.4855],[-119.246,34.4707],[-119.743,34.4801],[-119.631,34.4957],[-119.634,34.5102],[-119.636,34.5011],[-119.785,34.5524],[-119.586,34.4798]];
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