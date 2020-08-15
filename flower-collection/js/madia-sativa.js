var subSightings = [[-119.638,34.4794],[-119.783,34.5585],[-119.587,34.4804],[-119.723,34.476],[-119.725,34.4759],[-119.589,34.4552],[-119.649,34.4636],[-119.268,34.4748],[-119.647,34.4604],[-119.649,34.4634],[-119.639,34.4551],[-119.699,34.4783],[-119.623,34.4569],[-119.639,34.4802],[-119.588,34.4549],[-119.588,34.4782],[-119.589,34.4653],[-119.718,34.4737],[-119.639,34.4804],[-119.746,34.6133],[-119.712,34.4704],[-119.64,34.4618],[-119.866,34.5034],[-119.592,34.4571],[-119.887,34.7382],[-119.697,34.479],[-119.639,34.4618],[-119.747,34.601],[-119.639,34.4803],[-119.725,34.476],[-119.717,34.4736],[-119.635,34.5038],[-119.654,34.4599],[-119.729,34.4609],[-119.724,34.4759],[-119.72,34.4743],[-119.699,34.4719],[-119.635,34.457],[-119.697,34.4791],[-119.689,34.4646],[-119.767,34.6306],[-119.647,34.4603],[-119.711,34.4732],[-119.591,34.4587],[-119.639,34.4806],[-119.712,34.4716],[-119.61,34.4552],[-119.587,34.4782],[-119.714,34.4723],[-119.721,34.4753],[-119.76,34.5663],[-119.725,34.4757],[-119.712,34.4705],[-119.726,34.4754],[-119.654,34.4602],[-119.631,34.509],[-119.691,34.4608],[-119.717,34.4737],[-119.748,34.4894],[-119.794,34.4185],[-119.64,34.5129],[-119.729,34.461],[-119.623,34.457],[-119.597,34.4571],[-119.725,34.4756],[-119.623,34.4568],[-119.638,34.4541]];
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