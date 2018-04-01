const initialState = {
	todos: [],
}

const addTodo = (state = initialState, action) => {
	if (action.type === "ADD_TODO"){
		return Object.assign({}, state, { todos: [...state.todos, action.payload]})
	}
	return state;
}

export default addTodo;