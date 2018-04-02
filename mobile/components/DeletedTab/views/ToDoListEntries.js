import React, { Component } from "react";
import { connect } from "react-redux";
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Text
} from "react-native";
import Swipeout from "react-native-swipeout";
import * as ToDoActions from "../../../actions/toDoAction";
import * as DeleteActions from "../../../actions/deleteAction";
import { bindActionCreators } from "redux";
import { firebase, app, facebookProvider, firebaseDB } from "../../../firebase";

class ToDoList extends Component {
  constructor() {
    super();
    this.state = {
      status: 0
    };
  }

  changeStatus(todo, changeStatus) {
    console.log("changeSttus", todo);
    const { ToDoActions } = this.props;
    todo.change = changeStatus;
    ToDoActions.changeTodoStatus(todo);
  }

  deleteTodo(todo) {
    console.log("changeSttus", todo);
    const { ToDoActions } = this.props;
    let userTodos = firebaseDB.ref(
      "/users/" + this.props.Auth.userId + "/todos"
    );
    userTodos.once("value").then(
      snapshot => {
        if (snapshot.val()) {
          console.log(snapshot.val(), "todos from delete ");
          let todos = snapshot.val();
          todos = todos.filter(item => {
            console.log(todo, "delete to redux");
            return item.id !== todo.id;
          });
          userTodos.set(todos);
        }
      },
      errorObject => {
        console.log("The read failed: " + errorObject.code);
      }
    );
    ToDoActions.DeleteToDo(todo);
  }

  render() {
    const { todo } = this.props;
    console.log(todo, "todo");
    let swipeoutBtns = [
      {
        text: "Delete",
        backgroundColor: "red",
        onPress: () => this.deleteTodo(todo)
      }
    ];

    return (
      <View>
        <Swipeout right={swipeoutBtns} style={styles.toDoEntry}>
          <TouchableOpacity
            onPress={() => this.changeStatus(todo, "not completed")}
            style={styles.red}
          >
            <Text>change status</Text>
          </TouchableOpacity>
          <View style={(styles.padding, styles.border)}>
            <Text style={styles.toDoEntry}>
              {todo.content} {new Date(parseInt(todo.timeStamp)).toUTCString()}
              <Text style={styles.status}>{todo.status}</Text>
            </Text>
          </View>
        </Swipeout>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  toDoEntry: {
    height: 80,
    backgroundColor: "white"
  },
  status: {
    fontSize: 18,
    color: "red",
    alignItems: "flex-end"
  },
  padding: {
    padding: 4
  },
  border: {
    borderRadius: 2,
    borderWidth: 0.5,
    borderColor: "gray"
  }
});
const mapStateToProps = store => {
  return {
    todos: store.addTodo,
    Auth: store.Log
  };
};

const mapDispatch = dispatch => {
  return {
    dispatch,
    ToDoActions: bindActionCreators(ToDoActions, dispatch),
    DeleteActions: bindActionCreators(DeleteActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatch)(ToDoList);
