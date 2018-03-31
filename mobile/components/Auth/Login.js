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

import * as AuthActions from "../../actions/authActions.js";

class Login extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //this.props.actions.getFBToken();
  }

  signUp() {
    const { navigation } = this.props;
    navigation.navigate("SignUp");
  }

  logIn() {
    const { navigation } = this.props;
    navigation.navigate("LogIn");
  }

  render() {
    const { authorized, actions } = this.props;

    return (
      <View>
        <TouchableOpacity
          title="click"
          onPress={() =>
            actions.Login({
              online: false,
              name: "",
              userId: "",
              picture: "",
              email: "",
              error: null,
              authorized: false,
              authorizing: false
            })
          }
        >
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

export default connect(loginState, loginDispatch)(Login);

const styles = StyleSheet.create({});
