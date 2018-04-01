const initialState = {
	todos: [],
}

const addTodo = (state = initialState, action) => {
	if (action.type === "ADD_TODO"){
		return Object.assign({}, state, { todos: [...state.todos, action.payload]})
	} 

	else if (action.type === "CHANGE_TODO_STATUS"){
		return Object.assign({}, state, { todos: state.todos.map(todo =>{
			console.log(todo, 'change todo status redux')
			console.log(action.payload, 'actoin payload redux')
			if (todo.id === action.payload.id){
					todo.status = action.payload.change
			}
			return todo
		})
	})
	}
	return state;
}

export default addTodo;