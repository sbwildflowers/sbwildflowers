var subSightings = [[-119.695,34.5075],[-119.757,34.5125],[-119.653,34.4603],[-119.742,34.4812],[-119.755,34.5131],[-119.749,34.5252],[-119.848,34.4069],[-119.636,34.4949],[-119.8,34.4185],[-119.638,34.4785],[-119.637,34.4948],[-119.755,34.513],[-119.751,34.5028],[-119.763,34.5647],[-119.496,34.4851],[-119.63,34.5225],[-119.644,34.464],[-119.638,34.4802],[-119.638,34.4795],[-119.639,34.4805],[-119.849,34.408],[-119.496,34.4772],[-119.847,34.4066],[-119.637,34.4836],[-119.606,34.5065],[-119.644,34.4643],[-119.636,34.4825],[-119.591,34.4773],[-119.638,34.4786],[-119.636,34.4836],[-119.801,34.4187],[-119.638,34.4784],[-119.75,34.5581],[-119.591,34.4772],[-119.638,34.4783],[-119.7,34.4758],[-119.61,34.4768],[-119.643,34.4675],[-119.638,34.4788],[-119.639,34.4785],[-119.591,34.4877],[-119.769,34.55],[-119.644,34.4648],[-119.636,34.4952],[-119.809,34.512],[-119.632,34.4958],[-119.752,34.5041],[-119.639,34.4789],[-119.637,34.498],[-119.636,34.4929],[-119.757,34.5101],[-119.639,34.4807],[-119.7,34.4757],[-119.718,34.4737],[-119.638,34.4801],[-119.313,34.2792],[-119.648,34.4613],[-119.847,34.4065],[-119.756,34.5101],[-119.757,34.5098],[-119.639,34.4804],[-119.758,34.5338],[-119.689,34.491],[-119.757,34.5124],[-119.644,34.4639],[-119.642,34.4701],[-119.757,34.51],[-119.748,34.601]];
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