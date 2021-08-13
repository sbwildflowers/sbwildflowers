var subSightings = [[-119.7,34.485],[-119.65,34.4581],[-119.749,34.4882],[-119.639,34.4836],[-119.642,34.4703],[-119.72,34.4745],[-119.644,34.4696],[-119.587,34.4814],[-119.641,34.4716],[-119.659,34.4651],[-119.747,34.4967],[-119.752,34.6104],[-119.638,34.4822],[-119.701,34.4887],[-119.728,34.4598],[-119.622,34.4568],[-119.7,34.4855],[-119.644,34.4701],[-119.749,34.4883],[-119.752,34.5198],[-119.635,34.5109],[-119.643,34.4702],[-119.651,34.4607],[-119.707,34.4727],[-119.624,34.4643],[-119.635,34.5021],[-119.642,34.4702],[-119.641,34.4703],[-119.638,34.4821],[-119.749,34.4886],[-119.752,34.5196],[-119.642,34.4718],[-119.615,34.4556],[-119.641,34.4729],[-119.623,34.4678],[-119.639,34.4581],[-120.064,34.7603],[-119.644,34.4679],[-119.611,34.4553],[-119.623,34.4681],[-119.643,34.4701],[-119.642,34.47],[-119.7,34.4853],[-119.643,34.4681],[-119.864,34.5022],[-119.623,34.468],[-119.642,34.4701],[-119.7,34.4897],[-119.771,34.6295],[-119.642,34.4704],[-119.648,34.4616],[-119.645,34.4691],[-119.637,34.4821]];
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