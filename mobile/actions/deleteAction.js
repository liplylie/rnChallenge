export function DeleteToDo(todo){
	return {
	type: "DELETE_TODO",
	payload: todo
	}
}