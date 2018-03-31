const initialState = {
	todos: [],
}

const deleteTodo = (state = initialState, action) => {
	if (action.type === "DELETE_TODO"){
		return Object.assign({}, state, { todos: [...state.todos.slice(0, action.payload), ...state.todo.slice(action.payload + 1)]})
	}
	return state;
}

export default deleteTodo;

