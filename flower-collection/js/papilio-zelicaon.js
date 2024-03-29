var subSightings = [[-119.627,34.4751],[-119.768,34.5402],[-119.756,34.5716],[-119.607,34.5061],[-119.752,34.5996],[-119.751,34.5581],[-119.781,34.5507],[-119.607,34.506],[-119.626,34.4954],[-119.873,34.7882],[-119.799,34.4184],[-119.753,34.5725],[-119.745,34.4929],[-119.74,34.474],[-119.752,34.5997],[-119.74,34.4738],[-119.783,34.5584],[-119.78,34.5577],[-119.794,34.4242],[-119.752,34.5727],[-119.639,34.4788],[-119.708,34.4683],[-119.593,34.4902],[-119.639,34.4576],[-119.636,34.4907],[-119.729,34.4578],[-120.222,34.4962],[-119.591,34.4587],[-119.644,34.464],[-119.74,34.4741],[-119.644,34.4648],[-119.642,34.4726],[-119.757,34.5687],[-119.756,34.5103],[-119.654,34.4549],[-119.639,34.4841],[-119.757,34.5699]];
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