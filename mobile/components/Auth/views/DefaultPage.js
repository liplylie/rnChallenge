import React, { Component, PureComponent } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  Button,
  AlertIOS,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import LogIn from "./LogIn";
import SignUp from "./SignUp";

import * as AuthActions from "../../../actions/logActions.js";

class DefaultPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      signUp: false,
      logIn: false
    }
  }

  componentWillMount() {
    //this.props.actions.getFBToken();
    // const { navigation } = this.props
    // navigation.navigate("DefaultPage")
    console.log(this.props, "props DefaultPage");
  }

  signUp() {
    // const { navigation } = this.props;
    // navigation.navigate("SignUp");
    this.setState({
      signUp: true
    });
  }

  logIn() {
    // const { navigation } = this.props
    // navigation.navigate("LogIn");
    this.setState({
      logIn: true
    });
  }

  // magicLogIn() {
  //   const { actions, navigation } = this.props;
  //   //const { navigation } = this.props.navigation;
  //   actions.Login({
  //     online: false,
  //     name: "",
  //     userId: "",
  //     picture: "",
  //     email: "",
  //     error: null,
  //     authorized: true,
  //     authorizing: false
  //   });
  //   navigation.navigate("TabBar");
  // }

  render() {
    const { authorized, actions } = this.props;

    if (this.state.logIn) {
      return <LogIn />;
    } else if (this.state.signUp) {
      return <SignUp />;
    } else {
      return (
        <View style={styles.container}>
          <Text> To Do List </Text>
          <Image
            style={styles.image}
            resizeMethod="resize"
            resizeMode="contain"
            source={require("../../../TabPhotos/logo.png")}
          />
          <TouchableOpacity style={styles.button} onPress={() => this.logIn()}>
            <Text> Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => this.signUp()}>
            <Text> Sign Up</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const loginState = state => {
  return {
    authorizing: state.Auth.authorizing,
    authorized: state.Auth.authorized
  };
};

const loginDispatch = dispatch => {
  return {
    actions: bindActionCreators(AuthActions, dispatch)
  };
};

export default connect(loginState, loginDispatch)(DefaultPage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ecf0f1"
  },
  image: {
    flex: 0.3
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    height: 80,
    width: 200
  }
});
