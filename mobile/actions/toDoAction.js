export function addToDo(todo){
	return {
	type: "ADD_TODO",
	payload: todo
	}
}

export function changeTodoStatus(todo){
	return {
	type: "CHANGE_TODO_STATUS",
	payload: todo
	}
}