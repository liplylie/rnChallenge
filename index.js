import { AppRegistry } from 'react-native'
import React, { Component } from 'react'
import { Provider } from 'react-redux'

import store from './mobile/store'

import App from './mobile/components/App.js'

class TodoList extends Component {
  constructor(props) {
    super(props); 
  }

  render() {
    return (
      <Provider store={store}>
        <App /> 
      </Provider> 
    )
  }
}

AppRegistry.registerComponent('init', () => TodoList);
