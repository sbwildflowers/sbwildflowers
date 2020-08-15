var subSightings = [[-119.732,34.4547],[-119.648,34.4709],[-119.654,34.4586],[-119.63,34.5123],[-119.628,34.5216],[-119.775,34.5451],[-119.63,34.5127],[-119.628,34.5269],[-119.291,34.4782],[-119.628,34.5221],[-119.671,34.4673],[-119.63,34.5212],[-119.708,34.468],[-119.628,34.522],[-119.62,34.5374],[-119.747,34.6008],[-119.653,34.4546],[-119.709,34.468],[-119.661,34.4655],[-119.663,34.4681],[-119.642,34.4528],[-119.591,34.4635],[-119.647,34.4745],[-119.639,34.4612],[-119.622,34.4509],[-119.731,34.4551],[-119.708,34.4679],[-119.755,34.5989],[-119.629,34.5124],[-119.63,34.5131],[-119.63,34.5128],[-119.639,34.4572],[-119.708,34.4683],[-119.746,34.6129],[-119.8,34.4184],[-119.659,34.4652],[-119.709,34.4678],[-119.802,34.4192],[-119.657,34.4634],[-119.63,34.513],[-119.382,34.5071],[-119.649,34.47],[-119.799,34.4186],[-119.629,34.5123],[-119.639,34.4581],[-119.745,34.6002],[-119.623,34.4557]];
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