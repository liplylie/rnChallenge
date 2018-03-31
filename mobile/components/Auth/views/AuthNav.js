import React, { Component } from 'react'
import { addNavigationHelpers } from 'react-navigation'
import { AuthNavigator } from '../navigationConfig'
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

class AuthNav extends Component {

  render() {
    const { dispatch, AuthState } = this.props
    return (
      <AuthNavigator
        navigation={
          addNavigationHelpers({
            dispatch: dispatch,
            state: AuthState,
            addListener
          })
        }
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
     AuthState: state.Auth
   }
 }

export default connect(mapStateToProps)(AuthNav)