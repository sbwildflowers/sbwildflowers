var subSightings = [[-119.585,34.4915],[-119.566,34.4873],[-119.7,34.4851],[-119.584,34.4914],[-119.701,34.4849],[-119.744,34.5881],[-119.644,34.4648],[-119.636,34.498],[-119.947,34.8056],[-119.742,34.479],[-119.644,34.4646],[-119.686,34.4998],[-119.644,34.4683],[-119.565,34.4873],[-119.748,34.5928],[-119.893,34.7889],[-119.645,34.4644],[-119.628,34.4539],[-120.006,34.5278],[-119.714,34.4828],[-119.745,34.5901],[-119.954,34.5261],[-119.585,34.4912],[-119.643,34.465],[-119.644,34.4641],[-119.743,34.5877],[-119.636,34.4981],[-119.384,34.5096],[-119.643,34.4682],[-119.644,34.4682],[-119.635,34.4982],[-119.585,34.4916],[-119.643,34.4647],[-119.644,34.4639],[-119.258,34.481],[-119.645,34.4641],[-119.215,34.4825],[-119.352,34.6053],[-119.645,34.4643],[-119.989,34.8169],[-119.644,34.4642],[-119.636,34.4979],[-119.636,34.455],[-119.634,34.4969],[-119.636,34.4978],[-119.976,34.7571],[-119.644,34.464],[-119.643,34.4659],[-119.645,34.4646],[-119.644,34.4647],[-119.635,34.498]];
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