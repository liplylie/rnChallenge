import React, { Component } from 'react'
import { addNavigationHelpers } from 'react-navigation'
import { CompletedNavigator } from '../navigationConfig'
import { Image } from 'react-native'
import { connect } from 'react-redux'

import {
  createReduxBoundAddListener,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';

const middleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav,
);
const addListener = createReduxBoundAddListener("root");


class CompletedNav extends Component {
  static navigationOptions = {
    tabBarLabel: '',
    tabBarIcon: ({tintColor}) => (
      <Image 
      source={require('../../../TabPhotos/add.png')}
      style={{width:30, height:30, top: 5, tintColor: 'white'}}>
      </Image>
    )
  }

  render() {
    const { dispatch, completedState } = this.props
    return (
      <CompletedNavigator
        navigation={
          addNavigationHelpers({
            dispatch: dispatch,
            state: completedState,
            addListener
          })
        }
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
      completedState: state.Completed
   }
 }

export default connect(mapStateToProps)(CompletedNav)