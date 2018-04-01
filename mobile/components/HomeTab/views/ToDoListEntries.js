
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
    
    return (
      <ScrollView style={{marginLeft: 15}}>
        <TouchableOpacity onPress={()=>this.changeStatus(this.props.todo)}>
          <Text style={styles.toDoEntry}>  
            {todo.content} {todo.timeStamp}
            <Text style={styles.status}>
            {todo.status}
            </Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  toDoEntry: {
    flex: 1, 
    fontSize: 40,
   }, 
   status: {
    fontSize: 18,
    color: "red",
    alignItems: 'flex-end'
   }
})


