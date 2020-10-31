var subSightings = [[-119.7,34.5134],[-119.593,34.4907],[-119.756,34.5732],[-119.637,34.4971],[-119.694,34.5044],[-119.751,34.5821],[-119.651,34.4615],[-119.587,34.4814],[-119.59,34.4875],[-119.283,34.4764],[-119.384,34.5097],[-119.635,34.502],[-119.699,34.5129],[-119.636,34.5012],[-119.649,34.4632],[-119.655,34.5234],[-119.639,34.5125],[-119.416,34.4931],[-119.699,34.5128],[-119.787,34.5543],[-119.698,34.5128],[-119.702,34.5147],[-119.588,34.4859],[-119.289,34.4781],[-119.592,34.4895],[-119.635,34.5021],[-119.59,34.4874],[-119.593,34.4909],[-119.696,34.5107],[-119.594,34.4723],[-119.588,34.4858],[-119.755,34.5727],[-119.587,34.4813],[-119.789,34.5381],[-119.289,34.4784],[-119.539,34.4868],[-119.593,34.4722],[-119.64,34.5136],[-119.632,34.4958],[-119.591,34.4874],[-119.627,34.4955],[-119.287,34.4781],[-119.629,34.4955],[-119.653,34.5214],[-119.588,34.4856],[-119.288,34.4782],[-119.593,34.4908],[-119.696,34.51],[-119.635,34.5022],[-119.287,34.4783],[-119.29,34.4785],[-119.748,34.5235],[-119.744,34.5858],[-119.697,34.5005],[-119.697,34.5008]];
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