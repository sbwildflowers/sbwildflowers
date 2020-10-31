var subSightings = [[-119.757,34.5349],[-119.997,34.8004],[-119.639,34.4975],[-119.623,34.5352],[-119.638,34.4977],[-119.628,34.5342],[-119.606,34.5069],[-119.607,34.5055],[-119.606,34.5068],[-119.609,34.5029],[-119.629,34.5343],[-119.595,34.5136],[-119.605,34.507],[-119.628,34.5335],[-119.638,34.4971],[-120.104,34.7163],[-119.638,34.497],[-119.638,34.4976],[-119.588,34.4779],[-119.602,34.5115],[-119.637,34.4971],[-119.264,34.5647],[-119.607,34.5057],[-119.597,34.494],[-119.265,34.5643],[-119.618,34.4946],[-119.757,34.535],[-119.609,34.5032],[-119.607,34.5054],[-119.987,34.8022],[-119.607,34.5061],[-119.604,34.509],[-119.626,34.5346],[-119.936,34.7698],[-119.613,34.4956],[-119.637,34.497],[-119.612,34.4957],[-119.986,34.8018],[-120.104,34.7164],[-119.606,34.5067],[-119.638,34.4972],[-119.629,34.5346],[-119.608,34.5052],[-119.372,34.6162],[-119.608,34.5051],[-119.922,34.766],[-119.609,34.5046],[-119.625,34.5345],[-119.981,34.7928],[-119.639,34.4976],[-119.609,34.5035],[-119.608,34.5053],[-119.613,34.4958],[-119.604,34.5098],[-119.607,34.5056],[-119.629,34.5347],[-119.098,34.8181],[-119.609,34.5036],[-119.609,34.5034],[-119.264,34.472],[-119.747,34.6011],[-119.625,34.5349],[-119.613,34.4957],[-119.607,34.5062],[-119.627,34.5336],[-119.609,34.5033],[-119.637,34.4969],[-119.631,34.4957],[-119.639,34.4788],[-119.626,34.5342],[-119.637,34.4972],[-119.372,34.6163],[-119.631,34.4958],[-119.637,34.4978],[-119.637,34.4973],[-119.609,34.5031],[-119.608,34.5054],[-119.9,34.7596],[-119.612,34.4958],[-119.606,34.5065],[-119.609,34.503],[-119.627,34.5341],[-119.54,34.4868],[-119.745,34.5999],[-119.625,34.5348],[-119.747,34.601],[-119.606,34.5066],[-119.639,34.4974],[-119.612,34.4959],[-119.901,34.7596]];
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