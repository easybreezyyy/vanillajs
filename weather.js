const API_KEY = "813e6fb97d041626f4b3c6327b83d38b";
const COORDS = "coords";
const temp = document.querySelector(".temperature");
const loca = document.querySelector(".location");


function getWeather(lat,lng){
	fetch(
		`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
	).then(function(response){
		return response.json();
	}).then(function(json){
		console.log(json);
		const temperature = json.main.temp;
		const place = json.name;
		temp.innerText = `${temperature}º`;
		loca.innerText = `${place}`;
	})
}

function handleGeoSuccess(position){
	const latitude = position.coords.latitude;
	const longitude = position.coords.longitude;
	const coordsObj = {
		latitude,
		longitude
	};
	localStorage.setItem(COORDS, JSON.stringify(coordsObj));
	getWeather(latitude,longitude);
}

function handleGeoError(){
	console.log("Cant access geo location");
}

function askForCoords(){
	navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
	//navigator객체의 위치정보 메서드 - getCurrentPosition은 성공시 콜백, 실패시 콜백함수를 인자로 갖는다.
}


function loadCoords(){
	const loadedCoords = localStorage.getItem(COORDS);
	if(loadedCoords === null){
		askForCoords();
	}else{
		const parsedCoords = JSON.parse(loadedCoords);
		getWeather(parsedCoords.latitude, parsedCoords.longitude);
	}
}

function init(){
	loadCoords();
}

init();