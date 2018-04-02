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
import { firebase, app, facebookProvider, firebaseDB } from "../../../firebase";

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

        let userTodos = firebaseDB.ref("/users/" + user.uid + "/todos");
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
        let todos = [
      {
        id: 12,
        status: "not completed",
        content: "made from firebase",
        timeStamp: "123"
      },
    ];
        userTodos.once("value").then(
          snapshot => {
            if (snapshot.val()) {
              console.log(snapshot.val(), "todos from fb");
              let todos = snapshot.val();
              for (let i = 0; i < todos.length; i++) {
                ToDoActions.addToDo(todos[i]);
                console.log(todos[i], "tab bar nav todo");
              }
            } else {
              userTodos.update(todos);
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

  componentDidMount() {
    console.log(this.props, "tab props");
    const { ToDoActions } = this.props;
    console.log(ToDoActions, "ToDoActions");
    let todos = [
      {
        id: 0,
        status: "not completed",
        content: "walk the dog",
        timeStamp: "123"
      },
      {
        id: 1,
        status: "completed",
        content: "walk the cat",
        timeStamp: "124"
      },
      {
        id: 3,
        status: "not completed",
        content: "walk the dog",
        timeStamp: "123"
      },
      {
        id: 4,
        status: "completed",
        content: "walk the cat",
        timeStamp: "124"
      },
      {
        id: 5,
        status: "not completed",
        content: "walk the dog",
        timeStamp: "123"
      },
      {
        id: 6,
        status: "completed",
        content: "walk the cat",
        timeStamp: "124"
      },
      {
        id: 7,
        status: "not completed",
        content: "should go to deleted",
        timeStamp: "123"
      },
      {
        id: 8,
        status: "completed",
        content: "should go to deleted",
        timeStamp: "124"
      },
      {
        id: 9,
        status: "not completed",
        content: "should go to completed",
        timeStamp: "123"
      },
      {
        id: 10,
        status: "completed",
        content: "should go to not trash",
        timeStamp: "1240000"
      },
      {
        id: 11,
        status: "deleted",
        content: "should be deleted",
        timeStamp: "124"
      }
    ];
    for (let i = 0; i < todos.length; i++) {
      ToDoActions.addToDo(todos[i]);
      console.log(todos[i], "tab bar nav todo");
    }
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
