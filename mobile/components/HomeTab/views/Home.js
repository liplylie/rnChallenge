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
import ToDoEntry from './ToDoListEntries.js'

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
      input: '',
      todos: []
    }
  }

  componentDidMount(){
    console.log(this.props, 'home props')
    this.setState({
        id: 2,
        todos: [
          {
            id: 0,
            status: "not completed",
            content: "walk the dog",
            timeStamp: "123"
          }, 
          {
            id: 1,
            status: "completed",
            content: "walk the cat",
            timeStamp: "124"
          }
        ]
      })
  }

  handleSubmit(text){
    //console.log(text.target.val, 'press')
    let todo = text.nativeEvent.text
    console.log(todo,'submit')
    this.props.addToDo(todo)
    this.clearText()
    
  }

  render() {
    return (
      <ScrollView style={{backgroundColor: "lightblue"}} >
      <KeyboardAvoidingView >
        <Text style={styles.welcome}>
          To Do List
        </Text>
          <TextInput
          ref={component => this._textInput = component}
          style={{height: 40, textAlign: 'center'}}
          placeholder="Type to do here"
          onChangeText={(text) => console.log(text)}
          onSubmitEditing={this.handleSubmit}
        />
        {this.state.todos.map((todo, i)=>{return <ToDoEntry todo={todo} key={i} index={i} /> })}
      </KeyboardAvoidingView>
      </ScrollView>
    );  
  }
}

const mapStateToProps = (store) =>{
  return {
  }
}


export default connect(mapStateToProps, null)(Home)
