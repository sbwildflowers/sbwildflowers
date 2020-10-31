var subSightings = [[-119.599,34.4941],[-119.621,34.5365],[-119.697,34.4778],[-119.637,34.4971],[-119.775,34.5452],[-119.597,34.4936],[-119.785,34.5558],[-119.697,34.4782],[-119.6,34.4936],[-119.609,34.4948],[-119.651,34.5197],[-119.599,34.494],[-119.637,34.4972],[-119.609,34.4949],[-119.609,34.4952],[-119.637,34.4976],[-119.623,34.5354],[-119.647,34.5166],[-119.648,34.5182],[-119.595,34.4919],[-119.636,34.4977],[-119.597,34.494],[-119.603,34.493],[-119.622,34.4944],[-119.597,34.4938],[-119.285,34.4774],[-119.597,34.4937],[-119.595,34.4918],[-119.599,34.4938],[-119.753,34.5726],[-119.785,34.5577],[-119.603,34.4931],[-119.748,34.5236],[-119.596,34.4933],[-120.198,34.5025],[-119.651,34.52],[-119.648,34.518],[-119.651,34.5199],[-119.621,34.5363],[-119.596,34.4934],[-119.599,34.4939],[-119.595,34.4921],[-119.635,34.5037],[-119.785,34.5559],[-119.596,34.4931],[-119.648,34.5181],[-119.622,34.4945],[-119.595,34.4916],[-119.697,34.4781],[-119.597,34.4939],[-119.748,34.524],[-119.638,34.4971],[-119.621,34.5362],[-119.785,34.556],[-119.594,34.4916],[-119.746,34.5232],[-119.638,34.497],[-119.754,34.5726],[-119.635,34.5036],[-119.643,34.5138],[-119.609,34.4947],[-119.785,34.5578],[-119.623,34.495],[-119.62,34.5366],[-119.626,34.4955],[-119.786,34.555],[-119.594,34.4915],[-119.648,34.5167]];
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