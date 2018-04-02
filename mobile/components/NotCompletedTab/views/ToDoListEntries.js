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

class ToDoList extends Component {
  constructor() {
    super();
  }

  changeStatus(todo, changeStatus) {
    console.log("changeSttus", todo);
    const { ToDoActions } = this.props;
    todo.change = changeStatus;
    ToDoActions.changeTodoStatus(todo);
  }

  render() {
    const { todo } = this.props;
    console.log(todo, "todo");
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
              onPress={() => this.changeStatus(todo, "completed")}
              style={styles.red}
            >
              <Image
                source={require("../../../TabPhotos/notComplete.png")}
                style={styles.image}
              />
            </TouchableOpacity>
            <Text style={styles.toDoEntry}>
              {todo.content} {"\n"}
              <Text style={styles.time}>
                {new Date(parseInt(todo.timeStamp)).toUTCString()}
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
    margin: 1,
    fontSize: 16
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
    alignItems: "center",
    textAlign: "center"
  },
  image: {
    width: 20,
    height: 20,
    margin: 3,
    bottom: 10
  }
});

const mapDispatch = dispatch => {
  return {
    dispatch,
    ToDoActions: bindActionCreators(ToDoActions, dispatch)
  };
};

export default connect(null, mapDispatch)(ToDoList);
