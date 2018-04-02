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

  componentDidMount() {
    console.log("home todo list lands again", this.props);
  }

  formatAMPM(date) {
    var hours = date[0] + date[1];
    var minutes = date[3] + date[4];
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  }

  changeStatus(todo, change) {
    console.log("changeSttus", todo);
    const { ToDoActions } = this.props;
    let changeStatus = "deleted";
    if (change !== "delete") {
      if (todo.status === "completed") {
        changeStatus = "not completed";
        //todo.status = 'not completed'
      } else if (todo.status === "not completed") {
        changeStatus = "completed";
        //todo.status = 'completed'
      }
    }
    let userTodos = firebaseDB.ref("/users/" + this.props.Auth.userId + "/todos");
    userTodos.once("value").then(
      snapshot => {
        if (snapshot.val()) {
          console.log(snapshot.val(), "todos from home ");
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

    this.forceUpdate();
    todo.change = changeStatus;
    ToDoActions.changeTodoStatus(todo);
  }

  render() {
    const { todo } = this.props;
    console.log(todo, "todo home list");
    let swipeoutBtns = [
      {
        text: "Delete",
        backgroundColor: "red",
        onPress: () => this.changeStatus(todo, "delete")
      }
    ];

    return (
      <View>
        <Swipeout right={swipeoutBtns} style={styles.toDoEntry}>
          <View style={(styles.padding, styles.border, styles.columns)}>
            <TouchableOpacity
              onPress={() => this.changeStatus(todo)}
              style={styles.red}
            >
              <Image
                source={
                  todo.status === "completed"
                    ? require("../../../TabPhotos/add.png")
                    : require("../../../TabPhotos/notComplete.png")
                }
                style={styles.image}
              />
            </TouchableOpacity>
            <Text style={styles.toDoEntry}>
              {todo.content} {"\n"}
              <Text style={styles.time}>
                {new Date(parseInt(todo.timeStamp)).toUTCString() === "Invalid Date" ? new Date(Date.now()).toLocaleString() : new Date(parseInt(todo.timeStamp)).toLocaleString()}
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
