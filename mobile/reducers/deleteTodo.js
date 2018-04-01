const initialState = {
	todos: [],
}

const deleteTodo = (state = initialState, action) => {
	if (action.type === "DELETE_TODO"){
		return Object.assign({}, state, { todos: state.todos.filter(todo => {
			console.log(todo, 'delete to redux')
			return todo.id !== action.payload.id
			})
	})
	}
	return state;
}
export default deleteTodo;

