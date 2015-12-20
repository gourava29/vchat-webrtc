var hostUrl = "https://fathomless-sands-9094.herokuapp.com/";//"http://localhost:5555";//
var error = ""
navigator.getUserMedia = ( navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || msgGetUserMedia );
window.RTCPeerConnection = window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection;
window.RTCIceCandidate = window.RTCIceCandidate || window.mozRTCIceCandidate || window.webkitRTCIceCandidate;
window.RTCSessionDescription = window.RTCSessionDescription || window.mozRTCSessionDescription || window.webkitRTCSessionDescription;
window.URL = window.URL || window.mozURL || window.webkitURL;

if (!window.RTCPeerConnection || !navigator.getUserMedia) {
  error = 'WebRTC is not supported by your browser. You can try the app with Chrome and Firefox.';
}

var stream;
var vStream = videoStream();
var room = Room();
vStream.get().then(function(s){
	stream = s;
	room.init(stream);
	stream = URL.createObjectURL(stream);
	if (location.hash.replace("#","").length==0) {
	  	room.createRoom().then(function (roomId) {
	    	location.href = '#'+roomId;
	  	});
	} else {
		room.joinRoom(location.hash.replace("#",""));
	}
},function(){
	error = 'No audio/video permissions. Please refresh your browser and allow the audio/video capturing.';
})

var peers = [];
room.on('peer.stream', function (peer) {
  console.log('Client connected, adding new stream');
  peers.push({
    id: peer.id,
    stream: URL.createObjectURL(peer.stream)
  });
  document.getElementById("vd").src = peers[0].stream;
});
room.on('peer.disconnected', function (peer) {
  console.log('Client disconnected, removing stream');
  peers = peers.filter(function (p) {
    return p.id !== peer.id;
  });
});

var getLocalVideo = function () {
  return stream;
};
