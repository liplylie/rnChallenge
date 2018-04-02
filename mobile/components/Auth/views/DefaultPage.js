import React, { Component, PureComponent } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  AlertIOS,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import Button from "react-native-button";

import * as AuthActions from "../../../actions/logActions.js";

class DefaultPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      signUp: false,
      logIn: false
    };
    this.goBack = this.goBack.bind(this)
    this.goBackSignUp = this.goBackSignUp.bind(this)
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

  goBack(){
    this.setState({
      logIn: false
    })
  }

  goBackSignUp(){
    console.log(this.props, 'go back')
    this.setState({
      signUp: false
    })
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
      return <LogIn goBack={this.goBack}/>;
    } else if (this.state.signUp) {
      return <SignUp goBack={this.goBackSignUp}/>;
    } else {
      return (
        <View style={styles.container}>
          <Image
            style={styles.image}
            resizeMethod="resize"
            resizeMode="contain"
            source={require("../../../TabPhotos/logo.png")}
          />
          <Button
            containerStyle={{
              padding: 10,
              height: 45,
              overflow: "hidden",
              borderRadius: 4,
              backgroundColor: "khaki",
              margin: 3
            }}
            disabledContainerStyle={{ backgroundColor: "grey" }}
            style={{ fontSize: 20, color: "black" }}
            onPress={() => this.logIn()}
          >
            Login
          </Button>
          <Button
            containerStyle={{
              padding: 10,
              height: 45,
              overflow: "hidden",
              borderRadius: 4,
              backgroundColor: "khaki"
            }}
            disabledContainerStyle={{ backgroundColor: "grey" }}
            style={{ fontSize: 20, color: "black" }}
            onPress={() => this.signUp()}
          >
            Sign Up
          </Button>
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
    flex: 0.3,
    bottom: 10
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    height: 80,
    width: 200
  }
});
