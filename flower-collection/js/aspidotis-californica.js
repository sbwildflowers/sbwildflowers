var subSightings = [[-119.645,34.4641],[-119.643,34.4674],[-119.215,34.4833],[-119.643,34.4673],[-119.642,34.4716],[-119.717,34.486],[-119.715,34.4938],[-119.644,34.4643],[-119.622,34.4666],[-119.636,34.4935],[-119.644,34.4641],[-119.653,34.4614],[-119.624,34.4638],[-119.651,34.4608],[-119.65,34.4608],[-119.701,34.4868],[-119.642,34.4717],[-119.763,34.5322],[-119.653,34.4609],[-119.645,34.464],[-119.624,34.4624],[-119.643,34.4672],[-119.716,34.4898],[-119.612,34.4552],[-119.256,34.483],[-119.653,34.4613],[-119.751,34.5826],[-119.653,34.4607],[-119.767,34.5598],[-119.216,34.4835],[-119.65,34.4622],[-119.65,34.4621],[-119.658,34.4641],[-119.645,34.4642],[-119.65,34.461],[-119.643,34.4618],[-119.646,34.4608],[-119.697,34.4791],[-119.645,34.4644],[-119.639,34.4718],[-119.697,34.479],[-119.637,34.4542],[-119.701,34.4865],[-119.644,34.4649],[-119.651,34.461],[-119.624,34.4645],[-119.701,34.4866],[-119.715,34.4854],[-119.64,34.4746],[-119.69,34.4595],[-119.651,34.4609],[-119.69,34.4627],[-119.659,34.4702],[-119.643,34.4671],[-119.65,34.4611],[-119.643,34.467],[-119.645,34.4639],[-119.701,34.4867],[-119.65,34.4609]];
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