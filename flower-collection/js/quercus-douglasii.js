var subSightings = [[-119.794,34.5412],[-120.052,34.752],[-119.819,34.5372],[-119.819,34.537],[-119.999,34.7374],[-119.778,34.559],[-120.008,34.7375],[-120.054,34.7493],[-119.971,34.7301],[-119.992,34.8197],[-119.794,34.541],[-119.819,34.5368],[-120.056,34.7428],[-120.063,34.7589],[-120.055,34.7429],[-119.772,34.5447],[-119.782,34.5438],[-120,34.8167],[-119.769,34.5508],[-119.769,34.5504],[-119.817,34.5333],[-119.97,34.73],[-120.053,34.7438],[-120.065,34.7369],[-119.816,34.5423],[-119.769,34.5507],[-119.782,34.5412],[-119.953,34.7979],[-119.792,34.542],[-120.097,34.7144],[-120,34.7374],[-120.05,34.744],[-120.066,34.7609],[-120.062,34.7412],[-120.054,34.7494],[-120,34.7353],[-119.816,34.5419],[-119.773,34.5454],[-120.055,34.748],[-120.056,34.7491],[-119.632,34.508],[-120.06,34.7384],[-120.093,34.7248],[-120.06,34.7397],[-120.033,34.7425],[-119.782,34.5437],[-119.997,34.7362]];
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