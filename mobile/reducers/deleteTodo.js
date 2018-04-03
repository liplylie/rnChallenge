const initialState = {
	todos: [],
}

const deleteTodo = (state = initialState, action) => {
	if (action.type === "DELETE_TODO"){
		return Object.assign({}, state, { todos: state.todos.filter(todo => {
			return todo.id !== action.payload.id
			})
	})
	}
	return state;
}
export default deleteTodo;

