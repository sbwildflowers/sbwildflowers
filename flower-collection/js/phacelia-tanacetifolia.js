var subSightings = [[-119.754,34.5991],[-120.053,34.7566],[-119.058,34.0977],[-119.787,34.5492],[-120.003,34.7476],[-119.671,34.5239],[-119.75,34.5014],[-119.786,34.5479],[-119.787,34.5462],[-119.873,34.7731],[-119.749,34.5005],[-119.774,34.6288],[-119.749,34.6167],[-119.968,34.7404],[-119.766,34.6307],[-119.766,34.6252],[-119.77,34.6255],[-119.995,34.7444],[-120.001,34.7438],[-119.967,34.7412],[-119.988,34.7457],[-119.787,34.5471],[-119.872,34.7868],[-119.785,34.5509],[-119.057,34.0978],[-119.784,34.558],[-119.786,34.5504],[-119.672,34.524],[-119.751,34.5018],[-119.75,34.5968],[-119.786,34.5509],[-119.972,34.7303],[-119.769,34.5514],[-119.786,34.5477],[-119.769,34.6287],[-120.001,34.745],[-119.785,34.5478],[-119.773,34.6293],[-119.768,34.6255],[-119.787,34.5469],[-119.824,34.4224],[-119.988,34.7459],[-119.864,34.7783],[-120.062,34.7402],[-119.972,34.7304],[-119.771,34.5576],[-119.826,34.4225],[-119.946,34.7722],[-120.054,34.7485],[-119.766,34.6302],[-119.787,34.5464],[-119.772,34.6266],[-119.994,34.737],[-119.768,34.6295],[-119.8,34.4186],[-119.747,34.5949],[-119.749,34.5004],[-119.8,34.4185],[-119.96,34.7597],[-119.785,34.5511],[-119.976,34.7315],[-119.765,34.6237],[-119.956,34.7608],[-119.99,34.7362],[-119.772,34.6278],[-119.872,34.7869],[-119.773,34.6295],[-119.767,34.6295],[-119.75,34.5016],[-119.75,34.5012],[-119.801,34.4188],[-119.93,34.7669],[-119.998,34.7402],[-119.755,34.599],[-119.885,34.7738],[-119.786,34.5483],[-119.748,34.6146],[-119.786,34.5493],[-119.801,34.4187],[-119.766,34.63],[-119.786,34.5492],[-119.769,34.5512],[-120.03,34.7689],[-119.774,34.629],[-119.628,34.5302],[-119.751,34.5019],[-120.002,34.7437],[-119.77,34.6257],[-119.749,34.6166],[-119.786,34.5494],[-119.837,34.4156],[-119.628,34.5296],[-119.77,34.5512],[-120.001,34.7421],[-119.748,34.6124],[-119.786,34.5491],[-119.996,34.74],[-119.765,34.6241],[-119.749,34.6125],[-119.967,34.7413],[-119.786,34.548],[-119.785,34.5525],[-119.75,34.6033],[-119.988,34.7468],[-120.002,34.7449],[-119.996,34.7393],[-119.759,34.6202],[-119.769,34.6288],[-119.868,34.7834],[-119.785,34.5477],[-119.769,34.6291],[-119.772,34.6295],[-120.052,34.7579],[-119.978,34.7323],[-119.787,34.5494],[-119.751,34.5013],[-119.748,34.5955]];
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