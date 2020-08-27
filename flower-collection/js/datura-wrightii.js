var subSightings = [[-119.768,34.5397],[-119.76,34.5412],[-119.675,34.4556],[-119.819,34.4406],[-119.685,34.4853],[-119.63,34.5356],[-119.788,34.4179],[-119.739,34.4062],[-119.396,34.3263],[-119.734,34.464],[-119.763,34.5413],[-119.35,34.3055],[-119.763,34.5411],[-119.685,34.487],[-119.755,34.4602],[-119.771,34.4344],[-119.784,34.4326],[-119.772,34.4344],[-119.77,34.5554],[-119.631,34.5204],[-119.805,34.4239],[-119.789,34.4178],[-119.767,34.4375],[-119.77,34.435],[-119.761,34.5397],[-119.631,34.5205],[-119.761,34.539],[-119.74,34.4136],[-119.769,34.4348],[-119.774,34.4331],[-120.026,34.4641],[-119.789,34.4179],[-120.131,34.4732],[-119.771,34.5441],[-119.631,34.5199],[-119.633,34.5171],[-119.688,34.4582],[-119.759,34.4621],[-119.775,34.433],[-119.688,34.4583],[-120.058,34.758],[-119.739,34.4058],[-119.77,34.5552],[-119.352,34.5027],[-119.629,34.5124],[-119.774,34.4332],[-119.758,34.542],[-119.767,34.5426],[-119.762,34.5404],[-119.77,34.4346],[-119.695,34.4063],[-119.783,34.4329],[-119.322,34.2845],[-119.735,34.4647],[-119.772,34.4345],[-119.769,34.435],[-119.771,34.4345],[-119.819,34.4411],[-119.767,34.5424],[-119.775,34.4331],[-119.019,34.0729],[-119.773,34.4335],[-119.685,34.4861],[-119.735,34.4652],[-119.735,34.4005],[-119.675,34.4553],[-119.763,34.5412],[-120.233,34.4809],[-119.736,34.4012],[-119.799,34.4184],[-119.77,34.5553],[-119.767,34.4376],[-119.805,34.4409],[-119.77,34.5555],[-119.735,34.4645],[-119.802,34.4188],[-119.819,34.441],[-119.767,34.5425],[-119.77,34.555],[-119.685,34.4867],[-119.736,34.4654],[-119.711,34.5334],[-119.781,34.4319],[-119.631,34.5209],[-119.735,34.4651],[-119.63,34.5123],[-119.773,34.4336],[-119.762,34.5403],[-119.633,34.5172],[-119.71,34.4513],[-119.74,34.4137],[-119.771,34.4347],[-119.97,34.4548],[-119.012,34.087],[-119.803,34.4236],[-119.761,34.5389],[-119.675,34.4557],[-119.735,34.4649],[-119.036,34.0845],[-119.685,34.4846],[-119.804,34.5436],[-119.765,34.5391],[-119.735,34.4646],[-119.769,34.4349],[-119.767,34.5422],[-119.631,34.5206],[-119.771,34.4346],[-119.768,34.5399],[-119.805,34.4241],[-119.744,34.5391],[-119.805,34.4423],[-119.74,34.4062]];
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