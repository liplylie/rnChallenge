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
  Alert, 
} from "react-native";
import Button from "react-native-button"
import { connect } from "react-redux";
import Spinner from "react-native-spinkit";
import { bindActionCreators } from "redux";
import * as AuthActions from "../../../actions/logActions.js";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
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
      username: '',
      password: '',
    };
  }
  
  onLogin() {
    const { username, password } = this.state;
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
    return (
      <View style={styles.container}>
        <TextInput
          value={this.state.username}
          onChangeText={(username) => this.setState({ username })}
          placeholder={'Username'}
          style={styles.input}
        />
        <TextInput
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
          placeholder={'Password'}
          secureTextEntry={true}
          style={styles.input}
        />
        
         <Button
          containerStyle={{padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: 'white'}}
          disabledContainerStyle={{backgroundColor: 'grey'}}
          style={{fontSize: 20, color: 'green'}}
          onPress={()=>this.onLogin()}>
          Login
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
