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
import { bindActionCreators } from "redux";
import { firebase, app, facebookProvider } from "../../../firebase";
import App from "../../App"

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
  }
  constructor(props) {
    super(props);
    this.state = {
      logOut: false
    };
  }

  logOut() {
    const { actions } = this.props;
    console.log('logout')
    app
      .auth()
      .signOut()
      .then(user => {
        this.setState({
          logOut: true
        })
        actions.LogOut(false);
      });
  }

  render() {
    console.log(this.props, 'profile props')
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.top}
          onPress={() => {
            this.logOut();
            //this.props.navigation.navigate("TabBar")
          }}
        >
          <Text>Log Out</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapDispatch = dispatch => {
  return {
    actions: bindActionCreators(AuthActions, dispatch)
  };
};

export default connect(null, mapDispatch)(Profile);
