import React, { Component } from 'react';
import {  View, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Constants } from 'expo';
import { Form, Container,Content, Button, Toast, Text } from 'native-base';
import DatePicker from 'react-native-datepicker'
import Room from './Room'
import Person from './Person'
import firebase from './Firebase'

// or any pure javascript modules available in npm
import { Card } from 'react-native-elements'; // Version can be specified in package.json
var database = firebase.database();

const list = [ 'agave', 'bamboo', 'bird of paradise', 'bleeding hearts', 'blue thistle', 'california poppy', 'calla lily', 'cherry blossoms', 'crocus', 'daffodil', 'dahlia', 'daisy', 'fern', 'fly agaric', 'forsythia', 'foxgloves', 'gerbera', 'hibiscus', 'iris', 'lace leaf', 'lavender', 'orchid', 'persimmon', 'plumeria', 'poinsettia', 'protea', 'rose', 'snowdrop', 'sunflower', 'tulip'];

export default class CreateRoom extends Component {
  static navigationOptions = {
    header: null
  }
  constructor(props) {
    super(props);
    this.state = {
      roomname: "",
      endingtime: "10:00",
      points:  [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
    };

  }


  renderrender(){
    var count = -1;
    return list.map(item => {
      count++;
      return this.renderInput(count);
    });
  }

  renderInput(id){
    return  (
      <View key ={id} style={styles.viewInputStyle}>
              <Text  style={styles.textStyle1}>{list[id]}</Text>
              <TextInput
                style={styles.textInputStyle}
                placeholder= '10'
                onChangeText = {(text) => this._update(text, id)}
                keyboardType='numeric'
                maxLength={5}
              />
      </View>);
  }

  _update = (text, index) => {
    const newArray = [...this.state.points];
    newArray[index] = text;
    this.setState({ points: newArray });
  }

  submitButtonHandler(){

    var roomnameTemp = this.state.roomname;
    var endingtimeTemp = this.state.endingtime;
    var pointsTemp = this.state.points;
    var peopleTemp = [new Person('null', 'null')];
    if(roomnameTemp.trim() == ""){
      alert("Please enter roomname!");
    }
    else{
      var room = new Room(roomnameTemp, endingtimeTemp, pointsTemp, peopleTemp);
	  database.ref("rooms").push(room);
	  this.props.navigation.navigate('Game');
    }
  }
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Card title=" Create Your Own Room for a Plant Game">
            <Text style={styles.infoTextStyle}>Enter Room Name</Text>
            <TextInput
                  style={styles.textInputStyle1}
                  placeholder= 'Enter Room Name'
                  onChangeText = {(text) => this.setState({ roomname: text })}
                  maxLength={20}
                />

            <Text style={styles.infoTextStyle}>Choose an Ending Time</Text>
            <DatePicker
              style={{width: 200}}
              date={this.state.endingtime}
              mode="time"
              placeholder="select time"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
                },
              dateInput: {
              marginLeft: 36
              }
            }}
              onDateChange = {(time) => this.setState({endingtime: time })}
            />

            {/* <Text style={{padding: 10}}>{this.state.endingtime} {this.state.roomname} {this.state.points[0]} Current Point! {this.state.points[1]}</Text> */}
            <Text style={styles.infoTextStyle}>Point Values for Each Plant (Default = 10)</Text>
            {this.renderrender()}

        </Card>

        <View style={{justifyContent:'center', alignItems:'center'}}>
          <Button
          style={styles.buttonStyle}
          onPress={() => {
            this.submitButtonHandler();
        }}>
        <Text style={styles.buttonTextStyle}>
          Confirm
        </Text>

      </Button>
      </View>
        </View>
      </ScrollView>

    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fff'
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
    color: '#34495e'
  },
  viewInputStyle: {
    flexDirection: 'row',
    marginTop: 10
  },
  infoTextStyle: {
    fontSize: 16,
    fontWeight: '100',
    color: 'grey',
    // textDecorationLine: 'underline',
    marginTop: 5
  },
  textStyle1: {
    fontSize: 20,
    padding: 10,
    color:'black'
  },
  textInputStyle: {
    fontSize: 20,
    // marginLeft: 10,
    padding: 5,
    color:'black',
    width: 40,
    // borderWidth: 1,

  },
  textInputStyle1: {
    fontSize: 20,
    padding: 20,
    // margin: 10,
    // borderColor: '#99ff99',
    // backgroundColor: '#ffffe6'
  },
  buttonStyle: {
    margin: 15,
    padding: 20,
    width: 200,
    height: 60,
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor: '#45c6b5'
  },
  buttonTextStyle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18
  }
});
