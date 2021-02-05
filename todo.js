const todoForm = document.querySelector(".js-todoForm");
const todoList = document.querySelector(".js-todoList");
const todoInput = todoForm.querySelector("input");

const TODOS_LS = `todos`;
const todos = [];

function deleteTodo(event){
	var li = event.target.parentNode;	//event = button clicked
	todoList.removeChild(li);
	const index = parseInt(li.id);
	todos.splice(index, 1);	//배열에서 인덱스 번호 그거 하나만 지워
	console.log(todos);
	localStorage.setItem(TODOS_LS, JSON.stringify(todos));	//다시 저장해주기
}

function paintTodo(todo){
	const li = document.createElement("li");
	const delBtn = document.createElement("button");
	delBtn.innerHTML="❌";
	delBtn.addEventListener("click", deleteTodo);
	const num = todos.length;
	li.id = num;
	const span = document.createElement("span");
	span.innerText = todo;
	li.appendChild(delBtn);
	li.appendChild(span);
	todoList.appendChild(li);
	
	const todoObj = {
		text : todo,
		id : num
	};
	todos.push(todoObj);	//배열에 객체 저장
	//브라우저는 객체를 저장 못함. String 형태로 변환해서 저장
	localStorage.setItem(TODOS_LS, JSON.stringify(todos));	
}

function handleSubmit(event){
	event.preventDefault();
	const currentValue = todoInput.value;
	localStorage.setItem(TODOS_LS, currentValue);
	paintTodo(currentValue);
	todoInput.value = "";
}

function loadTodos(){
	const loadedTodos = localStorage.getItem(TODOS_LS);
	if(loadedTodos !== null){
		const parsedTodos = JSON.parse(loadedTodos);	//스트링 -> 배열 형태의 객체로
		parsedTodos.forEach(function(currentValue){		
			paintTodo(currentValue.text);
		})// forEach는 인자로 콜백함수를 갖는다. 배열 안에 객체 하나씩 꺼내서 객체 매핑 돼있는 키값인 text를 paint
	}
}


function init(){
	loadTodos();
	todoForm.addEventListener("submit", handleSubmit);
}

init();