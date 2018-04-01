
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  ScrollView,
  StyleSheet,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Text
} from 'react-native';
import Swipeout from 'react-native-swipeout';
import * as ToDoActions from "../../../actions/toDoAction";
import { bindActionCreators } from "redux";



class ToDoList extends Component {
  constructor(){
    super()
  }


  changeStatus(todo, change) {
    console.log("changeSttus", todo);
    const { ToDoActions } = this.props;
    let changeStatus = 'deleted'
    if (change !== 'delete'){

    if (todo.status === 'completed'){
      changeStatus = 'not completed'
      //todo.status = 'not completed'
    } else if (todo.status === 'not completed'){
      changeStatus = 'completed'
      //todo.status = 'completed'
    }
  }
    this.forceUpdate()

    todo.change = changeStatus;
    ToDoActions.changeTodoStatus(todo);

  }


  render() {
    const { todo } = this.props
    console.log(todo, 'todo')
    let swipeoutBtns = [
      {
        text: 'Delete',
        backgroundColor: "red",
        onPress: ()=>this.changeStatus(todo, 'delete')
      }
    ]

    return (
      <View>
        <Swipeout right={swipeoutBtns} style={styles.toDoEntry}>
          <View style={styles.padding, styles.border}>
            <TouchableOpacity
              onPress={e => this.changeStatus(todo) }
            >
              <Text>change status</Text>
            </TouchableOpacity>
             <Text style={styles.toDoEntry}>  
            {todo.content} {todo.timeStamp}
            <Text style={styles.status}>
            {todo.status}
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
    backgroundColor: "white"
   }, 
   status: {
    fontSize: 18,
    color: "red",
    alignItems: 'flex-end'
   },
   padding: {
    padding: 4,
   },
   border: {
    borderRadius: 2,
    borderWidth: 0.5,
    borderColor: 'gray',
   }
})

const mapDispatch = (dispatch) => {
  return {
    dispatch,
    ToDoActions: bindActionCreators(
      ToDoActions,
      dispatch
    )
  }
}


export default connect(null, mapDispatch)(ToDoList)


