var subSightings = [[-119.639,34.4611],[-119.649,34.4741],[-119.639,34.4572],[-119.648,34.4705],[-119.65,34.4658],[-119.655,34.4582],[-119.639,34.4628],[-119.64,34.4612],[-119.639,34.4553],[-119.651,34.4643],[-119.649,34.47],[-119.65,34.4664],[-119.649,34.4694],[-119.643,34.4522],[-119.651,34.4627],[-119.64,34.4624],[-119.638,34.4635],[-119.651,34.4628],[-119.639,34.4613],[-119.639,34.4599],[-119.649,34.4688],[-119.651,34.4632],[-119.65,34.4644],[-119.65,34.4787],[-119.639,34.4551],[-119.649,34.4728],[-119.639,34.4573],[-119.639,34.4557],[-119.65,34.4642],[-119.639,34.4547],[-119.64,34.4627],[-119.654,34.4593],[-119.654,34.46],[-119.639,34.4609],[-119.651,34.4642],[-119.642,34.4532],[-119.644,34.4516],[-119.542,34.4864],[-119.639,34.4607],[-119.628,34.5269],[-119.65,34.4665],[-119.649,34.4761],[-119.627,34.527],[-119.64,34.4626],[-119.65,34.466],[-119.649,34.4675],[-119.649,34.4755],[-119.651,34.4649],[-119.65,34.4666],[-119.643,34.478],[-119.644,34.4514],[-119.651,34.4652],[-119.652,34.4625],[-119.643,34.4518],[-119.65,34.4651],[-119.654,34.4594],[-119.642,34.4528],[-119.642,34.4527],[-119.639,34.4554],[-119.639,34.4556],[-119.642,34.4533],[-119.639,34.463],[-119.64,34.4618],[-119.639,34.4632],[-119.649,34.4745],[-119.649,34.467],[-119.639,34.4571],[-119.639,34.4568],[-119.65,34.4775],[-119.651,34.4646],[-119.64,34.4617],[-119.653,34.4624],[-119.643,34.4525],[-119.641,34.4541],[-119.639,34.4584],[-119.639,34.4552],[-119.64,34.4615],[-119.649,34.4736],[-119.639,34.4569],[-119.648,34.4718],[-119.64,34.4613],[-119.639,34.4629],[-119.65,34.4667],[-119.642,34.4526],[-119.646,34.4498],[-119.653,34.4559],[-119.639,34.4631],[-119.651,34.4641],[-119.648,34.4708],[-119.639,34.4612],[-119.652,34.4626],[-119.651,34.4781],[-119.649,34.4672],[-119.65,34.4645]];
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