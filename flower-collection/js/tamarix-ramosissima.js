var subSightings = [[-119.62,34.5395],[-119.639,34.4603],[-119.31,34.2764],[-119.629,34.5122],[-119.571,34.5042],[-119.641,34.4535],[-119.643,34.452],[-119.654,34.4588],[-119.65,34.4648],[-119.65,34.4664],[-119.655,34.4603],[-119.595,34.4923],[-119.658,34.4658],[-119.642,34.4532],[-119.651,34.4627],[-119.642,34.4533],[-119.629,34.5123],[-119.321,34.6965],[-119.786,34.5592],[-119.756,34.5733],[-119.642,34.453],[-119.643,34.4522],[-119.639,34.4611],[-119.625,34.5112],[-119.63,34.5124],[-119.38,34.5071],[-119.654,34.4591],[-119.32,34.6961],[-119.639,34.4549],[-119.639,34.4631],[-119.629,34.5124],[-119.761,34.5393],[-119.651,34.4646],[-119.65,34.4644],[-119.643,34.4523],[-119.653,34.4559],[-119.64,34.4624],[-119.639,34.4612],[-119.6,34.5122],[-119.63,34.5123],[-119.642,34.4526],[-119.629,34.5273],[-119.63,34.5223],[-119.629,34.5121],[-119.639,34.455],[-119.63,34.5122],[-119.602,34.5106],[-119.628,34.5231],[-119.655,34.461],[-119.591,34.4576]];
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