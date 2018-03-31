import React, { Component } from 'react'
import { addNavigationHelpers } from 'react-navigation'
import { ProfileNavigator } from '../navigationConfig'
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

class ProfileNav extends Component {
  static navigationOptions = {
    tabBarLabel: '',
    tabBarIcon: ({tintColor}) => (
      <Image 
      source={require('../../../TabPhotos/profile.png')}
      style={{width:30, height:30, tintColor: 'white'}}>
      </Image>
    )
  }

  render() {
    const { dispatch, profileState } = this.props
    return (
      <ProfileNavigator
        navigation={
          addNavigationHelpers({
            dispatch: dispatch,
            state: profileState,
            addListener
          })
        }
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
     profileState: state.Profile
   }
 }

export default connect(mapStateToProps)(ProfileNav)