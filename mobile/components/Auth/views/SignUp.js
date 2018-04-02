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
import validator from "email-validator"
import { firebase, app, facebookProvider } from "../../../firebase";

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

class SignUp extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      email: '',
      password: '',
      passwordTwo: ''
    };
  }
  
  onSignUp() {
    const { email, password, passwordTwo } = this.state;
    if (password !== passwordTwo){
       Alert.alert("Passwords do not match");
    } else if (password.length < 6){
       Alert.alert("Password needs to be more than 6 characters");
    } else if (!this.validateEmail(email)){
      Alert.alert("Please enter valid email");
    } else {
      app
        .auth()
        .fetchProvidersForEmail(email)
        .then(providers => {
          if (providers.length === 0) {
            this.logIn()
            return app.auth().createUserWithEmailAndPassword(email, password);
          } else {
            Alert.alert("You already have an account");
          }
        })
      }
  }

  goBack(){
    console.log(this.props, 'go back sign ')
    this.props.goBack()
  }

  validateEmail(email){
    console.log(validator.validate(email), 'validatoin')
    return validator.validate(email)
  };

  logIn() {
    const { actions, navigation } = this.props;
    actions.Login({
      online: false,
      name: "",
      userId: "",
      picture: "",
      email: this.state.email,
      error: null,
      authorized: true,
      authorizing: false
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          value={this.state.email}
          onChangeText={(email) => this.setState({ email })}
          placeholder={'Email'}
          style={styles.input}
        />
        <TextInput
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
          placeholder={'Password'}
          secureTextEntry={true}
          style={styles.input}
        />
        <TextInput
          value={this.state.passwordTwo}
          onChangeText={(passwordTwo) => this.setState({ passwordTwo })}
          placeholder={'Confrim Password'}
          secureTextEntry={true}
          style={styles.input}
        />
        
         <Button
          containerStyle={{padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: 'white'}}
          disabledContainerStyle={{backgroundColor: 'grey'}}
          style={{fontSize: 20, color: 'black'}}
          onPress={()=>this.onSignUp()}>
          SignUp
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

export default connect(mapState, mapDispatch)(SignUp);
