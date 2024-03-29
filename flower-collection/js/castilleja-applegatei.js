var subSightings = [[-119.783,34.5587],[-119.155,34.7272],[-119.308,34.6961],[-119.783,34.5589],[-119.32,34.6954],[-119.747,34.5933],[-119.351,34.6035],[-119.746,34.5929],[-119.755,34.5299],[-119.782,34.559],[-119.753,34.5986],[-119.753,34.5988],[-119.747,34.5928],[-119.372,34.6162],[-119.372,34.6161],[-119.372,34.6157],[-119.779,34.5507],[-119.351,34.6036],[-119.321,34.6958],[-119.315,34.6981],[-119.352,34.6049],[-119.146,34.7231],[-119.759,34.5274],[-119.783,34.5588],[-119.747,34.5935],[-119.759,34.5279],[-119.186,34.727],[-119.57,34.4707],[-119.321,34.6957],[-119.222,34.7276],[-119.57,34.4708],[-119.367,34.6103],[-119.759,34.5272],[-119.352,34.6053],[-119.755,34.5991]];
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