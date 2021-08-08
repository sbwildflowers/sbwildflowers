var subSightings = [[-120.05,34.7472],[-119.631,34.508],[-119.985,34.801],[-119.956,34.7599],[-119.756,34.5296],[-119.611,34.4969],[-119.752,34.6101],[-119.636,34.495],[-119.638,34.4971],[-119.995,34.8257],[-120.065,34.7369],[-119.97,34.7298],[-119.953,34.7977],[-119.75,34.5734],[-119.748,34.573],[-119.616,34.4956],[-120,34.7374],[-119.989,34.8041],[-120.06,34.7402],[-120.057,34.7541],[-119.748,34.5726],[-119.757,34.5316],[-119.757,34.5343],[-119.611,34.496],[-119.999,34.7375],[-119.611,34.4992],[-119.783,34.5589],[-120.061,34.7422],[-120.006,34.8077],[-119.996,34.8002],[-119.757,34.5333],[-120.014,34.7401],[-119.754,34.5771],[-119.631,34.5083],[-119.754,34.5772],[-119.989,34.8042],[-119.616,34.4952],[-119.955,34.7587],[-120.056,34.7495],[-120.002,34.7348],[-119.757,34.5318],[-119.613,34.4958],[-119.609,34.495],[-119.612,34.4962],[-119.981,34.7928],[-119.61,34.4956],[-119.782,34.542],[-119.774,34.5464],[-120.022,34.7411],[-120.051,34.7441],[-119.956,34.7604],[-120.044,34.7429],[-119.616,34.4954],[-119.782,34.559],[-119.761,34.5376],[-119.611,34.4964],[-119.621,34.4943],[-120,34.7361],[-119.611,34.4961],[-119.755,34.5728],[-119.757,34.5327],[-119.61,34.4955],[-119.774,34.629],[-119.757,34.5295],[-119.613,34.4956],[-120.048,34.7455],[-120.064,34.7368],[-119.637,34.4971],[-120.053,34.7435],[-120.051,34.7436],[-119.764,34.6321],[-119.611,34.4959],[-119.975,34.7493],[-119.756,34.5728],[-119.233,34.5039],[-119.612,34.4964],[-119.622,34.4945],[-119.631,34.5086],[-119.615,34.4954],[-120.102,34.722],[-119.757,34.5319],[-119.783,34.5588],[-120.059,34.7443],[-120,34.7368],[-119.613,34.4955],[-119.616,34.4949],[-120.063,34.7367],[-119.754,34.5769],[-120.052,34.7431],[-120.051,34.7471],[-119.786,34.551],[-119.611,34.4963],[-119.982,34.7967],[-119.613,34.4959],[-120.097,34.7208],[-119.637,34.497],[-119.757,34.5342],[-119.612,34.496],[-119.774,34.5463],[-119.895,34.7811],[-119.611,34.4997],[-120.057,34.751],[-119.76,34.5373],[-119.611,34.4968],[-119.769,34.5506],[-119.637,34.4972],[-119.613,34.4954],[-119.614,34.4953],[-120.055,34.7429],[-119.773,34.5462],[-119.61,34.4954],[-120.1,34.6908],[-120.001,34.7352],[-120.048,34.7447],[-119.757,34.532],[-119.786,34.5512],[-119.749,34.5736],[-119.618,34.4945],[-120.101,34.7221],[-119.983,34.7997],[-119.752,34.6102],[-119.76,34.5372],[-119.895,34.7813],[-119.76,34.5371],[-119.752,34.6108],[-119.612,34.4957],[-119.773,34.6293],[-119.617,34.4949],[-120.001,34.7351],[-120.067,34.7614],[-119.757,34.5315],[-119.611,34.4999],[-119.89,34.7803],[-119.639,34.4973],[-119.612,34.4963],[-120.013,34.7412],[-119.756,34.5294],[-119.638,34.497],[-120.049,34.7461],[-120.099,34.6912],[-120.053,34.7517],[-119.609,34.4951],[-119.611,34.4956],[-119.786,34.5552],[-119.616,34.4953],[-119.611,34.4957],[-120.054,34.7495],[-119.753,34.5798],[-119.758,34.5359],[-120.068,34.7596],[-119.638,34.4972],[-119.611,34.4995],[-119.758,34.5357],[-120.062,34.7378],[-119.614,34.4954],[-119.757,34.5335],[-120.061,34.7397],[-120.059,34.7442],[-119.628,34.5293],[-119.638,34.4973],[-119.639,34.4974],[-119.611,34.4965],[-120.058,34.7426],[-120.05,34.747],[-119.956,34.7582],[-119.622,34.4944],[-119.622,34.4943],[-119.758,34.5358],[-119.757,34.5328],[-120.048,34.7423],[-119.609,34.4953],[-119.774,34.5462],[-119.616,34.4951],[-119.611,34.5001],[-119.969,34.73],[-119.611,34.4996],[-119.758,34.5356],[-119.621,34.4944],[-119.787,34.5539],[-119.988,34.8042],[-119.611,34.4962],[-119.956,34.7585],[-120.05,34.7473],[-120.063,34.737],[-119.773,34.6294],[-119.75,34.5733],[-120.059,34.7444],[-119.613,34.4957],[-120.1,34.6906],[-119.611,34.497],[-119.609,34.4955],[-119.755,34.5729],[-119.748,34.5728],[-120.043,34.743],[-119.636,34.4951]];
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