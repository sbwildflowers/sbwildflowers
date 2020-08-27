var subSightings = [[-119.612,34.4531],[-119.791,34.43],[-119.732,34.4543],[-119.817,34.4234],[-119.636,34.4857],[-119.797,34.4268],[-119.601,34.5127],[-119.792,34.4295],[-119.768,34.4369],[-119.803,34.4259],[-119.751,34.502],[-119.791,34.4298],[-119.73,34.4553],[-119.812,34.4245],[-119.672,34.5015],[-119.799,34.4262],[-119.806,34.4392],[-119.581,34.4905],[-119.794,34.4283],[-119.759,34.5192],[-119.759,34.5191],[-119.759,34.5193],[-119.732,34.4539],[-119.632,34.5145],[-119.742,34.5224],[-119.758,34.5192],[-119.73,34.4552],[-119.728,34.4733],[-119.793,34.429],[-119.801,34.4263],[-119.757,34.5181],[-119.797,34.4267],[-119.672,34.5017],[-119.383,34.5098],[-119.565,34.4856],[-119.792,34.4296],[-119.818,34.4236],[-120.069,34.4733],[-119.805,34.4438],[-119.795,34.4278],[-119.732,34.454],[-119.732,34.4669],[-119.806,34.4256],[-119.814,34.4238],[-119.732,34.4672],[-119.807,34.4294],[-119.878,34.4165],[-119.79,34.4304],[-119.744,34.5059],[-119.632,34.5147],[-119.811,34.4249],[-119.796,34.4272],[-119.804,34.4258],[-119.611,34.455],[-119.792,34.4294],[-119.817,34.4236],[-119.732,34.4535],[-119.793,34.4287],[-119.636,34.486],[-119.807,34.4239],[-119.636,34.4859],[-119.791,34.4301],[-119.788,34.4304],[-119.732,34.4671],[-119.759,34.519],[-119.477,34.4012]];
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