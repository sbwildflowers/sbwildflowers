var subSightings = [[-120.108,34.6922],[-120.108,34.6843],[-120.108,34.6846],[-120.106,34.7182],[-120.224,34.5051],[-120.094,34.7161],[-119.758,34.5327],[-119.951,34.6518],[-119.762,34.5382],[-119.954,34.5584],[-120.104,34.7026],[-120.112,34.7089],[-119.773,34.546],[-120.1,34.6897],[-120.093,34.6966],[-119.804,34.5437],[-120.11,34.7108],[-120.108,34.6801],[-119.758,34.5342],[-119.757,34.532],[-119.759,34.5371],[-120.079,34.5532],[-119.956,34.7582],[-120.104,34.7128],[-119.762,34.5383],[-119.937,34.7703],[-119.761,34.5303],[-119.758,34.5324],[-119.731,34.4641],[-120.105,34.6802],[-119.957,34.761],[-119.758,34.5368],[-120.108,34.6865],[-120.008,34.7721],[-120.106,34.6889],[-119.959,34.7571],[-119.816,34.5345],[-119.758,34.533],[-119.954,34.5583],[-120.106,34.6807],[-119.957,34.7609],[-120.102,34.6892],[-119.762,34.6323],[-119.759,34.5332],[-120.096,34.6902],[-120.108,34.6935],[-120.107,34.6799],[-119.632,34.5081],[-119.844,34.5433],[-119.731,34.4644],[-119.757,34.5322],[-119.793,34.5404],[-119.757,34.5315],[-119.758,34.5329],[-119.77,34.5454],[-119.759,34.5294],[-119.976,34.7465],[-119.758,34.5325],[-119.762,34.5316],[-119.954,34.7608],[-119.758,34.5323],[-119.844,34.5431],[-119.758,34.5359],[-119.845,34.5425],[-119.731,34.4642],[-119.757,34.5319],[-119.758,34.5333],[-119.99,34.8217],[-120.103,34.7142],[-120.104,34.682],[-120.104,34.7222],[-119.758,34.5332],[-119.758,34.5319],[-119.769,34.5507],[-119.772,34.5447],[-119.792,34.5415],[-119.757,34.533],[-120.102,34.6893],[-120.066,34.74],[-119.76,34.5373],[-120.102,34.7217],[-119.972,34.7503],[-120.096,34.6934]];
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