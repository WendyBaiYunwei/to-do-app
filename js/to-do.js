const list = document.getElementById("list");
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

const today = new Date();
const options = {weekday : "long", month:"short", day:"numeric"};
dateElement.innerHTML = today.toLocaleDateString("en-US", options);

let LIST, id;
data = localStorage.getItem("TODO");
if (data) {
	LIST = JSON.parse(data);
	id = LIST.length;
	loadList(LIST);
}else {
	LIST = [];
	id = 0;
}

function loadList(array) {
	array.forEach(function(item) {
		//console.log(item.id+' '+item.done);
		addToDo(item.name, item.id, item.trash, item.done);
	});
}

document.addEventListener("keydown", function(event) {
	if(event.keyCode == 13){
		const toDo = input.value;
		if (toDo) {
			addToDo(toDo, id, false, false);
			LIST.push({
                name : toDo,
				trash : false,
				done : false,
				id : id
            });
			localStorage.setItem("TODO", JSON.stringify(LIST));
			id++;
		}
		input.value = "";
	}
});

function addToDo(toDo, id, trash, done) {
	if (trash) return;
	
	const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
	
	toDoItem = `<li class="toDoItem">
					<i id="icon" class="fa ${DONE} co" job="cross"></i>
					<p class="text ${LINE}">${toDo}</p>
					<i class="fa fa-trash-o de" job="delete" id="${id}"></i>
				</li>`
	position = "beforeend";
	list.insertAdjacentHTML(position, toDoItem);
}

//delete or complete
document.addEventListener("click", function(event) {
	const clicked = event.target;
	if (clicked.attributes.job.value == "delete") {
		LIST[clicked.id].trash = true;
		clicked.parentNode.parentNode.removeChild(clicked.parentNode);
	}
	else if (clicked.attributes.job.value == "cross") {
		clicked.classList.toggle(CHECK);
		clicked.classList.toggle(UNCHECK);
		clicked.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
		
		LIST[clicked.id].done = LIST[clicked.id].done ? false : true;
	}
	localStorage.setItem("TODO", JSON.stringify(LIST));
});

clear.addEventListener("click",function(){
	localStorage.clear();
    location.reload();
});