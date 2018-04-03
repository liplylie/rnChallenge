const initialState = {
	todos: []
};

const addTodo = (state = initialState, action) => {
	if (action.type === "ADD_TODO") {
		return Object.assign({}, state, {
			todos: [...state.todos, action.payload]
		});
	} else if (action.type === "CHANGE_TODO_STATUS") {
		return Object.assign({}, state, {
			todos: state.todos.map(todo => {
				if (todo.id === action.payload.id) {
					todo.status = action.payload.change;
				}
				return todo;
			})
		});
	} else if (action.type === "DELETE_TODO") {
		return Object.assign({}, state, {
			todos: state.todos.filter(todo => {
				return todo.id !== action.payload.id;
			})
		});
	} else if (action.type === "DELETE_ALL_TODOS"){
		return Object.assign({}, state, {
			todos: []
		});
	}
	return state;
};

export default addTodo;
