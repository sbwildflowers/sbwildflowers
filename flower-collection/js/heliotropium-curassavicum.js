var subSightings = [[-119.799,34.4204],[-119.826,34.4225],[-119.826,34.4226],[-119.697,34.4025],[-119.761,34.5393],[-119.619,34.5375],[-119.315,34.2803],[-119.62,34.5392],[-119.85,34.4077],[-119.825,34.4227],[-119.826,34.4224],[-119.62,34.5387],[-119.826,34.4222],[-119.314,34.2781],[-119.62,34.5368],[-119.761,34.5401],[-119.62,34.5382],[-119.824,34.4224],[-119.735,34.5372],[-119.827,34.4213],[-119.764,34.54],[-119.312,34.2778],[-119.845,34.4064],[-119.321,34.6978],[-119.312,34.2787],[-119.311,34.2777],[-119.314,34.2782],[-119.826,34.4221],[-119.827,34.4212],[-119.624,34.5356],[-119.825,34.4224],[-119.827,34.4215],[-119.762,34.5401],[-119.799,34.4205],[-119.762,34.5402],[-119.62,34.5391],[-119.62,34.5405],[-119.626,34.5343],[-119.62,34.5406],[-119.62,34.5404],[-119.314,34.2796],[-119.745,34.5401],[-119.761,34.5402],[-119.62,34.5394],[-119.777,34.546],[-119.31,34.2773],[-119.827,34.4214],[-119.326,34.286],[-119.85,34.4076],[-119.62,34.5396],[-119.826,34.4219],[-119.844,34.4064]];
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