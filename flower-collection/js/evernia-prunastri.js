var subSightings = [[-119.599,34.4941],[-119.591,34.4878],[-119.73,34.4614],[-119.636,34.486],[-119.758,34.5326],[-119.651,34.4627],[-119.608,34.4541],[-119.642,34.4718],[-120.062,34.5336],[-119.639,34.4736],[-119.59,34.4778],[-119.772,34.5448],[-119.65,34.4611],[-119.826,34.4218],[-119.749,34.4889],[-119.63,34.5108],[-120.067,34.5254],[-119.614,34.4955],[-119.585,34.479],[-119.639,34.4738],[-119.757,34.534],[-119.693,34.4575],[-119.718,34.4737],[-119.807,34.4241],[-119.612,34.4552],[-119.73,34.4616],[-119.633,34.5172],[-119.762,34.5374],[-119.604,34.4562],[-119.786,34.4265],[-119.717,34.4736],[-119.757,34.5332],[-119.774,34.546],[-119.65,34.4613],[-119.746,34.5553],[-119.646,34.4605],[-119.759,34.5372],[-119.65,34.4612],[-119.591,34.461]];
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