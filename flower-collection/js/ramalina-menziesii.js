var subSightings = [[-119.992,34.8238],[-120.243,34.4946],[-119.816,34.535],[-120.102,34.7217],[-119.95,34.5658],[-120.108,34.6831],[-120.1,34.6897],[-119.818,34.5387],[-119.955,34.6457],[-119.818,34.5358],[-120.098,34.7209],[-120.241,34.5058],[-120.238,34.4883],[-120.06,34.7397],[-119.954,34.5595],[-120.095,34.7263],[-119.667,34.5226],[-119.819,34.5373],[-120.238,34.4877],[-120.097,34.7143],[-120.108,34.6846],[-120.108,34.6865],[-120.106,34.6889],[-120.061,34.7394],[-119.756,34.5158],[-120.101,34.7222],[-120.056,34.7466],[-120.1,34.6903],[-120.064,34.7371],[-119.819,34.537],[-120.065,34.7369],[-119.667,34.5228],[-119.954,34.5584],[-120.094,34.7161],[-120.06,34.7384],[-120.105,34.6936],[-120.222,34.5007],[-120.095,34.7168],[-119.667,34.5227],[-119.757,34.5315],[-120.104,34.7128],[-119.951,34.5668],[-120.237,34.4903],[-120.105,34.6801],[-120.216,34.5037],[-119.782,34.5412],[-120.226,34.498],[-120.056,34.747],[-120.241,34.4946],[-119.95,34.564],[-120.096,34.6902],[-120.1,34.6874],[-120.216,34.5034],[-120.239,34.4944],[-120.237,34.4885],[-120.222,34.4996],[-119.819,34.5371],[-120.097,34.7132],[-119.665,34.5226],[-120.24,34.4882],[-120.238,34.4878],[-119.819,34.5372],[-120.108,34.6959],[-119.782,34.5424]];
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