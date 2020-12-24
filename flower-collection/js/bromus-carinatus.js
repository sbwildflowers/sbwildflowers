var subSightings = [[-119.725,34.476],[-119.655,34.4585],[-119.729,34.4721],[-119.729,34.4554],[-119.732,34.465],[-119.652,34.4562],[-119.728,34.4731],[-119.647,34.4655],[-119.747,34.4907],[-119.748,34.4984],[-119.724,34.4759],[-119.655,34.4598],[-119.659,34.4675],[-119.72,34.4749],[-119.746,34.4921],[-119.745,34.4939],[-119.591,34.4621],[-119.748,34.4896],[-119.659,34.4652],[-119.745,34.493],[-119.755,34.51],[-119.698,34.4804],[-119.591,34.4637],[-119.732,34.4651],[-119.732,34.4678],[-119.758,34.5358],[-119.73,34.4697],[-119.712,34.473],[-119.745,34.4934],[-119.651,34.4632],[-119.65,34.4617],[-119.653,34.4547],[-119.702,34.4732],[-119.728,34.4573],[-119.638,34.4798],[-119.663,34.4665],[-119.732,34.4659],[-119.728,34.4735],[-119.691,34.4627],[-119.728,34.4613],[-119.748,34.4891],[-119.639,34.4803],[-119.745,34.4924],[-119.662,34.4664],[-119.634,34.4827],[-119.649,34.4695],[-119.649,34.459],[-119.732,34.4665],[-119.653,34.4607],[-119.732,34.4539],[-119.71,34.4732],[-119.661,34.4687],[-119.663,34.4681],[-119.654,34.4595],[-119.65,34.4634],[-119.639,34.4804],[-119.697,34.4783],[-119.757,34.5097],[-119.588,34.4697],[-119.65,34.4635],[-119.591,34.4636],[-119.724,34.4766]];
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