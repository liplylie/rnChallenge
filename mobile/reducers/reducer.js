import { combineReducers } from 'redux';
import addTodo from "./addTodo"
import deleteTodo from "./deleteTodo"
import TabBar from "./tabBarReducer"
import Profile from "./profileReducer"
import Deleted from "./deletedReducer"
import NotCompleted from "./notCompletedReducer"
import Home from "./homeReducer"
import Completed from "./completedReducer"

const reducer = combineReducers({
	addTodo,
	deleteTodo,
	TabBar,
	Profile,
	Deleted,
	NotCompleted,
	Home,
	Completed
})

export default reducer;