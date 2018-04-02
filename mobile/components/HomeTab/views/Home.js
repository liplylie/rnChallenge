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
  TextInput,
  KeyboardAvoidingView
} from 'react-native';
import { connect } from 'react-redux';
import Spinner from 'react-native-spinkit';
import ToDoEntry from './ToDoListEntries.js';
import * as ToDoActions from "../../../actions/toDoAction";
import * as DeleteActions from "../../../actions/deleteAction";
import { bindActionCreators } from "redux";
import { app, facebookProvider, firebaseDB } from "../../../firebase";
import firebase from "firebase";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white'
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
  spinnerContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner:{
    justifyContent: 'center',
    alignItems: 'center'
  },
   welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: ""
    }
  }
  componentDidMount(){
    console.log(this.props, 'home props')
  }

  componentWillReceiveProps(nextProps){
    console.log(nextProps, 'home next props')
    this.setState({
      userId: nextProps.Auth.userId
    })
  }



  handleSubmit(text){
    const { todos } = this.props.todos
    const { ToDoActions } = this.props
    let id = 0
    if (todos.length > 0){
      id = todos[todos.length - 1].id + 1
    }
    console.log(id, 'id home')
    let content = text.nativeEvent.text
    let todo = {
      id: id,
      status: "not completed",
      content: content,
      timeStamp: firebase.database.ServerValue.TIMESTAMP
    }
    console.log(this.state, 'home state' )
    let userTodos = firebaseDB.ref("/users/" + this.state.userId + "/todos")
        userTodos.once("value").then(
          snapshot => {
            if (snapshot.val()) {
              console.log(snapshot.val(), "todos from home ");
              let todos = snapshot.val();
              todos.push(todo)
              userTodos.set(todos)
            } 
          },
          errorObject => {
            console.log("The read failed: " + errorObject.code);
          }
        );
    ToDoActions.addToDo(todo)
    this.clearText()
    
  }

   clearText(){
    this._textInput.setNativeProps({text: ''});
  }



  render() {
    const { todos } = this.props.todos
    console.log(todos, 'home todos please')
    return (
      <ScrollView style={{backgroundColor: "snow"}} >
      <KeyboardAvoidingView >
        <Text style={styles.welcome}>
          To Do List
        </Text>
          <TextInput
          ref={component => this._textInput = component}
          style={{height: 40, textAlign: 'center'}}
          placeholder="Type to do here"
          onChangeText={(text) => console.log(text)}
          onSubmitEditing={(text)=>this.handleSubmit(text)}
        />
        {todos.map((todo, i)=>{ 
          console.log(todo, 'todo in home look')
          if (todo.status !== "deleted"){
            return <ToDoEntry todo={todo} key={i} index={i} /> 
          }
        })}
      </KeyboardAvoidingView>
      </ScrollView>
    );  
  }
}

const mapStateToProps = store =>{
  return {
    todos: store.addTodo,
    Auth: store.Log
  }
}

const mapDispatch = (dispatch) => {
  return {
    dispatch,
    ToDoActions: bindActionCreators(
      ToDoActions,
      dispatch
    ),
    DeleteActions: bindActionCreators(
      DeleteActions,
      dispatch
    )
  }
}


export default connect(mapStateToProps, mapDispatch)(Home)
