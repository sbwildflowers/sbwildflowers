var subSightings = [[-120.208,34.4896],[-120.202,34.5003],[-120.164,34.5152],[-120.207,34.4902],[-120.218,34.4961],[-120.203,34.4995],[-120.194,34.505],[-120.121,34.52],[-120.179,34.5097],[-120.193,34.5052],[-120.201,34.5005],[-120.207,34.4896],[-120.193,34.5053],[-120.171,34.5107],[-120.193,34.5057],[-120.204,34.4957],[-120.126,34.5206],[-120.19,34.5072],[-120.206,34.4903],[-120.149,34.5181],[-120.142,34.5187],[-120.211,34.5033],[-120.169,34.5119],[-120.204,34.4967],[-120.181,34.5091],[-120.121,34.5199],[-120.204,34.4961],[-120.21,34.4899],[-120.147,34.5177],[-120.169,34.5115],[-120.206,34.4901],[-120.212,34.4944],[-120.114,34.5197],[-120.164,34.5149],[-120.239,34.4836],[-120.211,34.4901],[-120.201,34.5008],[-120.203,34.4998],[-120.169,34.5118],[-120.201,34.5007],[-120.17,34.5112],[-120.204,34.4956],[-120.209,34.4935],[-120.203,34.4997],[-120.17,34.5107],[-120.169,34.5117],[-120.204,34.4963],[-120.239,34.4861],[-120.187,34.5079],[-120.21,34.5033],[-120.18,34.5094],[-120.193,34.5054],[-120.202,34.5],[-120.207,34.4903],[-120.206,34.49],[-120.212,34.4946],[-120.109,34.5221],[-120.204,34.4965],[-120.206,34.4902],[-120.167,34.5127],[-120.24,34.4843],[-120.24,34.4844],[-120.212,34.4945],[-120.239,34.4853],[-120.143,34.5185],[-120.204,34.4958],[-120.193,34.5058],[-120.198,34.5033],[-120.204,34.496],[-120.204,34.4966],[-120.153,34.5184],[-120.189,34.5075],[-120.205,34.49],[-120.208,34.4904],[-120.239,34.4852],[-120.204,34.4964],[-120.199,34.5015],[-120.193,34.5059],[-120.239,34.4837],[-120.211,34.5032],[-120.15,34.5186],[-120.19,34.5073],[-120.207,34.4905]];
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
	         zoom: 15
	     })
	 });

	 var extent = vectorLayer.getSource().getExtent();
	map.getView().fit(extent, map.getSize());
});