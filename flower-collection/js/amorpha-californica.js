var subSightings = [[-119.609,34.503],[-119.286,34.4776],[-119.614,34.4953],[-119.746,34.6007],[-119.745,34.6002],[-119.613,34.4955],[-119.241,34.542],[-119.744,34.5993],[-119.613,34.4954],[-119.744,34.5995],[-119.744,34.5997],[-119.609,34.5032],[-119.598,34.4941],[-119.757,34.5144],[-119.744,34.5998],[-119.957,34.5338],[-119.752,34.6014],[-119.747,34.601],[-119.607,34.4943],[-119.609,34.5029],[-119.75,34.6117],[-119.609,34.5028],[-119.496,34.4851],[-119.757,34.5147],[-119.757,34.5146],[-119.608,34.4944],[-119.608,34.4945],[-119.757,34.5145],[-119.598,34.494],[-119.749,34.6003],[-119.614,34.4954],[-119.747,34.6008],[-119.957,34.5339],[-119.269,34.4748],[-119.745,34.6003],[-119.75,34.6115],[-119.747,34.6009],[-119.628,34.5285],[-119.766,34.6319],[-119.609,34.5033],[-119.749,34.6004],[-119.608,34.4946],[-119.627,34.5226],[-119.627,34.5228],[-119.744,34.5994],[-119.757,34.514],[-119.627,34.5221],[-119.606,34.5069],[-119.746,34.6125],[-119.746,34.6008],[-119.766,34.632],[-119.631,34.514],[-119.745,34.5999],[-119.609,34.5031],[-119.749,34.6002],[-119.631,34.5142],[-119.608,34.4947],[-119.627,34.522],[-119.286,34.4777],[-119.745,34.5995]];
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