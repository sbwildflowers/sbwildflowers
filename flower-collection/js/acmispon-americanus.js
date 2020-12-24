var subSightings = [[-119.637,34.4981],[-119.612,34.4959],[-119.637,34.4978],[-119.607,34.5061],[-119.637,34.4979],[-119.609,34.5042],[-119.62,34.5392],[-119.987,34.8024],[-119.614,34.4955],[-119.758,34.5347],[-119.62,34.5375],[-119.62,34.5374],[-119.737,34.4026],[-119.986,34.8019],[-119.591,34.4884],[-119.596,34.4935],[-119.585,34.5124],[-119.62,34.5406],[-119.754,34.5254],[-119.634,34.5041],[-119.597,34.4936],[-119.757,34.5346],[-119.62,34.5373],[-119.75,34.6076],[-119.62,34.5402],[-119.608,34.5053],[-119.597,34.4935],[-119.772,34.5447],[-119.614,34.4954],[-119.609,34.5041],[-119.608,34.5054],[-119.838,34.4151],[-119.612,34.4958],[-119.637,34.498],[-119.634,34.5042],[-119.402,34.4992],[-119.999,34.8238],[-119.596,34.4927],[-119.593,34.4915],[-119.635,34.5109],[-119.596,34.4937],[-119.986,34.8018],[-119.635,34.511],[-119.61,34.5015],[-119.62,34.5403],[-119.692,34.4489],[-119.793,34.5161],[-119.737,34.4025],[-119.636,34.5112],[-119.597,34.4938],[-119.637,34.4982],[-119.754,34.5317],[-119.592,34.5142],[-119.621,34.5394],[-119.637,34.4976],[-119.61,34.5017],[-119.793,34.5163],[-119.614,34.4953],[-119.607,34.5054],[-119.596,34.4928],[-119.625,34.4953],[-119.591,34.4887],[-119.631,34.5141],[-120.226,34.5073],[-119.628,34.5335],[-119.62,34.539],[-119.596,34.4936],[-119.619,34.5405],[-119.631,34.5143],[-119.611,34.4967],[-119.637,34.4977],[-119.62,34.5404],[-119.147,34.7232],[-119.786,34.5565],[-119.612,34.496],[-119.595,34.4925]];
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