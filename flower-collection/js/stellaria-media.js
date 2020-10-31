var subSightings = [[-119.744,34.4845],[-119.644,34.4594],[-119.757,34.5158],[-119.781,34.4316],[-119.651,34.4609],[-119.649,34.4635],[-119.725,34.476],[-119.759,34.5202],[-119.734,34.4517],[-119.65,34.4634],[-119.754,34.4383],[-119.956,34.5513],[-120.237,34.4887],[-120.237,34.4898],[-119.732,34.4532],[-119.73,34.4608],[-119.759,34.5256],[-119.749,34.4876],[-119.688,34.4671],[-119.755,34.4368],[-119.759,34.5254],[-119.76,34.5211],[-119.62,34.4942],[-119.756,34.4369],[-119.649,34.4636],[-119.653,34.4559],[-119.675,34.4576],[-119.136,34.452],[-119.73,34.4607],[-119.744,34.4846],[-120.219,34.4966],[-119.729,34.4606],[-119.843,34.5342],[-119.845,34.4064],[-119.725,34.4761],[-119.665,34.4657],[-119.733,34.4524],[-119.739,34.4046],[-119.707,34.4727],[-120.063,34.7372],[-119.878,34.4073],[-119.77,34.5523],[-119.689,34.4743],[-119.726,34.4745],[-119.757,34.5106],[-119.816,34.5114],[-119.653,34.4563],[-119.734,34.4403],[-119.759,34.5246],[-119.744,34.4843],[-119.845,34.4065],[-119.591,34.4617],[-119.733,34.4523]];
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