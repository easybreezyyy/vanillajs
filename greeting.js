const form = document.querySelector("#name");
const input = form.querySelector("input");
const greeting = document.querySelector(".js-greetings");
const todoclass = document.querySelector(".todoclass");

const USER_LS = "currentUser";
const SHOWING_CN = "showing";

function handleSubmit(event){
	event.preventDefault();	
	const currentValue = input.value;
	paintGreetings(currentValue);
	saveName(currentValue);
	todoclass.focus();
}

function saveName(name){
	localStorage.setItem(USER_LS, name);
}

function askForName(){
	form.classList.add(SHOWING_CN);
	form.addEventListener("submit", handleSubmit);
}

function paintGreetings(name){
	form.classList.remove(SHOWING_CN);	//입력창 숨기고
	greeting.classList.add(SHOWING_CN);	//h4 태그 보여주고
	greeting.innerText = `Hello ${name}`;
}

function loadName(){
	const currentUser = localStorage.getItem(USER_LS);
	if(currentUser === null){
		askForName();
	}else{
		paintGreetings(currentUser);
	}
}

function init(){
	loadName();
}

init();