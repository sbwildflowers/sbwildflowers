var subSightings = [[-119.682,34.4812],[-119.672,34.5014],[-119.583,34.4907],[-119.638,34.4785],[-119.624,34.463],[-119.956,34.5425],[-119.47,34.4928],[-119.681,34.4809],[-120.064,34.5344],[-119.672,34.5013],[-119.583,34.4911],[-119.449,34.491],[-119.672,34.5017],[-119.681,34.4797],[-119.583,34.491],[-119.624,34.4631],[-119.834,34.5238],[-119.685,34.4755],[-119.606,34.4939],[-119.672,34.5019],[-119.471,34.4928],[-119.468,34.4916],[-119.956,34.5435],[-119.605,34.4935],[-119.816,34.5108],[-119.956,34.5423],[-119.956,34.5417],[-119.606,34.4943],[-119.672,34.4976],[-119.544,34.4896],[-119.583,34.4912],[-119.623,34.4591],[-119.68,34.478],[-119.591,34.4658],[-119.68,34.4777],[-119.956,34.5416],[-119.681,34.4808],[-119.684,34.4758],[-119.672,34.5012],[-119.624,34.4632],[-119.583,34.4906],[-119.957,34.5414],[-119.583,34.4909],[-119.685,34.4756],[-119.607,34.4942],[-119.682,34.4806],[-119.544,34.4895],[-119.672,34.5016],[-119.672,34.5011],[-119.638,34.4786],[-119.955,34.544],[-119.956,34.5426]];
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