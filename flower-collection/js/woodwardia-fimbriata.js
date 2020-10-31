var subSightings = [[-119.624,34.4643],[-119.649,34.4757],[-119.639,34.4575],[-119.65,34.4638],[-119.659,34.467],[-119.591,34.464],[-119.724,34.4768],[-119.639,34.4603],[-119.639,34.4555],[-119.623,34.4658],[-119.639,34.4583],[-119.623,34.4653],[-119.649,34.4629],[-119.495,34.4827],[-119.623,34.4657],[-119.427,34.4893],[-119.651,34.4638],[-119.726,34.4756],[-119.592,34.4594],[-119.591,34.4637],[-119.659,34.4669],[-119.624,34.4693],[-119.591,34.4639],[-119.624,34.4622],[-119.659,34.4809],[-119.639,34.4577],[-119.495,34.4828],[-119.648,34.4707],[-119.624,34.4634],[-119.591,34.4636],[-119.624,34.4642],[-119.624,34.4663],[-119.623,34.4654],[-119.623,34.4656],[-119.624,34.4694],[-119.639,34.4585],[-119.589,34.4771],[-119.639,34.4614],[-119.622,34.4648],[-119.623,34.4655],[-119.727,34.4745],[-119.65,34.4637],[-119.727,34.4744],[-119.639,34.4557],[-119.623,34.4692],[-119.495,34.4825],[-119.651,34.4784],[-119.623,34.4694],[-119.651,34.4637],[-119.639,34.4554]];
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