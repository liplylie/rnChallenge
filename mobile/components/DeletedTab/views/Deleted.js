import React, { Component } from 'react';
import { List, ListItem } from 'react-native-elements'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView, 
  Header,
} from 'react-native';
import { connect } from 'react-redux';
import Spinner from 'react-native-spinkit';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  title:{
    flexDirection: 'column',
    margin: 10
  },
  image: {
    width: 200,
    height: 30,
  },
  header: { 
    height: 70,
    backgroundColor: 'white'
  }, 
  collection: {
    backgroundColor: 'skyblue',
    flex:1,
  },
  spinnerContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner:{
    justifyContent: 'center',
    alignItems: 'center'
  }
});

class Deleted extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      results: []
    }
  }

  render() {
      return (
        <View style={styles.spinnerContainer}>
          <Text> Deleted </Text>
          <Spinner type='FadingCircle' style={styles.spinner}/>
        </View>
      )
    }
}

const mapStateToProps = (store) =>{
  return {
  }
}


export default connect(mapStateToProps, null)(Deleted)