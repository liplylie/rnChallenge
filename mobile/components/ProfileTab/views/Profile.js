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
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import Spinner from "react-native-spinkit";
import * as AuthActions from "../../../actions/logActions.js";
import * as ToDoActions from "../../../actions/toDoAction.js";
import { bindActionCreators } from "redux";
import { firebase, app, facebookProvider } from "../../../firebase";
import App from "../../App";
import Button from "react-native-button";
import { NavigationActions } from "react-navigation";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white"
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
  },
  top: {
    top: 50
  }
});

class Profile extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      logOut: false
    };
  }

  logOut() {
    const { actions, ToDoActions, navigation } = this.props;
    console.log("logout");
    navigation.navigate("HomeNav")
    app
      .auth()
      .signOut()
      .then(user => {
        actions.LogOut(false);
        ToDoActions.DeleteAll();
      });
  }

  render() {
    console.log(this.props, "profile props");
    return (
      <View style={styles.container}>
        <Button
          containerStyle={{
            padding: 10,
            height: 45,
            overflow: "hidden",
            borderRadius: 4,
            backgroundColor: "white",
            top: 30
          }}
          disabledContainerStyle={{ backgroundColor: "grey" }}
          style={{ fontSize: 20, color: "green" }}
          onPress={() => this.logOut()}
        >
          Log Out
        </Button>
      </View>
    );
  }
}

const mapDispatch = dispatch => {
  return {
    dispatch,
    actions: bindActionCreators(AuthActions, dispatch),
    ToDoActions: bindActionCreators(ToDoActions, dispatch)
  };
};

export default connect(null, mapDispatch)(Profile);
