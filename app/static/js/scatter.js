jQuery(document).ready( function(){
	var url = "/api/scatter/";

	function createChart(ds){
		$("#plot").addClass('hide animated fadeIn');	
		var trace1 = {
    	x : ds.map( x => x.Happiness_score),
	    y : ds.map( x => x.Economy),
	    mode: "markers",
	    type: "scatter",
	    name: "GDP",
	    marker: {
		        color: "#2077b4",
		        size : 12,
		        name : "GDP"
		      }
		};
		var trace2 = {
		    x : ds.map( x => x.Happiness_score),
		    y : ds.map(x => x.Health),
		    mode: "markers",
		    type: "scatter",
		    name: "Health",
		    marker: {
		        color: "orange",
		        symbol: "diamond-x",
		        size : 11,
		        name: "Health"
		      }

		};

		var data = [trace1,trace2];
		var showDate = $(".dateSwitch ul li a.active").data('dt');
		// Define the plot layout
		var layout = {
		  title: "Happiness Score vs GDP and Health - "+showDate,
		  xaxis: { title: "GDP and Health" },
		  yaxis: { title: "Happiness Score" }
		};

		// Plot - div tag with id "plot"
		
		setTimeout(function(){
			$("#plot").removeClass('hide');
			Plotly.newPlot("plot", data, layout, {responsive: true});
		}, 600);
	}
	
	
	function getData(year,start=false){
		var u = url + year;
		d3.json(u).then(function(data) {
			if(start){
				createChart(data);				
			}else{
				$("#plot").html('');
				createChart(data);
			}
		});	
	}

	function init(){
		getData(2015,true);
	}
	
	$(".dateSwitch ul li a").click( function(a){
		a.preventDefault();
		var dt='';
		if(!($(this).hasClass('active')) ){
			dt=$(this).data('dt');
			$(".dateSwitch ul li a").removeClass('active');
			$(this).addClass('active');
			getData(dt);
		}else{
			console.log('not active');
		}
	});

	init();
});