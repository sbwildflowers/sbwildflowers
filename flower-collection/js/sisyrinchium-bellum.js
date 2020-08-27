var subSightings = [[-119.611,34.4958],[-119.61,34.4957],[-119.77,34.5518],[-119.757,34.5708],[-119.735,34.4668],[-119.639,34.4975],[-119.757,34.5326],[-119.729,34.4609],[-119.758,34.537],[-119.744,34.5226],[-119.779,34.5543],[-119.752,34.6109],[-119.757,34.5336],[-119.73,34.4698],[-119.759,34.5272],[-119.75,34.5734],[-119.638,34.4972],[-119.616,34.4955],[-120.238,34.4942],[-119.729,34.4612],[-119.689,34.4646],[-119.756,34.5724],[-120.236,34.4948],[-119.759,34.5277],[-119.774,34.5462],[-119.638,34.4976],[-119.748,34.5737],[-119.783,34.5588],[-119.754,34.577],[-120.228,34.4994],[-119.757,34.5177],[-119.73,34.4629],[-119.783,34.5584],[-119.999,34.7375],[-119.73,34.4615],[-119.786,34.5527],[-119.787,34.5539],[-119.749,34.5738],[-119.623,34.4561],[-119.748,34.5735],[-119.786,34.5534],[-119.757,34.5345],[-119.636,34.5024],[-119.77,34.5519],[-119.774,34.5463],[-119.73,34.4611],[-119.759,34.527],[-119.638,34.4978],[-119.73,34.4694],[-119.731,34.4645],[-119.78,34.5547],[-119.636,34.5025],[-119.749,34.5243],[-119.759,34.5273],[-120.064,34.7597],[-119.639,34.4976],[-119.736,34.4657],[-119.611,34.4985],[-119.76,34.5667],[-119.73,34.4693],[-119.615,34.4955],[-119.731,34.4642],[-119.757,34.5331],[-119.794,34.424],[-119.73,34.4695],[-119.609,34.4954],[-119.999,34.7374],[-119.736,34.4658],[-119.616,34.4483],[-119.729,34.461],[-119.752,34.5805],[-119.75,34.4345],[-119.015,34.1077],[-119.755,34.5727],[-119.611,34.4984],[-119.884,34.4158],[-119.782,34.559],[-119.729,34.4614],[-119.731,34.4644],[-119.759,34.5268],[-119.611,34.4995],[-119.771,34.5502],[-119.616,34.4954],[-119.744,34.5233],[-119.729,34.4608],[-119.609,34.4952],[-119.757,34.5363],[-119.766,34.5649],[-119.85,34.4077],[-119.786,34.5517],[-119.609,34.4955],[-119.759,34.5278],[-119.759,34.5377],[-119.609,34.4951],[-119.016,34.1085],[-119.757,34.5318],[-119.759,34.5269],[-119.798,34.4237],[-119.045,34.0952],[-119.756,34.5728],[-119.757,34.5328],[-119.692,34.4576],[-119.759,34.5267],[-119.76,34.5666],[-119.011,34.1104],[-119.759,34.5372],[-119.61,34.4955],[-119.758,34.536],[-119.638,34.4971],[-119.744,34.5237],[-120.231,34.5002],[-119.798,34.4239],[-119.749,34.5736],[-119.755,34.5728],[-120.235,34.4953],[-119.784,34.5482],[-120.228,34.4995],[-119.008,34.0929],[-119.688,34.4667],[-120.23,34.4988],[-120.022,34.7412],[-119.638,34.497],[-119.617,34.448],[-119.786,34.552],[-119.731,34.4643],[-119.638,34.4975],[-119.759,34.5271],[-119.637,34.4973],[-119.611,34.4996],[-120.047,34.7447],[-119.75,34.6119],[-119.731,34.4646],[-119.689,34.4645],[-120.237,34.494],[-119.609,34.4953],[-119.755,34.5296],[-119.615,34.4483],[-119.773,34.546],[-119.75,34.4348],[-119.757,34.5335],[-119.757,34.5334],[-119.882,34.4129],[-119.73,34.4613],[-119.759,34.5275],[-119.729,34.4611],[-119.757,34.5327],[-119.285,34.4774],[-119.754,34.5771],[-119.798,34.4235],[-119.78,34.5549],[-119.73,34.461],[-120.229,34.4992],[-119.776,34.4325],[-119.757,34.5705],[-118.999,34.1193],[-119.762,34.566],[-120.226,34.4992],[-120.218,34.5037],[-119.638,34.4977],[-119.752,34.6102],[-119.609,34.4956],[-119.741,34.522],[-119.74,34.405],[-119.758,34.5357],[-119.759,34.5279],[-119.758,34.5361],[-119.798,34.4236],[-119.744,34.5234],[-119.754,34.5773],[-120.241,34.4882],[-119.756,34.5729],[-119.759,34.5276],[-119.759,34.5263],[-119.798,34.4238],[-119.755,34.5729],[-119.61,34.4956],[-119.639,34.4973],[-119.73,34.4612],[-119.782,34.5591],[-120.229,34.499],[-119.75,34.4347],[-119.638,34.4974],[-119.638,34.4973],[-119.755,34.5726],[-119.78,34.5582],[-119.757,34.5703],[-119.639,34.4972],[-119.617,34.4479]];
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