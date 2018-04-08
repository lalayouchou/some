window.onload = function() {
	let music= document.getElementById('music');
let audio = document.getElementsByTagName('audio')[0];

music.addEventListener('touchstart', function(){
	if (audio.paused) {
		if(!music.classList.contains('play')){music.classList.add('play');}
		audio.play();
		// this.classList.add('play');
		this.style.animationPlayState = 'running';
	}else{
	audio.pause();	
	// this.classList.remove('play');
	this.style.animationPlayState = 'paused';//可以控制在原地
	}
	
});

audio.addEventListener('ended', function(){
	music.classList.remove('play');
});

}();