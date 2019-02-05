jQuery(document).ready( function(){
	var url="/api/";
	function createChart(ds){
		var trace1 = {
			x: ds.map( d => d.region),
			y: ds.map( d => d.Average),
			text: ds.map( d => d.region),
			type: 'bar',
			name: '2015',
			marker: {
			color: 'rgb(49,130,189)',
			opacity: 0.7,
			}
		};
		var data = [trace1];

		var layout = {
		  title: 'Happiness Scores VS Region',
		  xaxis: {
		    tickangle: -45
		  },
		  barmode: 'group'
		};

		Plotly.newPlot("plot", data, layout, {responsive: true});
	}

	function createBar(ds){
		var yyy= $(".dateSwitch ul.dtSwitch li a.active").data('dt');

		var trace1 = {
		  y : ds.map( x => x.Country),
		  x : ds.map( x => x.Dystopia),
		  mode: "markers",
		  orientation: 'h',
		  type: "bar",
		  name: "Dystopia Residual",
		  marker: {
		      color: "pink",
		      width: 4     
		    }
		};
		var trace2 = {
		    y : ds.map( x => x.Country),
		    x : ds.map( x => x.Family),
		    mode: "markers",
		    orientation: 'h',
		    type: "bar",
		    name: "Family",
		    marker: {
		        color: "red",
		        width: 4     
		      }
		  };
		  var trace3 = {
		    y : ds.map( x => x.Country),
		    x : ds.map( x => x.Health),
		    mode: "markers",
		    orientation: 'h',
		    type: "bar",
		    name: "Life Expectancy",
		    marker: {
		        color: "orange",
		        width: 4     
		      }
		  };  
		  var trace4 = {
		    y : ds.map( x => x.Country),
		    x : ds.map( x => x.Freedom),
		    mode: "markers",
		    orientation: 'h',
		    type: "bar",
		    name: "Freedom",
		    marker: {
		        color: "blue",
		        width: 4     
		      }
		  };  

		  var trace5 = {
		    y : ds.map( x => x.Country),
		    x : ds.map( x => x.Corruption),
		    mode: "markers",
		    orientation: 'h',
		    type: "bar",
		    name: "Corruption",
		    marker: {
		        color: "purple",
		        width: 4     
		      }
		  };  
		 
		  var trace6 = {
		    y : ds.map( x => x.Country),
		    x : ds.map( x => x.Generosity),
		    mode: "markers",
		    orientation: 'h',
		    type: "bar",
		    name: "Generosity",
		    marker: {
		        color: "yellow",
		        width: 4     
		      }
		  };  
		  var trace7 = {
		    y : ds.map( x => x.Country),
		    x : ds.map( x => x.Economy),
		    mode: "markers",
		    orientation: 'h',
		    type: "bar",
		    name: "GDP",
		    marker: {
		        color: "green",
		        width: 4    
		      }
		  };      

		var data = [trace1,trace2,trace3,trace4,trace5,trace6,trace7];
		// Define the plot layout
		var layout = {barmode: 'stack',
		  autosize: true,
		  height: 700,
		  title: "Happiness Ranking for Top 50 Countries - "+yyy,
		  xaxis: { autorange: true,
		    type: "linear"
		    // title: "Country"
		},    
		//   yaxis: { title: "Happiness_Score",tickangle: -45,
		  automargin: true,
		  paper_bgcolor: '#17becf',
		  plot_bgcolor: '#c7c7c7'  
		}  

		// Plot - div tag with id "plot"
		
		Plotly.newPlot("plot", data, layout, {responsive: true});
	}
	function getData(year,where){
		var u = url;

		if( where == 'h'){
			u=u+"charts/"+year;
			$("#plot").html('');
		}else{
			u=u+"bar/"+year;
			$("#bar").html('');
		}

		d3.json(u).then(function(data) {
			if(where=='h'){
				createChart(data);			
			}else{
				createBar(data);
			}
		});	
	}

	function init(){
		getData(2015,'b');
	}
	
	$(".dateSwitch ul.dtSwitch li a").click( function(a){
		a.preventDefault();
		var dt='';
		if(!($(this).hasClass('active')) ){
			dt=$(this).data('dt');
			var w = $(".dateSwitch ul.chartSwitch li a.active").data('sw');
			
			$(".dateSwitch ul.dtSwitch li a").removeClass('active');
			$(this).addClass('active');
			if(w=='stack'){
				getData(dt,'b');
			}else{
				getData(dt,'h');
			}
		}else{

		}
	});

	$(".dateSwitch ul.chartSwitch li a").click( function(b){
		b.preventDefault();
		var sw='';
		if(!($(this).hasClass('active')) ){
			sw=$(this).data('sw');
			$(".dateSwitch ul.dtSwitch li a").removeClass('active');
			$(".dateSwitch ul.chartSwitch li a").removeClass('active');
			$(".dateSwitch ul.dtSwitch li:first-child a").addClass('active');
			$(this).addClass('active');
			if(sw=='stack'){
				getData(2015,'b');
			}else{
				getData(2015,'h');
			}
		}else{

		}
	});

	init();
});