var subSightings = [[-119.69,34.4898],[-119.585,34.479],[-119.639,34.4846],[-119.759,34.5372],[-119.753,34.5045],[-119.717,34.4736],[-119.631,34.5098],[-120.067,34.5254],[-119.699,34.4936],[-119.653,34.4563],[-119.578,34.4745],[-119.63,34.5108],[-119.637,34.4972],[-119.639,34.4847],[-119.746,34.4954],[-119.75,34.5015],[-119.639,34.4853],[-119.638,34.4758],[-119.693,34.4575],[-119.749,34.5004],[-119.77,34.5472],[-119.699,34.4943],[-119.7,34.4945],[-119.762,34.5374],[-119.639,34.4848],[-119.639,34.4727],[-120.062,34.5336],[-119.734,34.4518],[-119.639,34.4845],[-119.568,34.4705],[-119.59,34.4778],[-119.636,34.486],[-119.653,34.4558],[-119.614,34.4955],[-119.644,34.4628],[-119.639,34.4852],[-120.076,34.5176],[-119.693,34.4577],[-119.699,34.4908],[-119.655,34.5238],[-119.639,34.4738],[-119.757,34.5298],[-119.591,34.4878],[-119.612,34.4552]];
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