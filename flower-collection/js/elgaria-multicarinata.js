var subSightings = [[-119.76,34.6205],[-119.639,34.4788],[-119.644,34.4623],[-119.651,34.4615],[-119.644,34.4649],[-119.637,34.4865],[-119.591,34.4607],[-119.743,34.5874],[-119.639,34.4737],[-119.589,34.465],[-119.608,34.4946],[-119.629,34.4768],[-119.636,34.4874],[-119.636,34.5017],[-119.592,34.4751],[-119.637,34.4874],[-119.638,34.4802],[-119.284,34.4769],[-119.714,34.4723],[-119.638,34.48],[-119.637,34.4775],[-119.637,34.4949],[-119.636,34.4901],[-119.689,34.4637],[-119.665,34.4659],[-119.631,34.4953],[-119.751,34.5024],[-119.6,34.4935],[-119.639,34.4625],[-119.687,34.4751],[-119.565,34.4857],[-119.639,34.484],[-119.641,34.4729],[-119.691,34.4885],[-119.591,34.4635],[-119.701,34.485],[-119.637,34.4823],[-119.755,34.5098],[-119.643,34.4653],[-119.688,34.4639],[-119.648,34.4702]];
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