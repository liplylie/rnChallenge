
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

  componentDidMount(){
    console.log("home todo list lands again", this.props)
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
    console.log(todo, 'todo home list')
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
              onPress={() => this.changeStatus(todo) }
            >
              <Text>change status</Text>
            </TouchableOpacity>
             <Text style={styles.toDoEntry}>  
            {todo.content} {new Date(parseInt(todo.timeStamp)).toUTCString()}
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


