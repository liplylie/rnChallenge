import React, { Component } from "react";
import { addNavigationHelpers } from "react-navigation";
import { TabBarNavigator } from "../navigationConfig";
import { connect } from "react-redux";
import {
  createReduxBoundAddListener,
  createReactNavigationReduxMiddleware
} from "react-navigation-redux-helpers";
import * as ToDoActions from "../../../actions/toDoAction";
import * as AuthActions from "../../../actions/logActions";
import { bindActionCreators } from "redux";
import { app, facebookProvider, firebaseDB } from "../../../firebase";
import firebase from "firebase";

const middleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav
);
const addListener = createReduxBoundAddListener("root");

class TabBarNav extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { actions, authorized, ToDoActions } = this.props;
    let that = this;
    this.removeAuthListener = app.auth().onAuthStateChanged(user => {
      if (user) {
        console.log(user, "user in TabBarNav");

        let userTodos = firebaseDB.ref("/users/" + user.uid );
        //let userPath = firebaseDB.ref("/users/" + user.uid)
        const { actions, navigation } = this.props;
        actions.Login({
          online: true,
          name: "",
          userId: user.uid,
          picture: "",
          email: user.email,
          error: null,
          authorized: true,
          authorizing: false
        });
        userTodos.once("value").then(
          snapshot => {
            if (snapshot.val()) {
              console.log(snapshot.val(), "todos from fb");
              let todos = snapshot.val().todos;
              for (let i = 0; i < todos.length; i++) {
                ToDoActions.addToDo(todos[i]);
                console.log(todos[i], "tab bar nav todo");
              }
            } else {
              let todos= [{
                id: 0,
                status: "not completed",
                content: "Hi! Try Adding A Todo or changing my status!",
                timeStamp: firebase.database.ServerValue.TIMESTAMP
              }]
              userTodos.update({
                todos
              })
            }
          },
          errorObject => {
            console.log("The read failed: " + errorObject.code);
          }
        );
      } else {
        console.log("fail");
      }
    });
  }

  componentWillUnmount() {
    this.removeAuthListener();
  }


  render() {
    const { dispatch, tabBarState } = this.props;
    return (
      <TabBarNavigator
        navigation={addNavigationHelpers({
          dispatch: dispatch,
          state: tabBarState,
          addListener
        })}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    tabBarState: state.TabBar
  };
};

const mapDispatch = dispatch => {
  return {
    dispatch,
    ToDoActions: bindActionCreators(ToDoActions, dispatch),
    actions: bindActionCreators(AuthActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatch)(TabBarNav);
