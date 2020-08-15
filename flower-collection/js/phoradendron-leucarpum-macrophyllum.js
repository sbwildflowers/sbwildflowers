var subSightings = [[-119.699,34.4957],[-119.843,34.4454],[-120.064,34.7595],[-120.062,34.5336],[-120.008,34.7375],[-119.589,34.4864],[-119.766,34.5419],[-119.735,34.447],[-119.611,34.4968],[-119.701,34.4956],[-119.701,34.4953],[-119.582,34.5129],[-119.69,34.4916],[-119.997,34.7362],[-119.775,34.5441],[-119.775,34.5442],[-119.997,34.8238],[-119.729,34.569],[-119.888,34.7946],[-119.321,34.5964],[-120.033,34.7425],[-119.753,34.5798],[-119.7,34.4963],[-119.377,34.5056],[-119.631,34.5305],[-119.954,34.7613],[-119.756,34.54],[-119.754,34.5726],[-119.769,34.5539],[-120.053,34.7438],[-119.876,34.7905],[-119.747,34.5993],[-120.219,34.503],[-119.747,34.5996],[-119.734,34.5959],[-119.612,34.4961],[-119.721,34.5647],[-120,34.7374],[-119.547,34.4877],[-120.057,34.7507],[-119.699,34.4955],[-120.064,34.4901],[-119.699,34.4956],[-119.754,34.5797],[-119.76,34.5401],[-119.952,34.798],[-119.218,34.7262],[-119.7,34.4955],[-119.865,34.7814],[-119.769,34.5624],[-119.771,34.557],[-120.061,34.7429],[-119.69,34.4903],[-119.806,34.4373],[-119.751,34.5391],[-119.769,34.5544],[-119.645,34.515],[-119.69,34.4914],[-119.589,34.4863],[-119.7,34.4849],[-119.775,34.5443],[-119.971,34.7301],[-119.18,34.7261],[-119.591,34.5145]];
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