var subSightings = [[-119.255,34.7167],[-119.608,34.505],[-119.773,34.546],[-119.607,34.5059],[-119.771,34.5497],[-119.602,34.5117],[-119.164,34.7281],[-119.6,34.5116],[-119.606,34.5069],[-119.77,34.5503],[-119.605,34.5071],[-119.755,34.5318],[-119.607,34.5055],[-119.606,34.506],[-119.606,34.5068],[-119.748,34.5731],[-119.604,34.5092],[-119.758,34.5354],[-119.603,34.5105],[-119.771,34.5498],[-119.518,34.4891],[-119.605,34.507],[-119.731,34.5434],[-119.147,34.7234],[-119.769,34.5528],[-119.769,34.5504],[-119.77,34.5511],[-119.769,34.5531],[-119.603,34.5109],[-119.771,34.5499],[-119.166,34.7278],[-119.771,34.5502],[-119.772,34.5459],[-119.58,34.5118],[-119.773,34.5461],[-119.77,34.5501],[-119.772,34.5452],[-119.604,34.5091],[-119.744,34.5547],[-119.449,34.4909],[-119.603,34.5106],[-119.146,34.7232],[-119.607,34.506],[-119.629,34.5351],[-119.607,34.5054],[-119.774,34.5463],[-119.164,34.7282],[-119.731,34.5432],[-119.769,34.5527],[-119.607,34.5061],[-119.147,34.7233],[-119.758,34.5364],[-119.605,34.5083],[-119.771,34.5501],[-119.771,34.5488],[-119.965,34.8138],[-119.603,34.5108],[-119.771,34.5503],[-119.604,34.5086],[-119.315,34.6981],[-119.606,34.5067],[-119.629,34.535],[-119.217,34.7265],[-119.78,34.5505],[-119.771,34.5496],[-119.217,34.7264],[-119.466,34.4924],[-119.79,34.5395],[-119.628,34.5323],[-119.608,34.5051],[-119.769,34.5529],[-119.155,34.7272],[-119.771,34.5494],[-119.539,34.487],[-119.755,34.5319],[-119.608,34.5053],[-119.605,34.5069],[-119.757,34.5339],[-119.977,34.8141],[-119.773,34.5456],[-119.772,34.546],[-119.771,34.55],[-119.607,34.5063],[-119.515,34.4892],[-119.628,34.5318],[-119.604,34.5084],[-119.78,34.5506],[-119.449,34.491],[-119.628,34.5319],[-119.779,34.553],[-119.779,34.5505],[-119.769,34.5526],[-119.769,34.5537],[-119.754,34.5317],[-119.773,34.5462],[-119.929,34.7664],[-119.771,34.5495],[-119.628,34.5321],[-119.731,34.5429],[-119.372,34.6163],[-119.77,34.551],[-119.754,34.5318],[-119.767,34.5597],[-119.774,34.5462],[-119.953,34.7975],[-119.608,34.5054],[-119.606,34.5064],[-119.17,34.7273],[-119.606,34.5065],[-119.773,34.5457],[-119.771,34.5585],[-119.18,34.7266],[-119.769,34.5503],[-119.58,34.5117],[-119.755,34.5317],[-119.45,34.4909],[-119.769,34.5524],[-119.741,34.5536],[-119.628,34.532],[-119.606,34.5066],[-119.983,34.8143],[-119.283,34.7001],[-119.781,34.5507],[-119.769,34.5502]];
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