jQuery(document).ready( function($){
	$.ajax({
          type: 'POST',
          url: '/statsjson',
          contentType: false,
          dataType: 'json',
          cache: false,
          processData: false,
          success: function(data) {
          	console.log(data)
          	data.pred.forEach(function(a){
          		$("#predStats").append('<div><h5>'+a.animal+"</h5>");
          		$("#predStats").append('<label>Average : </label><span> '+a.mean+'</span><br />');
          		$("#predStats").append('<label>Count : </label><span> '+a.count+'</span>');
          		$("#predStats").append('</div>');
          	});
          	data.predO.forEach(function(a){
          		$("#predStatsOutline").append('<div><h5>'+a.animal+"</h5>");
          		$("#predStatsOutline").append('<label>Average : </label><span> '+a.mean+'</span><br />');
          		$("#predStatsOutline").append('<label>Count : </label><span> '+a.count+'</span>');
          		$("#predStatsOutline").append('</div>');
          	});
          },
          fail: function(err){
          	console.log(err)
          }
    });
});