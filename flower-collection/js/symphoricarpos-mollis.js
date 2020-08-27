var subSightings = [[-119.7,34.4888],[-119.495,34.4791],[-119.649,34.4633],[-119.73,34.4696],[-119.283,34.4766],[-119.65,34.4624],[-119.729,34.4609],[-119.726,34.4748],[-119.65,34.4634],[-119.569,34.4709],[-119.649,34.4619],[-119.569,34.4708],[-119.66,34.4735],[-119.688,34.4694],[-119.266,34.4762],[-119.819,34.5375],[-119.725,34.4762],[-119.732,34.4678],[-119.648,34.4619],[-119.638,34.4542],[-119.733,34.4535],[-119.639,34.4563],[-119.776,34.4616],[-120.065,34.5372],[-119.773,34.5432],[-119.774,34.4653],[-119.758,34.5184],[-119.956,34.5402],[-119.732,34.4539],[-119.652,34.4624],[-119.652,34.4623],[-119.757,34.518],[-119.649,34.4632],[-119.73,34.4606],[-119.729,34.4608],[-119.65,34.4579],[-119.717,34.4733],[-119.65,34.458],[-119.592,34.4915],[-119.774,34.4654],[-119.699,34.4897],[-119.651,34.4562],[-119.289,34.4787],[-119.762,34.5386],[-119.65,34.4636],[-119.73,34.4608],[-119.651,34.4615],[-119.649,34.463],[-119.27,34.4745],[-119.818,34.5387],[-119.729,34.4575],[-119.775,34.4622],[-119.639,34.4564],[-119.289,34.4781],[-119.729,34.4715],[-119.648,34.4716],[-119.649,34.462],[-119.574,34.4878],[-119.731,34.4646],[-119.818,34.5347],[-119.649,34.4628],[-119.652,34.4559],[-119.732,34.4675],[-119.775,34.4621],[-119.65,34.4627],[-119.66,34.4652],[-119.639,34.4581],[-119.636,34.4569],[-119.755,34.508],[-119.61,34.4553],[-119.689,34.5197],[-119.686,34.5166],[-119.956,34.535],[-119.638,34.454],[-119.757,34.5181],[-119.651,34.4637],[-119.65,34.4616],[-119.661,34.4654],[-119.65,34.4622],[-119.648,34.4629],[-119.758,34.5179],[-119.652,34.4622]];
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