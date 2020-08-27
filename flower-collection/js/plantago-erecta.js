var subSightings = [[-119.749,34.5248],[-119.611,34.4964],[-119.692,34.4605],[-119.957,34.7809],[-120.057,34.753],[-119.757,34.5708],[-119.757,34.5339],[-119.64,34.5135],[-119.89,34.7761],[-120.048,34.7447],[-119.751,34.5605],[-120.055,34.7485],[-119.75,34.5734],[-120.056,34.7508],[-119.638,34.4972],[-119.611,34.4956],[-119.738,34.4222],[-119.642,34.5141],[-119.588,34.4916],[-120.053,34.7435],[-119.639,34.512],[-119.752,34.5727],[-120.222,34.4961],[-119.76,34.5668],[-119.78,34.5584],[-119.754,34.526],[-119.883,34.7765],[-119.758,34.5683],[-119.755,34.5745],[-119.748,34.5242],[-119.752,34.5734],[-119.752,34.5733],[-119.611,34.4957],[-119.792,34.5409],[-119.759,34.5678],[-120.053,34.7517],[-120.058,34.7449],[-119.78,34.5547],[-119.749,34.5708],[-119.752,34.5622],[-120.016,34.739],[-118.995,34.1131],[-119.752,34.5726],[-119.759,34.5679],[-119.737,34.551],[-119.757,34.5316],[-119.76,34.5667],[-119.922,34.7665],[-119.858,34.7436],[-119.588,34.4915],[-119.757,34.5696],[-119.759,34.5378],[-119.757,34.5178],[-119.758,34.5377],[-119.757,34.5707],[-119.752,34.5732],[-120.044,34.742],[-119.755,34.5727],[-119.782,34.559],[-119.785,34.5524],[-119.756,34.5734],[-119.752,34.5729],[-120.008,34.7377],[-119.758,34.5376],[-119.771,34.5597],[-119.642,34.514],[-119.74,34.5531],[-119.785,34.5576],[-120.109,34.7123],[-119.609,34.4955],[-119.611,34.4965],[-120.108,34.6894],[-120.058,34.7405],[-119.919,34.7677],[-119.912,34.7692],[-119.642,34.5143],[-119.785,34.5577],[-120.109,34.6889],[-120.207,34.493],[-119.756,34.5728],[-119.785,34.556],[-119.748,34.5731],[-119.758,34.5685],[-119.769,34.5514],[-119.612,34.4959],[-120.223,34.498],[-119.772,34.5591],[-120.013,34.7402],[-119.779,34.559],[-119.78,34.5546],[-120.044,34.7429],[-119.638,34.4971],[-119.787,34.5541],[-119.78,34.5583],[-120.052,34.7526],[-119.773,34.5584],[-119.749,34.5736],[-119.755,34.5728],[-119.753,34.5726],[-119.724,34.5268],[-119.784,34.5482],[-120.097,34.7208],[-120.062,34.7383],[-119.639,34.5123],[-119.772,34.5445],[-119.749,34.5247],[-119.611,34.4961],[-119.745,34.5856],[-119.639,34.5126],[-120.059,34.7442],[-120.108,34.6945],[-119.637,34.4973],[-119.959,34.7599],[-120.054,34.7491],[-119.613,34.4958],[-120.108,34.6896],[-120.055,34.7479],[-119.612,34.4963],[-119.239,34.4695],[-119.757,34.5335],[-119.612,34.4964],[-120.06,34.7397],[-120.054,34.7515],[-119.783,34.5587],[-119.78,34.5587],[-119.753,34.5799],[-119.735,34.5228],[-119.612,34.4958],[-119.753,34.5801],[-120.057,34.751],[-119.752,34.5728],[-120.104,34.7106],[-119.748,34.5732],[-119.773,34.5586],[-119.762,34.5381],[-119.611,34.4955],[-119.609,34.4956],[-119.741,34.5227],[-119.777,34.5589],[-119.759,34.5379],[-119.639,34.5125],[-119.741,34.522],[-119.919,34.7678],[-119.744,34.5855],[-119.697,34.5147],[-119.76,34.5665],[-120.009,34.7383],[-120.063,34.7367],[-119.725,34.5253],[-119.642,34.5142],[-119.96,34.7591],[-119.64,34.5134],[-119.771,34.5595],[-120.056,34.7495],[-119.772,34.5592],[-119.744,34.4837],[-119.627,34.4953],[-119.76,34.5663],[-120.058,34.7401],[-119.756,34.5729],[-119.783,34.5589],[-120.059,34.7529],[-119.755,34.5729],[-120.059,34.7444],[-120.034,34.7434],[-119.751,34.5734],[-120.043,34.7429],[-119.782,34.5591],[-119.753,34.5727],[-119.78,34.5545],[-120.068,34.7596],[-119.612,34.4962],[-119.762,34.538],[-119.273,34.4728],[-119.612,34.4966],[-119.638,34.4973],[-119.757,34.571],[-119.758,34.5335],[-119.78,34.5582],[-119.778,34.5589],[-119.637,34.4972],[-119.759,34.5676]];
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