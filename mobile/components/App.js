import React, { Component } from "react";
import TabBarNav from "./TabBar/views/TabBarNav";
import { connect } from "react-redux";
import { View, Text, Image, StyleSheet } from "react-native";
import { bindActionCreators } from "redux";
import AuthNav from "./Auth/views/AuthNav.js";
import * as AuthActions from "../actions/logActions.js";
import * as ToDoActions from "../actions/toDoAction.js";
import Spinner from "react-native-spinkit";
import { app, firebaseDB } from "../firebase";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userID: ""
		};
	}

	render() {
		const { authorized, authorizing } = this.props;
		if (!authorized) {
			return (
				<View style={styles.container}>
					{authorizing ? (
						<View>
							<Text>Loading</Text>
							<Spinner type="FadingCircle" />
						</View>
					) : (
						<AuthNav />
					)}
				</View>
			);
		} else {
			return <TabBarNav id={this.state.id} todos={this.state.todos} />;
		}
	}
}

const appState = state => {
	return {
		authorized: state.Log.authorized,
		authorizing: state.Log.authorizing
	};
};

const appDispatch = dispatch => {
	return {
		dispatch,
		actions: bindActionCreators(AuthActions, dispatch),
    ToDoActions: bindActionCreators(
      ToDoActions,
      dispatch
    )
	};
};

export default connect(appState, appDispatch)(App);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "white"
	},
	image: {
		width: 350,
		height: 200
	}
});
