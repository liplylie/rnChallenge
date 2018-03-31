import React, { Component } from 'react'
import { addNavigationHelpers } from 'react-navigation'
import { HomeNavigator } from '../navigationConfig'
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

class HomeNav extends Component {
  static navigationOptions = {
    tabBarLabel: '',
    tabBarIcon: ({tintColor}) => (
      <Image 
      source={require('../../../TabPhotos/home_icon.png')}
      style={{width:30, height:30, tintColor: 'white'}}>
      </Image>
    )
  }

  render() {
    const { homeState, dispatch } = this.props
    return (
      <HomeNavigator
        navigation={
          addNavigationHelpers({
            dispatch: dispatch,
            state: homeState,
            addListener
          })
        }
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    homeState: state.Home
   }
 }

export default connect(mapStateToProps)(HomeNav)