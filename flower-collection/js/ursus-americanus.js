var subSightings = [[-119.557,34.469],[-119.61,34.5012],[-119.749,34.5659],[-120.013,34.7518],[-119.61,34.4955],[-119.607,34.4761],[-119.61,34.4956],[-119.632,34.5086],[-119.748,34.489],[-119.611,34.4961],[-119.633,34.5055],[-119.611,34.4983],[-120.007,34.7496],[-119.759,34.5669],[-119.587,34.4629],[-119.748,34.4892],[-119.748,34.5664],[-119.748,34.5643],[-119.609,34.4954],[-119.504,34.4669],[-119.747,34.4903],[-119.75,34.5209],[-119.607,34.5055],[-119.609,34.5027],[-119.746,34.4919],[-119.557,34.4686],[-119.658,34.525],[-119.59,34.487],[-119.604,34.4675],[-119.623,34.5351],[-119.751,34.5188],[-119.629,34.5213],[-119.755,34.5727],[-119.746,34.5754],[-119.574,34.4779],[-119.634,34.5109],[-120.002,34.7458],[-119.59,34.4867],[-119.59,34.4791],[-119.75,34.5012],[-119.604,34.4676],[-119.748,34.5683],[-119.74,34.4751],[-119.746,34.5555],[-119.755,34.5728],[-120.013,34.7542],[-119.552,34.4669],[-119.496,34.4855]];
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