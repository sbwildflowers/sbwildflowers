var subSightings = [[-119.602,34.4938],[-119.663,34.4654],[-119.656,34.4619],[-119.662,34.4664],[-119.668,34.4675],[-119.591,34.4887],[-119.665,34.467],[-119.662,34.4662],[-119.663,34.4672],[-119.658,34.4641],[-119.752,34.5996],[-119.808,34.5164],[-119.655,34.5234],[-119.663,34.4661],[-119.665,34.4658],[-119.665,34.4662],[-119.663,34.4665],[-119.659,34.4649],[-119.643,34.5143],[-119.667,34.4675],[-119.665,34.4657],[-119.662,34.4668],[-119.665,34.466],[-119.663,34.4657],[-119.662,34.4658],[-119.651,34.5196],[-119.666,34.467],[-119.818,34.5281],[-119.666,34.4671],[-119.663,34.4674],[-119.665,34.4661],[-119.631,34.519],[-119.866,34.7768],[-119.661,34.4658],[-119.666,34.4661],[-119.645,34.5155],[-119.658,34.4646],[-119.666,34.4673],[-119.755,34.599],[-119.664,34.4658],[-119.66,34.4654],[-119.657,34.4634]];
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