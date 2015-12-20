function videoStream(){
	var videoStream;
	return {
		get:function(){
			return new Promise(function(resolve,reject){
				if(videoStream)
					resolve(videoStream);
				else{
					navigator.getUserMedia({
			            video: true,
			            audio: true
		          	}, function (s) {
			            videoStream = s;
			            document.getElementById("localVideo").src=URL.createObjectURL(s);
			            resolve(videoStream);
		    		}, function (e) {
			            reject(e);
			        });
				}
			});		
		}
	}	
}