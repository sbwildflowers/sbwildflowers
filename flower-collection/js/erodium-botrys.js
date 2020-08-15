var subSightings = [[-119.253,34.4728],[-119.693,34.449],[-119.612,34.4963],[-119.607,34.4539],[-119.274,34.4718],[-119.605,34.4544],[-119.787,34.4205],[-119.75,34.5233],[-119.77,34.5557],[-119.794,34.4186],[-119.585,34.475],[-119.606,34.4538],[-119.753,34.5054],[-119.878,34.4151],[-119.584,34.4755],[-119.787,34.5542],[-119.883,34.512],[-119.798,34.4185],[-119.612,34.496],[-119.688,34.4648],[-119.758,34.4633],[-119.499,34.4864],[-120.206,34.4932],[-119.753,34.5058],[-120.239,34.4941],[-119.751,34.5253],[-119.771,34.5604],[-119.787,34.4208],[-119.629,34.453],[-119.786,34.421],[-119.787,34.4206],[-119.611,34.4962],[-120.23,34.498],[-119.612,34.4964],[-119.773,34.5454],[-119.793,34.4184],[-119.751,34.5211],[-118.986,34.1008],[-119.606,34.4539],[-119.74,34.4284],[-119.751,34.5215],[-119.605,34.4541],[-119.754,34.5256],[-119.612,34.4965],[-119.751,34.5255],[-119.61,34.4957],[-119.952,34.7753],[-120.238,34.4871],[-119.906,34.5197],[-119.772,34.5452],[-119.579,34.474],[-119.746,34.4916],[-119.769,34.5531],[-119.499,34.4863],[-119.772,34.5586],[-119.742,34.5394],[-119.629,34.4523],[-119.755,34.5195],[-119.649,34.4874],[-119.873,34.5077],[-119.795,34.4183]];
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