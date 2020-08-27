var subSightings = [[-119.642,34.4701],[-119.959,34.5339],[-119.606,34.5065],[-119.636,34.4949],[-119.764,34.5647],[-119.643,34.4701],[-119.644,34.47],[-119.643,34.4699],[-119.999,34.8238],[-119.77,34.5085],[-119.991,34.7987],[-119.587,34.483],[-119.65,34.4634],[-119.757,34.5314],[-119.319,34.6949],[-119.643,34.4703],[-119.959,34.5336],[-119.569,34.4708],[-119.644,34.4704],[-119.636,34.494],[-119.636,34.4951],[-119.958,34.5337],[-119.953,34.5281],[-119.644,34.4696],[-119.649,34.4636],[-119.756,34.5126],[-119.607,34.5061],[-119.644,34.4706],[-119.998,34.8004],[-119.587,34.4826],[-119.957,34.5302],[-119.764,34.5646],[-119.96,34.7799],[-119.956,34.5457],[-119.649,34.4634],[-119.978,34.7894],[-119.751,34.5187],[-119.587,34.4828],[-119.606,34.5067],[-119.615,34.4955],[-119.976,34.788],[-119.98,34.7947],[-119.65,34.4623],[-119.644,34.4701],[-119.7,34.4895],[-119.957,34.5327],[-119.649,34.4629],[-119.976,34.7882],[-119.706,34.4944],[-119.622,34.4942],[-119.959,34.5322],[-119.764,34.5645],[-119.606,34.5062],[-119.643,34.4705],[-119.644,34.4697],[-119.636,34.4937],[-119.936,34.7693],[-119.636,34.495],[-119.606,34.5063],[-119.636,34.4941],[-119.755,34.5131],[-119.913,34.7656],[-119.636,34.4935],[-119.624,34.4953],[-119.755,34.5133],[-119.649,34.4621],[-119.635,34.5034],[-119.632,34.5071],[-119.981,34.7933],[-119.972,34.7878],[-119.959,34.5318],[-119.986,34.8021],[-119.957,34.5321],[-119.615,34.4954],[-119.495,34.4789],[-119.959,34.5338],[-119.959,34.5317],[-119.955,34.529],[-119.771,34.5084],[-119.958,34.5325],[-119.636,34.4952],[-119.992,34.8001],[-119.076,34.8207],[-119.624,34.4952],[-119.899,34.5206],[-119.643,34.4704],[-119.649,34.4631],[-119.649,34.4628],[-119.644,34.4707],[-119.636,34.4939],[-119.642,34.47],[-119.606,34.5066],[-119.995,34.7984],[-119.587,34.4825],[-119.606,34.5069],[-119.644,34.4702],[-119.649,34.4622],[-119.607,34.5058],[-119.606,34.5068],[-119.606,34.5064],[-119.704,34.4936],[-119.607,34.506],[-120,34.8162],[-119.936,34.7694],[-119.643,34.4707],[-119.956,34.5299],[-119.957,34.5301],[-119.636,34.4947],[-119.636,34.4943],[-119.65,34.4622],[-119.636,34.4938],[-119.649,34.4623],[-119.636,34.4948],[-119.757,34.535],[-119.959,34.5333],[-119.643,34.4706],[-119.648,34.4629],[-119.624,34.4949],[-119.587,34.4829],[-119.632,34.5072],[-119.587,34.4831],[-119.607,34.5059],[-119.606,34.506],[-119.643,34.47]];
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