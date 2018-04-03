import React, { Component } from "react";
import { connect } from "react-redux";
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Text,
  Image
} from "react-native";
import Swipeout from "react-native-swipeout";
import * as ToDoActions from "../../../actions/toDoAction";
import { bindActionCreators } from "redux";
import { app, facebookProvider, firebaseDB } from "../../../firebase";
import firebase from "firebase";

class ToDoList extends Component {
  constructor() {
    super();
  }

  changeStatus(todo, changeStatus) {
    /* this method changes the status [completed, not completed, deleted] of the todo.
    It then updates the firebase DB and redux store of the changed status
    */
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

  render() {
    const { todo } = this.props;
    let swipeoutBtns = [
      {
        text: "Delete",
        backgroundColor: "red",
        onPress: () => this.changeStatus(todo, "deleted")
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
                source={require("../../../TabPhotos/add.png")}
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
    ToDoActions: bindActionCreators(ToDoActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatch)(ToDoList);
