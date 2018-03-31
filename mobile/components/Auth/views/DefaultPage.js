import React, { Component } from "react";
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

import * as AuthActions from "../../../actions/logActions.js";

class DefaultPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //this.props.actions.getFBToken();
    console.log(this.props, "props DefaultPage");
  }

  signUp() {
    const { navigation } = this.props.navigation;
    navigation.navigate("SignUp");
  }

  logIn() {
    //const { navigation } = this.props.navigation;
    this.props.navigation.navigate("LogIn");
  }

  magicLogIn() {
    const { actions, navigation } = this.props;
    //const { navigation } = this.props.navigation;
    actions.Login({
      online: false,
      name: "",
      userId: "",
      picture: "",
      email: "",
      error: null,
      authorized: true,
      authorizing: false
    });
    navigation.navigate("TabBar");
  }

  render() {
    const { authorized, actions } = this.props;

    return (
      <View style={styles.container}>
        <Text> To Do List </Text>
        <Image
          style={styles.image}
          resizeMethod="resize"
          resizeMode="contain"
          source={require("../../../TabPhotos/logo.png")}
        />
        <TouchableOpacity title="click" style={styles.button} onPress={() => this.magicLogIn()}>
          <Text> Magic Log In</Text>
        </TouchableOpacity>
          <TouchableOpacity onPress={() => this.logIn()}>
            <Text> Log In</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.signUp()}>
            <Text> Sign Up</Text>
          </TouchableOpacity>
      </View>
    );
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
  image: {
    height: 200,
    width: 200
  },
  container: {
    alignItems: "center",
    backgroundColor: "red"
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    height: 80,
    width: 200
  },
});
