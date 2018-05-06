import React from "react";
import {
  CameraRoll,
  StyleSheet,
  View,
  Image
} from "react-native";
import { Constants, Camera, FileSystem, Permissions, ImagePicker } from "expo";
import { Container,Button, Icon, Text } from 'native-base';
import Firebase from "./Firebase";
import * as firebase from 'firebase';


export default class Home extends React.Component {
  static navigationOptions = {
          header: null
      }

componentDidMount(){
  var user = firebase.auth().currentUser;
  if(user){
    console.log("User in Home component: " + user.uid)
    }
}
  render() {
    // console.log("home: " + this.props.navigation.state);
    // for(var property in this.props.navigation.state){
    //   console.log(property);
    // }
    // var user = firebase.auth().currentUser;
    // if(user){
    //   console.log("User in Home component: " + user.uid)
    //   }
    return (
      <View style={styles.container}>
          <View>

          <Button large style={styles.button} onPress={() => this.props.navigation.navigate('CameraScreen',{returnData:
            (res, image) => {
             this.props.navigation.navigate('Recognition', {result: res, image: image});
            }
          })}>
            <Text style={styles.btnText}>Take Photo</Text>
          </Button>
          <Button large style={styles.button} onPress={() => this.props.navigation.navigate('Image')}>
            <Text style={styles.btnText}>Open Gallery</Text>
          </Button>

        </View>
      </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#cbe86b",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#45c6b5",
    padding: 10,
    margin: 10,
  },
  btnText: {
    color: "white",
    fontSize: 15
  },

});
