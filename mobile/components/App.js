import React, { Component } from 'react';
import TabBarNav from './TabBar/views/TabBarNav'
import { connect } from 'react-redux'
import { View, Text, Image, StyleSheet } from 'react-native'
import { bindActionCreators } from 'redux'
import AuthNav from './Auth/views/AuthNav.js'
import * as AuthActions from '../actions/logActions.js'
import Spinner from 'react-native-spinkit'

class App extends Component {
	constructor(props){
		super(props)
		this.state = {
			id: 0,
			todos: {}
		}
	}

	componentWillMount() {
    const { actions, authorized } = this.props;

    if(!authorized) {
      //actions.getFBToken();
    }

    if (authorized){
    	// get data from firebase

    	// if data base is empty, leave this.state.id to 0
    	this.setState({
    		id: 2,
    		todos: {
    			0: {
    				status: "not completed",
    				content: "walk the dog",
    				timeStamp: "123"
    			}, 
    			1: {
    				status: "completed",
    				content: "walk the cat",
    				timeStamp: "124"
    			}
    		}
    	})
    	// else id is equal to the last entries id number + 1
    }
  }

  render() {
  	const { authorized , authorizing } = this.props
  	if(!authorized) {
      return (
        <View style={styles.container}>
          {authorizing ? <View><Text>Loading</Text><Spinner type='FadingCircle'/></View> :<AuthNav />}
        </View>
      )
    } else {
      return (

        <TabBarNav id={this.state.id} todos={this.state.todos}/>
      )
    }
  }
}

const appState = (state) => {
  return {
    authorized: state.Log.authorized,
    authorizing: state.Log.authorizing,
  }
}

const appDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(AuthActions, dispatch),
  }
}

export default connect(appState, appDispatch)(App); 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  image: {
    width: 350,
    height: 200
  }
});