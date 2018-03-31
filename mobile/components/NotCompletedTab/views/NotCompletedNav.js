import React, { Component } from 'react'
import { addNavigationHelpers } from 'react-navigation'
import { NotCompletedNavigator } from '../navigationConfig'
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

class NotCompletedNav extends Component {
  static navigationOptions = {
    tabBarLabel: '',
    tabBarIcon: ({tintColor}) => (
      <Image 
      source={require('../../../TabPhotos/notComplete.png')}
      style={{width:30, height:30, top: 5, tintColor: 'white'}}>
      </Image>
    )
  }

  render() {
    const { dispatch, notCompletedState } = this.props
    return (
      <NotCompletedNavigator
        navigation={
          addNavigationHelpers({
            dispatch: dispatch,
            state: notCompletedState,
            addListener
          })
        }
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
     notCompletedState: state.NotCompleted
   }
 }

export default connect(mapStateToProps)(NotCompletedNav)