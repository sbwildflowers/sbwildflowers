var subSightings = [[-119.865,34.5062],[-119.841,34.5007],[-119.866,34.507],[-119.697,34.4695],[-119.749,34.4881],[-119.806,34.5154],[-119.797,34.5106],[-119.669,34.4675],[-119.692,34.4724],[-119.804,34.5148],[-119.715,34.4828],[-119.749,34.4879],[-119.819,34.5285],[-119.804,34.5137],[-119.699,34.4897],[-119.843,34.5002],[-119.689,34.4709],[-119.708,34.4782],[-119.844,34.4998],[-119.864,34.5023],[-119.804,34.5149],[-119.816,34.534],[-119.749,34.4877],[-119.815,34.5261],[-119.707,34.4776],[-119.713,34.4816],[-119.71,34.4791],[-119.806,34.5123],[-119.699,34.4898],[-119.816,34.5337],[-119.7,34.4895],[-119.7,34.4888],[-119.697,34.4693],[-119.712,34.4809],[-119.689,34.4711],[-119.807,34.5121],[-119.714,34.4834],[-119.804,34.5134],[-119.813,34.5251],[-119.67,34.4677],[-119.816,34.5338],[-119.748,34.488],[-119.698,34.4691],[-119.807,34.5157],[-119.712,34.4812],[-119.81,34.5117],[-119.864,34.5014],[-119.749,34.4883],[-119.844,34.4999],[-119.748,34.4882],[-119.709,34.4784],[-119.81,34.5192],[-119.805,34.515],[-119.711,34.4796],[-119.707,34.4772],[-119.749,34.488],[-119.689,34.4706],[-119.714,34.482],[-119.7,34.4894],[-119.697,34.4692],[-119.809,34.5168],[-119.749,34.4885],[-119.816,34.5345],[-119.714,34.4822],[-119.749,34.4882],[-119.707,34.477],[-119.712,34.4804],[-119.712,34.4805],[-119.7,34.4884],[-119.689,34.4714],[-119.812,34.5236],[-119.688,34.4709],[-119.689,34.471]];
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