jQuery(document).ready(function(){
	// An array of cities and their locations
	var url = "/api/world";
	var countryMarkers2015 = [];
	var countryMarkers2015b = [];
	var countryMarkers2016 = [];
	var countryMarkers2016b = [];
	var countryMarkers2017 = [];
	var countryMarkers2017b = [];
	d3.json(url).then(function(data) {

			// CREATE markers for each year top 10
			console.log(data)
			data[0].forEach(function(a){
				 countryMarkers2015.push(
				    L.marker([a.Lat, a.Lng]).bindPopup("<h1>" + a.Country + "</h1><strong><p><strong>Ranked  " + 
				    a.Happiness_rank + " in " + a.Happiness_year +  " </p>" + 
				    "</h1><hr>Factors of happiness<hr><p> Economy :  " + a.Economy + "</h1></p>Family : " 
				     + a.Family + "</h1></p>Freedom : "  + a.Freedom + "</h1></p>" ));
			});
			
			data[1].forEach(function(a){
				 countryMarkers2016.push(
				    L.marker([a.Lat, a.Lng],{icon: redIcon}).bindPopup("<h1>" + a.Country + "</h1><strong><p><strong>Ranked  " + 
				    a.Happiness_rank + " in " + a.Happiness_year +  " </p>" + 
				    "</h1><hr>Factors of happiness<hr><p> Economy :  " + a.Economy + "</h1></p>Family : " 
				     + a.Family + "</h1></p>Freedom : "  + a.Freedom + "</h1></p>" ));
			});
			data[2].forEach(function(a){
				 countryMarkers2017.push(
				    L.marker([a.Lat, a.Lng],{icon: greyIcon}).bindPopup("<h1>" + a.Country + "</h1><strong><p><strong>Ranked  " + 
				    a.Happiness_rank + " in " + a.Happiness_year +  " </p>" + 
				    "</h1><hr>Factors of happiness<hr><p> Economy :  " + a.Economy + "</h1></p>Family : " 
				     + a.Family + "</h1></p>Freedom : "  + a.Freedom + "</h1></p>" ));
			});

			// CREATE markers for each year bottom 10
			data[3].forEach(function(a){
				 countryMarkers2015.push(
				    L.marker([a.Lat, a.Lng],{icon: violetIcon}).bindPopup("<h1>" + a.Country + "</h1><strong><p><strong>Ranked  " + 
				    a.Happiness_rank + " in " + a.Happiness_year +  " </p>" + 
				    "</h1><hr>Factors of happiness<hr><p> Economy :  " + a.Economy + "</h1></p>Family : " 
				     + a.Family + "</h1></p>Freedom : "  + a.Freedom + "</h1></p>" ));
			});
			
			data[4].forEach(function(a){
				 countryMarkers2016.push(
				    L.marker([a.Lat, a.Lng],{icon: orangeIcon}).bindPopup("<h1>" + a.Country + "</h1><strong><p><strong>Ranked  " + 
				    a.Happiness_rank + " in " + a.Happiness_year +  " </p>" + 
				    "</h1><hr>Factors of happiness<hr><p> Economy :  " + a.Economy + "</h1></p>Family : " 
				     + a.Family + "</h1></p>Freedom : "  + a.Freedom + "</h1></p>" ));
			});
			data[5].forEach(function(a){
				 countryMarkers2017.push(
				    L.marker([a.Lat, a.Lng],{icon: blackIcon}).bindPopup("<h1>" + a.Country + "</h1><strong><p><strong>Ranked  " + 
				    a.Happiness_rank + " in " + a.Happiness_year +  " </p>" + 
				    "</h1><hr>Factors of happiness<hr><p> Economy :  " + a.Economy + "</h1></p>Family : " 
				     + a.Family + "</h1></p>Freedom : "  + a.Freedom + "</h1></p>" ));
			});
		
		var countryLayer1 = L.layerGroup(countryMarkers2015);
		var countryLayer2 = L.layerGroup(countryMarkers2016);
		var countryLayer3 = L.layerGroup(countryMarkers2017);

		// Define variables for our tile layers
		var light = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
		  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
		  maxZoom: 18,
		  id: "mapbox.light",
		  accessToken: 'pk.eyJ1IjoicXFuZXNzIiwiYSI6ImNqcDVtNXNtczAxejIzcG13eTdlZzN4b28ifQ.YQjvIazRluFetWkX9uoOpA'
		});

		// // Only one base layer can be shown at a time
		var baseMaps = {
		  Map: light
		};

		// // Overlays that may be toggled on or off
		var overlayMaps = {
		  '2015': countryLayer1,
		  '2016': countryLayer2,
		  '2017': countryLayer3
		};


		// Create map object and set default layers
		var myMap = L.map("plot", {
		  center: [31.20, 21.92],
		  zoom: 1.5,
		  layers: [light, countryLayer1]
		});

		// Pass our map layers into our layer control
		// Add the layer control to the map
		L.control.layers(baseMaps, overlayMaps).addTo(myMap);

	});
});