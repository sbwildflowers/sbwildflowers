var subSightings = [[-119.597,34.4577],[-119.623,34.4576],[-119.775,34.544],[-119.74,34.421],[-119.744,34.5229],[-119.746,34.5232],[-119.67,34.4546],[-119.639,34.5111],[-119.492,34.487],[-119.763,34.5653],[-119.879,34.4079],[-119.749,34.5248],[-119.773,34.5584],[-119.624,34.4952],[-119.536,34.488],[-119.637,34.4978],[-119.64,34.5132],[-119.624,34.4954],[-119.631,34.4953],[-119.638,34.4977],[-119.135,34.4513],[-119.89,34.5157],[-119.567,34.4786],[-119.787,34.4193],[-119.753,34.5066],[-119.751,34.4348],[-119.766,34.5648],[-119.759,34.5676],[-119.772,34.5451],[-119.995,34.8254],[-119.955,34.7584],[-119.606,34.5067],[-119.642,34.514],[-119.279,34.5193],[-120.066,34.5303],[-119.907,34.7775],[-119.568,34.4775],[-119.437,34.4909],[-120.06,34.7434],[-119.787,34.5469],[-119.758,34.5342],[-119.87,34.5078],[-119.285,34.4773],[-119.729,34.4719],[-119.673,34.5248],[-119.632,34.508],[-119.221,34.4763],[-120.034,34.7432],[-119.749,34.5733],[-119.762,34.5382],[-119.758,34.5187],[-119.755,34.5077],[-119.758,34.5186],[-119.634,34.4971],[-119.749,34.5251],[-119.755,34.5727],[-119.627,34.4955],[-119.847,34.4064],[-119.539,34.487],[-119.725,34.4756],[-119.751,34.529],[-119.731,34.4551],[-119.787,34.4217],[-119.996,34.8239],[-119.29,34.4786],[-119.287,34.4779],[-119.728,34.4599]];
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