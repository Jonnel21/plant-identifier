import React from "react";
import CapturedImage from "./CapturedImage";
import Firebase from "./Firebase";
import * as firebase from 'firebase';
import { StyleSheet, Text, View } from 'react-native';
import{ StackNavigator,} from 'react-navigation';


import {Container, Content, Header, Form, Input, Item, Button, Label} from 'native-base'

export default class Login extends React.Component {
  // static navigationOptions = ({navigation}) => ({
  //   title: `${navigation.state.params.title}`,
  //   headerTitleStyle: {
  //     color: 'white',
  //     textAlign: 'center',
  //     alignSelf: 'center'
  //   },
  //   headerStyle: {
  //     backgroundColor: 'green'
  //   }
  // });
  static navigationOptions = {
    header: null
  }
  constructor(props){
    super(props)

    this.state= ({
      email: '',
      password:'',
      userData: null,
    })
  }

loginUser = (email,password)=>{

  try{
      firebase.auth().signInWithEmailAndPassword(email, password).then((data) => {
        this.setState({
          userData: data
        });
        this.props.navigation.navigate("Game", {title: "Let's Play", userData: data})

      });
  }
  catch(error){
    console.log("User has not been created")
  }

}

  render() {
      // console.log(this.state.userData.uid + " In login");

    return (

      <Container style={styles.container}>

        <Form>

          <Item floatingLabel>
          <Label style={{ color: '#009F18' }}>Email</Label>
          <Input
			style={{ color: 'black' }}
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={(email) => this.setState({email})}
          />
          </Item>

          <Item floatingLabel>
          <Label style={{ color: '#009F18' }}>Password</Label>
          <Input
			style={{ color: 'black' }}
            secureTextEntry={true}
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={(password) => this.setState({password})}
            />
          </Item>

          <Button style={{ marginTop: 10, backgroundColor: '#45c6b5' }} full success={true} onPress={()=>this.loginUser(this.state.email, this.state.password)} >
            <Text style={{ color: 'white' }}>Login</Text>
          </Button>



            <Button style={{marginTop: 10 }} full dark transparent onPress={()=>this.props.navigation.navigate("Register")} >
              <Text style={styles.textStyle}>
                Dont have an account?
              </Text>
              <Text style={styles.textStyle2}> Sign Up</Text>
          </Button>

        </Form>
      </Container>
    );
  }

}

loginUser = (email,password)=>{

  try{

      firebase.auth().signInWithEmailAndPassword(email, password)
      this.props.navigation.navigate("Game", {title: "Let's Play"})
  }
  catch(error){
    console.log("User has not been created")
  }

}


const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#BFF165',
    justifyContent: 'center',
    padding: 10
  },
  textStyle: {
	  color: '#009F18',
  },
  textStyle2: {
	  color: '#45c6b5',
  }
});
