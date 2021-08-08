var subSightings = [[-119.633,34.4825],[-119.636,34.4935],[-119.749,34.5003],[-119.634,34.5109],[-119.636,34.4936],[-119.745,34.5901],[-119.634,34.5108],[-119.605,34.5071],[-119.692,34.5048],[-119.634,34.5102],[-119.785,34.5573],[-119.751,34.5999],[-119.634,34.5101],[-119.75,34.501],[-119.691,34.5022],[-119.634,34.4824],[-119.646,34.515],[-119.636,34.4937],[-119.279,34.5192],[-119.761,34.5664],[-119.612,34.4963],[-119.633,34.4822],[-119.632,34.5087],[-119.733,34.5719],[-119.644,34.4638],[-119.628,34.5332],[-119.593,34.4905],[-119.748,34.499],[-119.751,34.607],[-119.634,34.4826],[-119.752,34.5993],[-119.63,34.5187],[-119.724,34.5897],[-119.606,34.5058],[-119.261,34.584],[-119.63,34.5115],[-119.785,34.5566],[-119.611,34.4963],[-119.634,34.51],[-119.744,34.5887],[-119.589,34.4865],[-119.657,34.5252],[-119.627,34.5336],[-119.636,34.4938],[-119.567,34.4785],[-119.606,34.5067],[-119.634,34.5099],[-119.612,34.4961],[-119.692,34.5018],[-119.595,34.4577],[-119.759,34.5673],[-119.785,34.5571],[-119.646,34.5151],[-119.644,34.4642],[-119.612,34.4964],[-119.607,34.506],[-119.75,34.6003],[-119.609,34.5026],[-119.634,34.4823],[-119.634,34.5103],[-119.688,34.4899],[-119.785,34.5565],[-119.644,34.4633],[-119.609,34.5025],[-119.223,34.4907],[-119.609,34.5022],[-119.372,34.6162],[-119.752,34.5996],[-119.632,34.5082],[-119.645,34.5149],[-119.634,34.4827],[-119.644,34.4639],[-119.628,34.5322],[-119.785,34.557],[-119.759,34.5674],[-119.564,34.4801],[-119.75,34.5011],[-119.639,34.4844],[-119.752,34.5995],[-119.611,34.4965],[-119.644,34.464],[-119.648,34.4613],[-119.692,34.5022],[-119.639,34.4836],[-119.755,34.508],[-119.646,34.5147],[-119.605,34.507],[-119.785,34.5567],[-119.691,34.5023],[-119.633,34.5089],[-119.77,34.5552],[-119.639,34.4838],[-119.639,34.4847],[-119.644,34.4641],[-119.785,34.5564],[-119.753,34.599],[-119.743,34.5863],[-119.607,34.5061],[-119.906,34.7638],[-119.749,34.5004],[-119.75,34.5008],[-119.639,34.4845],[-119.607,34.5062],[-119.242,34.5333],[-119.562,34.4861],[-119.636,34.4939],[-119.688,34.49],[-119.732,34.5712],[-119.721,34.5868],[-119.562,34.4859],[-119.635,34.4827],[-119.669,34.4892],[-119.646,34.5152],[-119.606,34.5062],[-119.75,34.5009],[-119.632,34.5081],[-119.609,34.5019],[-119.609,34.502],[-119.634,34.4825],[-119.566,34.4812],[-119.748,34.4989],[-119.607,34.5059],[-119.676,34.4993]];
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