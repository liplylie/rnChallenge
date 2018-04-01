
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



export default class ToDoList extends Component {
  constructor(){
    super()
    this.state = {
      status: 0,
    }
  }

  changeStatus(text){
   
    console.log('changeSttus', text)
    //this.props.deleteTodo(this.props.index)

  }
  render() {
    const { todo } = this.props
    console.log(todo, 'todo')
    let swipeoutBtns = [
      {
        text: 'Button',
        onPress: ()=>this.changeStatus("hi")
      }
    ]

    return (
      <View>
        <Swipeout right={swipeoutBtns}>
          <View style={styles.padding}>
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
    flex: 1, 
    fontSize: 30,
   }, 
   status: {
    fontSize: 18,
    color: "red",
    alignItems: 'flex-end'
   },
   padding: {
    padding: 4
   }
})


