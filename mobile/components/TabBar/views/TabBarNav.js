import React, { Component } from 'react'
import { addNavigationHelpers } from 'react-navigation'
import { TabBarNavigator } from '../navigationConfig'
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

class TabBarNav extends Component {
 

  componentDidMount(){
    console.log(this.props, 'tab props')
  }
  render() {
    const { dispatch, tabBarState } = this.props
    return (
      <TabBarNavigator
        navigation={
          addNavigationHelpers({
            dispatch: dispatch,
            state: tabBarState,
            addListener
          })
        }
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    tabBarState: state.TabBar
   }
 }

export default connect(mapStateToProps, null)(TabBarNav)