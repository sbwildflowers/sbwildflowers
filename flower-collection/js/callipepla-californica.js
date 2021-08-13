var subSightings = [[-119.763,34.5648],[-119.639,34.4807],[-119.576,34.4884],[-119.719,34.474],[-119.635,34.5008],[-119.911,34.7725],[-119.638,34.4804],[-119.601,34.4562],[-119.757,34.5296],[-119.633,34.4959],[-119.758,34.5374],[-119.644,34.4631],[-119.714,34.4723],[-119.693,34.5017],[-119.58,34.4549],[-119.783,34.5584],[-119.701,34.455],[-119.751,34.503],[-119.634,34.4998],[-119.59,34.4787],[-119.632,34.5072],[-119.92,34.7665],[-119.599,34.4942],[-119.597,34.4938],[-119.751,34.5022],[-119.914,34.7687],[-119.67,34.5067],[-119.674,34.4554],[-119.698,34.5],[-119.636,34.4956],[-119.75,34.5006],[-119.611,34.4987],[-119.694,34.4782],[-119.636,34.4901],[-119.757,34.5325],[-119.685,34.4549],[-119.603,34.493],[-119.77,34.5503],[-119.631,34.5303],[-119.735,34.4664],[-119.64,34.5131],[-119.724,34.4765],[-119.701,34.4721],[-119.729,34.4535],[-119.654,34.522],[-119.636,34.4885],[-119.61,34.5012],[-119.747,34.5561],[-119.634,34.505],[-119.636,34.4892],[-119.606,34.4937],[-119.636,34.5017],[-119.598,34.4939],[-119.701,34.4726],[-119.674,34.4558],[-119.675,34.4572],[-119.633,34.5096],[-119.72,34.4745],[-119.647,34.517],[-119.638,34.479],[-119.754,34.5316],[-119.603,34.4563],[-119.693,34.4994],[-119.628,34.5279],[-119.651,34.5196],[-119.62,34.541],[-119.627,34.5261],[-119.769,34.5519],[-119.6,34.4935],[-119.679,34.4563],[-119.887,34.7763],[-119.74,34.474],[-119.595,34.4927],[-119.771,34.5423],[-119.752,34.5105],[-119.643,34.4592],[-119.667,34.4542],[-119.852,34.5027],[-119.757,34.5687],[-119.719,34.4744],[-119.736,34.4654],[-119.803,34.5143],[-119.549,34.4886],[-119.587,34.4607],[-119.356,34.6868],[-119.756,34.5716],[-119.723,34.4757],[-119.729,34.4724],[-119.74,34.4715],[-119.639,34.4831],[-119.632,34.5075],[-119.631,34.5188],[-119.762,34.5391],[-120.069,34.5124],[-119.609,34.4949],[-119.77,34.5449],[-119.786,34.5532],[-119.783,34.5583],[-119.643,34.4591],[-119.767,34.5644],[-119.616,34.4483],[-119.75,34.6],[-119.636,34.4916],[-119.634,34.4826],[-119.598,34.4741],[-119.636,34.488],[-119.637,34.4773],[-119.637,34.4776],[-119.611,34.4961],[-119.729,34.4543],[-119.905,34.5199],[-119.636,34.4933],[-119.696,34.4995]];
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