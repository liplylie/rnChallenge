import React, { Component } from 'react'
import { addNavigationHelpers } from 'react-navigation'
import { DeletedNavigator } from '../navigationConfig'
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

class DeletedNav extends Component {
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
    const { dispatch, deletedState } = this.props
    return (
      <DeletedNavigator
        navigation={
          addNavigationHelpers({
            dispatch: dispatch,
            state: deletedState,
            addListener
          })
        }
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
     deletedState: state.Deleted
   }
 }

export default connect(mapStateToProps)(DeletedNav)