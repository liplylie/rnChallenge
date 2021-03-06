import React, { Component } from "react";
import { List, ListItem } from "react-native-elements";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Header,
  TextInput,
  TouchableHighlight,
  Alert
} from "react-native";
import Button from "react-native-button";
import { connect } from "react-redux";
import Spinner from "react-native-spinkit";
import { bindActionCreators } from "redux";
import * as AuthActions from "../../../actions/logActions.js";
import { firebase, app, facebookProvider } from "../../../firebase";
import { NavigationActions } from "react-navigation";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ecf0f1"
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 10
  },
  button: {
    height: 40,
    width: 200
  },
  title: {
    flexDirection: "column",
    margin: 10
  },
  image: {
    width: 200,
    height: 30
  },
  header: {
    height: 70,
    backgroundColor: "white"
  },
  collection: {
    backgroundColor: "skyblue",
    flex: 1
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  spinner: {
    justifyContent: "center",
    alignItems: "center"
  }
});

class LogIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  logIn() {
    /* this method is called from this.onLogin(). 
    This dispatches data to redux, and allows the user to go to the TabBarNav, which is the main app
    */
    const { email, password } = this.state;
    const { actions, navigation } = this.props;

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
  }

  goBack(){
    // this method causes the user to go back to the default page
    this.props.goBack()
  }

  onLogin() {
    const { email, password } = this.state;
    app
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(result => {
        console.log("logged in");
        this.logIn();
      })
      .catch(err => {
        console.log("error with login", err);
        alert(err.message);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
          placeholder={"Email"}
          style={styles.input}
        />
        <TextInput
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
          placeholder={"Password"}
          secureTextEntry={true}
          style={styles.input}
        />

        <Button
          containerStyle={{
            padding: 10,
            height: 45,
            overflow: "hidden",
            borderRadius: 4,
            backgroundColor: "white"
          }}
          disabledContainerStyle={{ backgroundColor: "grey" }}
          style={{ fontSize: 20, color: "black" }}
          onPress={() => this.onLogin()}
        >
          Login
        </Button>
        <Button
          containerStyle={{
            padding: 10,
            height: 45,
            overflow: "hidden",
            borderRadius: 4,
            backgroundColor: "white"
          }}
          disabledContainerStyle={{ backgroundColor: "grey" }}
          style={{ fontSize: 20, color: "green" }}
          onPress={() => this.goBack()}
        >
          Go Back
        </Button>
      </View>
    );
  }
}
const mapState = state => {
  return {
    authorizing: state.Auth.authorizing,
    authorized: state.Auth.authorized
  };
};

const mapDispatch = dispatch => {
  return {
    actions: bindActionCreators(AuthActions, dispatch)
  };
};

export default connect(mapState, mapDispatch)(LogIn);
