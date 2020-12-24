var subSightings = [[-119.786,34.5526],[-119.723,34.476],[-119.694,34.501],[-119.711,34.467],[-119.765,34.5649],[-119.697,34.5154],[-119.77,34.4348],[-119.748,34.4968],[-119.757,34.5138],[-119.759,34.5267],[-119.798,34.4239],[-119.591,34.4625],[-119.765,34.6324],[-119.724,34.4763],[-119.692,34.5018],[-119.631,34.5105],[-119.582,34.4811],[-119.726,34.4753],[-119.635,34.4574],[-119.757,34.5109],[-119.631,34.4955],[-119.653,34.5205],[-119.707,34.4727],[-119.631,34.5082],[-119.655,34.5236],[-119.639,34.455],[-119.732,34.4529],[-119.759,34.5266],[-119.591,34.4748],[-119.571,34.4725],[-119.633,34.48],[-119.592,34.4752],[-119.773,34.546],[-119.759,34.5258],[-119.595,34.4703],[-119.62,34.4941],[-119.767,34.5644],[-119.756,34.5298],[-119.626,34.4954],[-119.75,34.4346],[-119.629,34.529],[-119.651,34.4632],[-119.61,34.5006],[-119.642,34.4529],[-119.662,34.4662],[-119.757,34.5165],[-119.626,34.4953],[-119.61,34.4552],[-119.593,34.4588],[-119.688,34.4652],[-119.653,34.5208],[-119.639,34.4557],[-119.752,34.5105],[-119.755,34.5296],[-119.739,34.5226],[-119.592,34.4568],[-119.782,34.4315],[-119.786,34.5481],[-119.634,34.5041],[-119.786,34.5537],[-119.818,34.4236],[-119.729,34.4557],[-119.611,34.4553],[-119.631,34.508],[-119.61,34.4554],[-119.746,34.5232],[-119.641,34.463],[-119.641,34.4627],[-119.729,34.4555],[-119.595,34.4923],[-119.746,34.4952]];
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