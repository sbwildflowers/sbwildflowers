var subSightings = [[-119.876,34.7703],[-120.053,34.7571],[-119.786,34.5494],[-119.748,34.5996],[-119.762,34.5656],[-119.03,34.1039],[-119.751,34.5999],[-119.787,34.5492],[-119.786,34.5485],[-120.059,34.7389],[-119.769,34.5509],[-120.048,34.7609],[-119.564,34.48],[-119.787,34.5494],[-119.245,34.4668],[-119.047,34.09],[-119.753,34.5992],[-119.786,34.5488],[-119.748,34.5998],[-119.995,34.7369],[-119.748,34.5997],[-119.999,34.7383],[-119.802,34.4191],[-120.035,34.7435],[-119.802,34.4193],[-119.747,34.5992],[-119.762,34.5661],[-119.997,34.7364],[-119.989,34.736],[-119.786,34.5489],[-120.241,34.4947],[-119.448,34.491],[-119.447,34.4911],[-119.748,34.601],[-119.634,34.497],[-119.786,34.5487],[-119.995,34.7367],[-119.874,34.7718],[-119.746,34.6007],[-120.046,34.761],[-119.999,34.7409],[-119.998,34.7402],[-119.749,34.5999],[-119.786,34.549],[-119.787,34.5493],[-120.063,34.7383],[-119.633,34.5156],[-120.045,34.7615],[-119.987,34.7355],[-119.446,34.4911],[-120.06,34.7386],[-119.05,34.09],[-120.065,34.737],[-119.786,34.5491],[-119.978,34.7323],[-119.565,34.4803],[-119.526,34.4871],[-119.216,34.4845],[-120.061,34.739],[-120.031,34.7687],[-119.564,34.4799],[-119.568,34.4792],[-119.565,34.4807],[-119.997,34.7365],[-119.564,34.4801],[-119.995,34.7422],[-119.629,34.5353],[-119.447,34.491],[-120.033,34.7685],[-119.752,34.5995],[-120.031,34.7691],[-120.038,34.7682],[-120.035,34.7678],[-119.973,34.7307],[-119.763,34.5655],[-119.61,34.4956],[-120.038,34.7681],[-119.802,34.4192],[-119.763,34.5653],[-119.786,34.5478],[-119.986,34.7348],[-119.232,34.4663],[-119.763,34.5652],[-119.998,34.7403],[-119.447,34.4912],[-120.03,34.7689],[-119.984,34.7486],[-120.044,34.7427],[-119.633,34.5157],[-119.566,34.4811],[-119.787,34.5491],[-120.051,34.7593],[-120.025,34.7652],[-119.746,34.5992],[-120.013,34.74],[-119.787,34.5469],[-120.05,34.7601],[-119.999,34.741],[-119.786,34.5495]];
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