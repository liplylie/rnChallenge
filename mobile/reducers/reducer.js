import { combineReducers } from 'redux';
import addTodo from "./addTodo"
import deleteTodo from "./deleteTodo"
import Auth from "./authReducer"
import Log from "./logReducer"
import TabBar from "./tabBarReducer"
import Profile from "./profileReducer"
import Deleted from "./deletedReducer"
import NotCompleted from "./notCompletedReducer"
import Home from "./homeReducer"
import Completed from "./completedReducer"

const reducer = combineReducers({
	addTodo,
	deleteTodo,
	Auth,
	TabBar,
	Profile,
	Deleted,
	NotCompleted,
	Home,
	Completed,
	Log
})

export default reducer;