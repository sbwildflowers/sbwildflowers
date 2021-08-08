var subSightings = [[-119.743,34.4038],[-119.31,34.2764],[-120.067,34.4661],[-119.313,34.2792],[-119.83,34.4183],[-119.392,34.3202],[-119.844,34.4063],[-119.5,34.3878],[-119.755,34.4058],[-119.787,34.4169],[-119.752,34.4046],[-119.454,34.3696],[-119.885,34.415],[-119.314,34.2783],[-119.828,34.4209],[-119.712,34.4654],[-119.829,34.4209],[-119.712,34.4653],[-119.826,34.4218],[-119.743,34.4039],[-119.528,34.4001],[-119.832,34.418],[-120.07,34.4637],[-119.826,34.4217],[-119.85,34.4078],[-119.775,34.4128],[-119.528,34.4002],[-119.826,34.4216],[-119.804,34.4439],[-119.316,34.2822],[-119.895,34.4208],[-119.499,34.3869],[-119.036,34.0836],[-119.844,34.4062],[-119.527,34.3967],[-119.314,34.2782],[-119.85,34.4075],[-119.768,34.4101],[-119.783,34.4158],[-119.832,34.4179],[-119.764,34.4092],[-119.827,34.4214],[-119.766,34.4097],[-119.35,34.3055],[-119.83,34.4185],[-119.848,34.4069]];
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