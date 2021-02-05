const body = document.querySelector("body");

function paintImage(imgNumber){
	const img = new Image();
	img.src = `images/${imgNumber}.jpg`;
	img.classList.add("bgimg");
	body.appendChild(img);
}


function getRandom(){
	const num = Math.floor(Math.random() * 4) + 1;
	return num;
}

function init(){
	const randomNum = getRandom();
	paintImage(randomNum);
}

init();