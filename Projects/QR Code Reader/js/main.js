$(document).ready(function(){
	$('#reader').html5_qrcode(function(data){
			$('#read').html(data);
			var x = data;
			console.log(x);
		},
		function(error){
			$('#read_error').html(error);
		}, function(videoError){
			$('#vid_error').html(videoError);
		}
	);
});
