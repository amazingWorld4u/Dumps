import React from "react";
import { View } from "react-native";
import SplashScreen from "react-native-splash-screen";

export default class App extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      SplashScreen.hide();
      this.props.navigation.navigate("Login");
    }, 500);
  }

  render() {
    return <View style={{ flex: 1 }} />;
  }
}
