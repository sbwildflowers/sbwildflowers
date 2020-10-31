var subSightings = [[-119.644,34.4645],[-119.637,34.4781],[-119.638,34.4784],[-119.639,34.4718],[-119.639,34.4804],[-119.771,34.626],[-119.644,34.4648],[-119.639,34.4788],[-119.644,34.4644],[-119.661,34.4672],[-119.593,34.4715],[-119.644,34.4646],[-119.638,34.4796],[-119.636,34.4953],[-119.287,34.4779],[-119.634,34.4827],[-119.79,34.4236],[-119.273,34.4733],[-119.781,34.559],[-119.638,34.4794],[-119.648,34.517],[-119.495,34.4791],[-119.959,34.7588],[-119.784,34.5483],[-119.644,34.4793],[-119.637,34.478],[-119.644,34.4641],[-119.644,34.4638],[-119.688,34.4749],[-119.636,34.4878],[-119.264,34.4719],[-119.496,34.4774],[-119.638,34.4803],[-119.609,34.4769],[-119.651,34.5196],[-119.223,34.4901],[-119.636,34.488],[-119.493,34.4869],[-119.644,34.4639],[-119.638,34.4781],[-119.757,34.5324],[-119.638,34.4801],[-119.639,34.4829],[-119.73,34.4276],[-119.785,34.5571],[-119.593,34.4752],[-119.637,34.4782],[-119.638,34.4786],[-119.644,34.4643],[-119.594,34.4724],[-119.638,34.478],[-119.706,34.4713],[-119.644,34.4642],[-119.612,34.4962],[-119.644,34.4637],[-119.636,34.4898],[-119.721,34.4754],[-119.639,34.4803],[-119.754,34.5726],[-119.947,34.5269],[-119.661,34.4893],[-119.644,34.464],[-119.238,34.5],[-120.204,34.4931],[-119.662,34.4671],[-119.243,34.4652],[-119.402,34.4993],[-119.637,34.4793],[-119.638,34.4783]];
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