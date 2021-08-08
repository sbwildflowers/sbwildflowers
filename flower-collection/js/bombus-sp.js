var subSightings = [[-119.636,34.4936],[-119.638,34.4792],[-119.638,34.4786],[-119.752,34.5806],[-119.757,34.5706],[-119.638,34.4782],[-119.515,34.4884],[-119.757,34.5106],[-119.645,34.4645],[-119.634,34.5049],[-119.696,34.4573],[-119.636,34.4935],[-119.593,34.4753],[-119.627,34.5336],[-119.633,34.5059],[-119.638,34.4788],[-119.637,34.4974],[-119.636,34.4938],[-119.62,34.538],[-119.639,34.4786],[-119.749,34.603],[-119.636,34.491],[-119.763,34.5648],[-119.642,34.4725],[-119.753,34.6002],[-119.764,34.5647],[-119.755,34.5098],[-119.745,34.6007],[-119.536,34.4879],[-119.745,34.4849],[-119.594,34.4724],[-119.75,34.5582],[-119.636,34.493],[-119.232,34.4663],[-119.634,34.504],[-119.755,34.5101],[-119.636,34.4949],[-119.638,34.4798],[-119.639,34.4806],[-119.626,34.4716],[-119.607,34.5061],[-119.749,34.4888],[-119.689,34.471],[-119.638,34.4784],[-119.749,34.6033],[-119.613,34.4958],[-119.638,34.4783]];
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