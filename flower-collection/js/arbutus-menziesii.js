var subSightings = [[-119.688,34.5027],[-119.955,34.5288],[-120.059,34.5332],[-119.865,34.5066],[-119.57,34.4719],[-119.588,34.4804],[-119.695,34.5005],[-119.856,34.5024],[-120.059,34.5334],[-120.061,34.5334],[-119.688,34.5029],[-119.861,34.5008],[-119.954,34.5286],[-120.076,34.5384],[-119.837,34.5007],[-119.57,34.4717],[-120.055,34.5336],[-119.856,34.5023],[-120.097,34.5281],[-119.636,34.4954],[-119.638,34.4964],[-119.831,34.5021],[-119.954,34.5402],[-120.059,34.5333],[-119.955,34.5286],[-119.816,34.5116],[-119.637,34.4963],[-119.588,34.4803],[-119.605,34.4788],[-119.956,34.5289],[-119.589,34.4802],[-119.955,34.5287],[-119.593,34.4776],[-119.804,34.5149],[-119.589,34.4803],[-119.589,34.48],[-119.696,34.5007],[-120.097,34.528],[-120.06,34.533],[-119.756,34.5126],[-119.636,34.4953],[-119.637,34.4962],[-119.604,34.4787],[-119.955,34.529],[-119.861,34.5009],[-119.606,34.4784],[-120.066,34.5286],[-120.058,34.5351],[-119.57,34.472],[-119.676,34.4973],[-119.588,34.4801],[-120.076,34.5171],[-119.676,34.4974],[-119.756,34.5128],[-119.755,34.5098],[-119.756,34.5127],[-119.638,34.4963],[-119.83,34.5149],[-120.064,34.5345],[-119.75,34.5155],[-119.956,34.5287],[-119.946,34.5308],[-119.755,34.5099],[-120.057,34.5351],[-119.605,34.4786],[-119.681,34.4969],[-120.066,34.5361],[-120.129,34.5213],[-119.589,34.4801],[-119.75,34.5154],[-119.636,34.4952],[-120.059,34.5336],[-119.694,34.5],[-119.637,34.4964],[-119.502,34.4681],[-119.755,34.51]];
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