import React, { Component } from 'react';
import { List, ListItem } from 'react-native-elements'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView, 
  Header,
} from 'react-native';
import { connect } from 'react-redux';
import Spinner from 'react-native-spinkit';
import ToDoEntry from './ToDoListEntries.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'red'
  },
  title:{
    flexDirection: 'column',
    margin: 10
  },
  image: {
    width: 200,
    height: 30,
  },
  header: { 
    height: 70,
    backgroundColor: 'white'
  }, 
  collection: {
    backgroundColor: 'skyblue',
    flex:1,
  },
  spinnerContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner:{
    justifyContent: 'center',
    alignItems: 'center',
  }
});

class Deleted extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: []
    }
  }
      
  render() {
    console.log(this.props, 'not Deleted props')
    const { todos } = this.props.todos
    return (
      <ScrollView style={{backgroundColor: "snow"}} >
        {todos.map((todo, i)=>{ 
          if (todo.status === "deleted"){
            return <ToDoEntry todo={todo} key={i} index={i} /> 
          }
        })}
      </ScrollView>
    );  
  }
}



const mapStateToProps = (store) =>{
  return {
    todos: store.addTodo
  }
}


export default connect(mapStateToProps, null)(Deleted)