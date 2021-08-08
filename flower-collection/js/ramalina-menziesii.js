var subSightings = [[-120.064,34.7371],[-120.238,34.4878],[-119.954,34.5595],[-119.816,34.535],[-119.667,34.5227],[-120.097,34.7143],[-120.095,34.7168],[-120.241,34.5058],[-119.951,34.5668],[-119.667,34.5228],[-119.667,34.5226],[-120.243,34.4946],[-120.24,34.4882],[-119.819,34.5373],[-120.108,34.6959],[-119.955,34.6457],[-119.954,34.5584],[-120.1,34.6903],[-120.097,34.7132],[-119.819,34.537],[-120.108,34.6865],[-119.782,34.5424],[-119.757,34.5315],[-120.222,34.4996],[-120.056,34.747],[-119.665,34.5226],[-120.065,34.7369],[-120.237,34.4885],[-120.105,34.6801],[-120.056,34.7466],[-120.104,34.7128],[-120.108,34.6846],[-120.226,34.498],[-120.239,34.4944],[-119.992,34.8238],[-120.06,34.7397],[-120.241,34.4946],[-120.06,34.7384],[-119.818,34.5387],[-119.95,34.564],[-120.237,34.4903],[-120.105,34.6936],[-120.098,34.7209],[-120.238,34.4883],[-119.819,34.5372],[-119.818,34.5358],[-120.108,34.6831],[-119.782,34.5412],[-120.238,34.4877],[-119.819,34.5371],[-120.222,34.5007],[-120.061,34.7394],[-120.101,34.7222],[-120.1,34.6874],[-120.095,34.7263],[-120.102,34.7217],[-120.1,34.6897],[-119.756,34.5158],[-119.95,34.5658],[-120.094,34.7161],[-120.216,34.5034],[-120.216,34.5037],[-120.106,34.6889],[-120.096,34.6902]];
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