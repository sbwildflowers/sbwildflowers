var subSightings = [[-119.712,34.4725],[-119.675,34.5222],[-119.757,34.5142],[-119.632,34.5072],[-119.599,34.4944],[-119.724,34.4764],[-119.61,34.5006],[-119.699,34.4784],[-119.724,34.4757],[-119.573,34.4878],[-119.759,34.5202],[-119.726,34.475],[-119.685,34.4754],[-119.951,34.7742],[-119.593,34.4902],[-119.758,34.5289],[-119.636,34.4953],[-119.636,34.4916],[-119.748,34.4869],[-119.741,34.4759],[-119.762,34.5387],[-119.636,34.4938],[-119.665,34.4657],[-119.763,34.5648],[-119.731,34.5452],[-119.7,34.4722],[-119.771,34.5605],[-119.636,34.4934],[-119.911,34.772],[-119.758,34.5288],[-119.757,34.5096],[-119.702,34.4857],[-119.714,34.4724],[-119.889,34.7742],[-119.956,34.7773],[-119.698,34.4828],[-119.725,34.4756],[-119.595,34.4922],[-119.756,34.5114],[-119.598,34.4943],[-119.721,34.4745],[-119.587,34.4816],[-119.945,34.772],[-119.771,34.5597],[-119.588,34.4804],[-119.763,34.5652],[-119.714,34.4725],[-119.643,34.4617],[-119.74,34.4749],[-119.591,34.4749],[-119.907,34.7773],[-119.689,34.4696],[-119.702,34.4856],[-119.954,34.7763],[-119.893,34.7892],[-119.72,34.4744],[-119.743,34.5223],[-119.634,34.5041],[-119.73,34.4609],[-119.743,34.4782],[-119.673,34.5248]];
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