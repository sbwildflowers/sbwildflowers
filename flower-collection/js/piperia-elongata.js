var subSightings = [[-119.72,34.4748],[-119.587,34.4833],[-120.179,34.5097],[-119.713,34.4731],[-120.189,34.5075],[-119.585,34.4804],[-119.756,34.5128],[-119.713,34.4728],[-119.753,34.5191],[-119.713,34.4949],[-119.635,34.4953],[-119.72,34.4742],[-119.72,34.4745],[-119.713,34.473],[-119.643,34.4704],[-119.588,34.4799],[-119.719,34.4745],[-119.589,34.48],[-119.568,34.4808],[-119.72,34.4744],[-119.583,34.4808],[-119.754,34.5188],[-119.753,34.519],[-119.755,34.5131],[-119.756,34.5132],[-119.752,34.5104],[-119.589,34.4801],[-119.637,34.4974],[-119.755,34.5098],[-119.636,34.4965],[-119.719,34.475],[-119.586,34.4802],[-119.588,34.4804],[-119.643,34.4705],[-119.225,34.4934],[-119.635,34.5034],[-119.682,34.4827],[-119.637,34.4975],[-119.649,34.4628],[-119.637,34.4967],[-119.752,34.5199],[-119.713,34.4729],[-119.636,34.4968],[-119.752,34.5193],[-119.759,34.5191],[-119.583,34.4806],[-119.685,34.4755],[-119.637,34.4966],[-119.589,34.4804],[-119.568,34.4809],[-119.589,34.4803],[-119.754,34.522],[-119.756,34.5136],[-119.497,34.4767],[-119.756,34.5137],[-119.587,34.4818],[-119.756,34.5135],[-119.588,34.4834],[-119.635,34.4952],[-119.759,34.527],[-119.756,34.5138],[-119.72,34.4743],[-119.586,34.4801],[-119.72,34.4741],[-119.589,34.4802],[0,4],[-119.636,34.4952],[-119.752,34.5197],[-119.584,34.4805],[-119.756,34.5099],[-119.637,34.4976],[-119.72,34.4746],[-119.759,34.5192],[-119.755,34.51],[-119.682,34.483],[-119.755,34.5101],[-119.755,34.5099],[-119.72,34.4747],[-119.753,34.5228],[-120.188,34.5077],[-119.752,34.5195],[-119.588,34.48]];
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