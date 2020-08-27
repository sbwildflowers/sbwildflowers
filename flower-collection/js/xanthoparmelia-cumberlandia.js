var subSightings = [[-119.639,34.4718],[-119.729,34.4613],[-119.611,34.4517],[-119.743,34.4065],[-119.68,34.4772],[-119.761,34.5383],[-119.57,34.4706],[-120.062,34.5336],[-119.731,34.4636],[-119.691,34.4887],[-119.568,34.4706],[-119.724,34.4765],[-119.69,34.4898],[-119.729,34.4612],[-119.643,34.4614],[-120.067,34.5254],[-119.699,34.4936],[-119.586,34.48],[-119.639,34.4724],[-119.636,34.4862],[-119.653,34.4558],[-119.644,34.4647],[-119.586,34.4799],[-120.076,34.5168],[-119.644,34.4648],[-119.65,34.4635],[-119.586,34.4801],[-119.611,34.4511],[-119.7,34.4783],[-119.714,34.4952],[-119.586,34.479],[-119.636,34.4859],[-119.636,34.486],[-119.644,34.4703],[-119.754,34.5725],[-119.598,34.494],[-119.749,34.4998]];
$(document).ready(function() {
	var vectorSource = new ol.source.Vector({
      //create empty vector
    });

	//create a bunch of icons and add to source vector
	subSightings.forEach(function(item,index) {
		var iconFeature = new ol.Feature({
		          geometry: new  
		            ol.geom.Point(ol.proj.fromLonLat(item)),
		        name: 'Flower',
		        population: 4000,
		        rainfall: 500
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
        src: 'flower.png'
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