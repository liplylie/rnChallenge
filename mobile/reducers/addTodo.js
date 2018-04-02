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
				console.log(todo, "change todo status redux");
				console.log(action.payload, "actoin payload redux");
				if (todo.id === action.payload.id) {
					todo.status = action.payload.change;
				}
				return todo;
			})
		});
	} else if (action.type === "DELETE_TODO") {
		return Object.assign({}, state, {
			todos: state.todos.filter(todo => {
				console.log(todo, "delete to redux");
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
