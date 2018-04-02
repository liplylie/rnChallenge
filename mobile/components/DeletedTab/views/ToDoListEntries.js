import React, { Component } from "react";
import { connect } from "react-redux";
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Text,
  Image,
  Alert
} from "react-native";
import Swipeout from "react-native-swipeout";
import * as ToDoActions from "../../../actions/toDoAction";
import * as DeleteActions from "../../../actions/deleteAction";
import { bindActionCreators } from "redux";
import { firebase, app, facebookProvider, firebaseDB } from "../../../firebase";

class ToDoList extends Component {
  constructor() {
    super();
  }

  changeStatus(todo, changeStatus) {
    const { ToDoActions } = this.props;
    todo.change = changeStatus;
    let userTodos = firebaseDB.ref(
      "/users/" + this.props.Auth.userId + "/todos"
    );
    userTodos.once("value").then(
      snapshot => {
        if (snapshot.val()) {
          let todos = snapshot.val();
          todos.map(item => {
            if (item.id === todo.id) {
              item.status = changeStatus;
            }
            return item;
          });
          userTodos.set(todos);
        }
      },
      errorObject => {
        console.log("The read failed: " + errorObject.code);
      }
    );
    ToDoActions.changeTodoStatus(todo);
  }

  confirmDelete(todo) {
    Alert.alert(
      "Are you sure you want to delete this?",
      "Yes or No?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Yes", onPress: () => this.deleteTodo(todo) }
      ],
      { cancelable: false }
    );
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
        onPress: () => this.confirmDelete(todo)
      }
    ];

    return (
      <View>
        <Swipeout right={swipeoutBtns} style={styles.toDoEntry}>
          <View style={(styles.padding, styles.border, styles.columns)}>
            <TouchableOpacity
              onPress={() => this.changeStatus(todo, "not completed")}
              style={styles.red}
            >
              <Image
                source={require("../../../TabPhotos/save.png")}
                style={styles.image}
              />
            </TouchableOpacity>
            <Text style={styles.toDoEntry}>
              {todo.content} {"\n"}
              <Text style={styles.time}>
                {new Date(parseInt(todo.timeStamp)).toUTCString() ===
                "Invalid Date"
                  ? new Date(Date.now()).toLocaleString()
                  : new Date(parseInt(todo.timeStamp)).toLocaleString()}
              </Text>
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
    backgroundColor: "white",
    padding: 14,
    margin: 1
  },
  time: {
    fontSize: 10,
    color: "green",
    alignItems: "flex-end"
  },
  padding: {
    padding: 4
  },
  border: {
    borderRadius: 2,
    borderWidth: 0.5,
    borderColor: "gray"
  },
  columns: {
    flexDirection: "row",
    alignItems: "center"
  },
  image: {
    width: 20,
    height: 20,
    margin: 3,
    bottom: 10
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
