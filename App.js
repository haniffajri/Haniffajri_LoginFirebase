import React, { Component } from "react";
import { View } from "react-native";
//import firebase from "firebase";
import firebase from "@firebase/app"
import "@firebase/auth"
import { Header, Button, Spinner } from "./src/components/common";
import LoginForm from "./src/components/LoginForm";

class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
    const config = {
      apiKey: "AIzaSyDDyM-Nh7EX1krdasPztZZqK0xB2JfhhJw",
      authDomain: "thursdayproject-52bbc.firebaseapp.com",
      databaseURL: "https://thursdayproject-52bbc.firebaseio.com",
      projectId: "thursdayproject-52bbc",
      storageBucket: "thursdayproject-52bbc.appspot.com",
      messagingSenderId: "237594004534"
    };
    firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <Button onPress={() => firebase.auth().signOut()}>Log Out</Button>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner />;
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
