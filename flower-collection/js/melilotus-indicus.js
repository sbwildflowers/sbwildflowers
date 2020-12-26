var subSightings = [[-119.699,34.4177],[-119.73,34.4552],[-119.763,34.5649],[-119.757,34.4367],[-119.279,34.519],[-119.77,34.5606],[-119.739,34.4221],[-119.639,34.4572],[-119.729,34.4563],[-119.611,34.4521],[-119.61,34.4954],[-119.648,34.4874],[-119.749,34.5248],[-119.729,34.4561],[-119.637,34.4977],[-119.825,34.422],[-119.756,34.5732],[-119.786,34.55],[-119.642,34.4532],[-119.771,34.5604],[-119.673,34.5249],[-119.753,34.6086],[-119.762,34.5664],[-119.635,34.4973],[-119.539,34.487],[-119.767,34.5427],[-119.76,34.5667],[-119.668,34.4894],[-119.611,34.4502],[-119.621,34.5398],[-119.631,34.5202],[-119.739,34.5226],[-120.232,34.4972],[-119.766,34.5421],[-119.402,34.4992],[-119.663,34.4184],[-119.681,34.5159],[-119.846,34.4061],[-119.731,34.4615],[-119.744,34.5229],[-119.747,34.523],[-119.61,34.4955],[-119.728,34.4565],[-119.654,34.5221],[-119.773,34.5587],[-119.73,34.455],[-119.67,34.5067],[-119.641,34.4539],[-119.768,34.5403],[-119.592,34.4917],[-119.908,34.7767],[-119.759,34.5273],[-119.761,34.5392],[-119.735,34.465],[-119.605,34.5072],[-119.637,34.4981],[-119.592,34.4616],[-119.637,34.498],[-119.875,34.4175],[-119.763,34.5648],[-119.826,34.4219],[-119.639,34.4588],[-119.661,34.4538],[-119.671,34.5067],[-120.059,34.7445],[-119.849,34.4081],[-119.767,34.5651],[-119.764,34.5415],[-120.007,34.8092],[-119.64,34.5136],[-119.786,34.5532],[-119.606,34.5072],[-119.936,34.7697],[-119.729,34.4562],[-119.776,34.5461],[-119.61,34.4957],[-119.738,34.4224],[-119.634,34.5042],[-119.639,34.4616],[-119.847,34.4067],[-119.654,34.5219],[-119.62,34.4818],[-119.728,34.4563],[-119.639,34.4585],[-119.769,34.5503],[-119.761,34.5393],[-119.731,34.4687],[-119.609,34.5028],[-119.772,34.5444],[-119.73,34.4551],[-119.624,34.4953],[-119.654,34.522],[-119.637,34.4978]];
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