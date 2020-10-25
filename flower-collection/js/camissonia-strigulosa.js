var subSightings = [[-119.579,34.4899],[-119.638,34.4785],[-119.607,34.506],[-119.758,34.5372],[-119.146,34.7235],[-119.612,34.4957],[-119.634,34.504],[-119.612,34.4968],[-119.606,34.5069],[-119.606,34.5067],[-119.597,34.4938],[-119.634,34.5041],[-119.609,34.5035],[-119.606,34.5068],[-119.613,34.4958],[-119.612,34.4967],[-119.635,34.5041],[-119.611,34.4968],[-119.578,34.4895],[-119.612,34.4964],[-119.612,34.4963],[-119.612,34.4958],[-119.58,34.4899],[-119.578,34.4894],[-119.62,34.5404],[-119.658,34.5244],[-119.581,34.4903],[-119.612,34.497],[-119.607,34.5061],[-119.609,34.5033],[-119.623,34.5354],[-119.963,34.7818],[-119.635,34.504],[-119.579,34.4897],[-119.631,34.5093],[-119.372,34.6162],[-119.612,34.4966],[-119.976,34.7884],[-119.802,34.4195],[-119.612,34.4965],[-119.612,34.4959],[-119.628,34.5319]];
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