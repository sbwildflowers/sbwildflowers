var subSightings = [[-119.749,34.5248],[-119.748,34.5232],[-119.755,34.5192],[-119.754,34.5213],[-119.758,34.5187],[-119.754,34.5205],[-120.213,34.495],[-119.791,34.5307],[-119.75,34.5148],[-119.929,34.5236],[-119.748,34.5237],[-120.03,34.5332],[-119.755,34.5203],[-119.817,34.5273],[-119.96,34.5329],[-119.808,34.5118],[-119.758,34.5183],[-119.75,34.5156],[-119.752,34.5251],[-119.811,34.5209],[-120.036,34.5301],[-119.796,34.5267],[-119.75,34.5145],[-119.96,34.5324],[-119.749,34.5249],[-119.749,34.5251],[-119.953,34.5265],[-119.79,34.5367],[-119.751,34.5215],[-119.791,34.5411],[-119.75,34.5146],[-119.751,34.5156],[-120.219,34.4964],[-119.96,34.5323],[-119.8,34.5143],[-119.957,34.5243],[-119.75,34.5154],[-119.75,34.5147],[-119.818,34.5287],[-119.751,34.5233],[-119.955,34.5392],[-119.749,34.525],[-119.754,34.5192],[-119.755,34.5193],[-119.751,34.5157],[-119.791,34.541],[-119.79,34.5407],[-119.758,34.5188],[-119.752,34.525],[-119.752,34.5158],[-119.76,34.5223],[-120.025,34.5334],[-119.751,34.5255],[-120.052,34.5357],[-119.805,34.513],[-119.751,34.5216],[-119.758,34.5186],[-119.751,34.5158],[-119.75,34.5256],[-119.755,34.5201],[-119.755,34.5195],[-119.793,34.5272],[-120.075,34.5173],[-120.045,34.5355],[-119.755,34.5191],[-119.75,34.5189],[-119.751,34.5254],[-120.009,34.529],[-119.805,34.5131],[-120.039,34.5327],[-119.96,34.5326],[-119.75,34.5237],[-119.8,34.5142],[-119.754,34.519],[-119.796,34.5128],[-119.749,34.5252],[-119.751,34.5212],[-119.755,34.5196],[-119.75,34.5155],[-119.754,34.5191],[-120.191,34.5066],[-120.215,34.4964],[-119.818,34.5284],[-119.75,34.5255],[-119.794,34.5191],[-119.751,34.5214],[-119.75,34.5217],[-119.954,34.5261],[-119.746,34.5231],[-119.75,34.5257],[-119.75,34.5209],[-119.752,34.5157],[-119.748,34.5233],[-119.75,34.5211],[-119.758,34.5184],[-119.915,34.5208],[-119.76,34.5222],[-119.955,34.527],[-119.75,34.521],[-119.749,34.5196],[-119.753,34.5163],[-120.204,34.4959],[-119.755,34.5194]];
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