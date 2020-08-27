var subSightings = [[-119.564,34.5324],[-119.749,34.5714],[-119.621,34.5399],[-119.873,34.7888],[-119.851,34.7458],[-119.867,34.7386],[-119.851,34.7475],[-119.724,34.5815],[-119.256,34.7166],[-119.887,34.7943],[-119.753,34.5726],[-119.849,34.7493],[-119.681,34.5531],[-119.651,34.5408],[-119.851,34.7456],[-119.882,34.7931],[-119.724,34.5816],[-119.883,34.7764],[-119.683,34.5537],[-119.623,34.5356],[-119.875,34.7354],[-119.296,34.695],[-119.563,34.5354],[-119.885,34.7739],[-119.321,34.6958],[-119.683,34.5539],[-120.009,34.7387],[-119.757,34.5694],[-119.634,34.5389],[-119.769,34.5634],[-119.949,34.7567],[-119.891,34.7952],[-119.566,34.5325],[-119.874,34.7892],[-119.769,34.5633],[-119.955,34.7767],[-120.002,34.7464],[-119.185,34.726],[-119.315,34.6982],[-119.625,34.5344],[-119.18,34.7268],[-119.852,34.7455],[-119.751,34.5813]];
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