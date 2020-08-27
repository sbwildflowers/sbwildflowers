var subSightings = [[-119.644,34.4643],[-119.644,34.4642],[-119.743,34.481],[-119.029,34.0885],[-119.633,34.4808],[-119.632,34.4812],[-119.771,34.5598],[-119.637,34.4771],[-119.644,34.4632],[-119.628,34.4753],[-119.639,34.4743],[-119.691,34.4772],[-119.723,34.4755],[-119.639,34.4785],[-119.638,34.4781],[-119.638,34.4765],[-119.997,34.7364],[-119.974,34.7586],[-119.743,34.4808],[-119.23,34.4968],[-119.639,34.4786],[-119.637,34.4783],[-119.644,34.4637],[-119.637,34.4778],[-119.715,34.4721],[-119.65,34.4664],[-119.637,34.4781],[-119.234,34.5033],[-119.244,34.4676],[-119.638,34.4783],[-119.607,34.5069],[-119.633,34.4782],[-119.637,34.4782],[-119.638,34.4791],[-119.637,34.4959],[-119.65,34.4663],[-119.637,34.4777]];
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