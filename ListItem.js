import React, {
  Component
} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import * as firebase from 'firebase';
import Room from './Room'
import Person from './Person'

class ListItem extends Component {
  constructor(props) {
	super(props);
  }
  //
	// this.state = {
	// 	username: "Bulbasaur"
	// }
  // }
  // componentDidMount(){
  //   var user = firebase.auth().currentUser;
  // 	var currentId = 1;
  // 	if(user != null){
  // 		currentId = user.uid;
  // 	}
  //
  // 	var database = firebase.database();
  // 	if(currentId != 1){
  // 		// console.log("whhy" + currentId);
  // 		database.ref("users").child(currentId).on('value', (snapshot) => {
  // 			// console.log("lumpy" + currentId);
  // 			this.setState({
  // 				username: snapshot.val().name
  // 			});
  // 		});
  // 	}
  //
  // }
  render() {
	var dialogTitle = 'Are you sure you want to join ' + this.props.task.name + "?";
    return (
      <View style={styles.listItem}>
        <Text style={styles.listItemTitle}>
			Room: {this.props.task.name}
		</Text>
		<TouchableOpacity
          style={styles.joinButtonStyle}
		  onPress={() => {

					var currentId = 1; //TODO replace with user's id
					var currentName = "jo";

					var item = this.props.task.obj;

					var alreadyExists = false;
					for(var i = 1; i < item.people.length && !alreadyExists; i++){
						if(currentId === item.people[i].userid){
							alreadyExists = true;
						}
					}

					if(!alreadyExists){
						var tempPerson = new Person(currentId, currentName);
						item.people.push(tempPerson);
						var database = firebase.database();
						database.ref("rooms").child(this.props.task._key).child("people").set(item.people);

                    }
                    this.props.navigation.navigate('GameRoom', {title: 'Game Room', key:this.props.task._key});
                  }
          }
          >
          <Text style={styles.joinButtonTextStyle}>
            JOIN
          </Text>

        </TouchableOpacity>
	  </View>
    );
  }
}
const styles = StyleSheet.create({
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
    joinButtonStyle:{
    margin: 5,
    padding: 10,
    alignItems: 'center',
    borderColor: '#45c6b5',
    borderWidth: 1,
    backgroundColor:'transparent'
    },
    joinButtonTextStyle:{
      color: '#45c6b5',
      fontWeight: 'bold',
      fontSize: 16,
    },
  buttonStyle:{
    margin: 15,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#45c6b5',
    },
    buttonTextStyle:{
      color: 'white',
      // fontWeight: 'bold',
      fontSize: 25,
    },
	listView: {
    flex: 2,
  },
  listItem: {
    borderBottomColor: '#c2f9cf',
    borderColor: '#c2f9cf',
	backgroundColor: 'white',
    flexDirection:'row',
    alignItems:'center',
    borderWidth: 1,
    padding: 10,
	width: 300,
  },
  listItemTitle: {
    flex: 6,
    color: '#000',
    fontSize: 16,
	fontWeight: 'bold',
	padding: 5,
  },
  listItemAction: {
    flex: 2,
    width: 100,
    height: 40
  },
});
module.exports = ListItem;
