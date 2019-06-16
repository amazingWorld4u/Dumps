import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { Input } from "components";
import { colors } from "styles";
import { facebookLogin, googleLogin } from "services";

const logo = require("assets/logo.png");
const googleLogo = require("assets/google_logo.png");
const facebookLogo = require("assets/facebook_logo.png");

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { callingCode: 91, cca2: "IN" };
  }

  countryPicked = values => {
    this.setState({ cca2: values.cca2, callingCode: values.callingCode });
  };

  skipLogin = () => {
    this.props.navigation.navigate("Home");
  };

  loginFail = () => {};

  render() {
    return (
      <View style={styles.container}>
        <Button
          buttonStyle={styles.skipButtonContainer}
          titleStyle={styles.skipButtonTitle}
          containerStyle={styles.skipButtonContainer}
          title="Skip for now"
          type="outline"
          onPress={this.skipLogin}
        />
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={logo} />
        </View>
        <View style={styles.inputContainer}>
          <Input
            style={styles.inputStyle}
            enableCountryPicker
            inputProps={{ placeholder: "Mobile Number" }}
            onCountryPick={this.countryPicked}
            cca2={this.state.cca2}
            callingCode={this.state.callingCode}
          />
          <Input
            style={styles.inputStyle}
            leftIconSource={googleLogo}
            inputProps={{ placeholder: "Login With Google", editable: false }}
            onPress={() => googleLogin(this.skipLogin, this.loginFail)}
          />
          <Input
            style={styles.inputStyle}
            leftIconSource={facebookLogo}
            onPress={() => facebookLogin(this.skipLogin, this.loginFail)}
            inputProps={{ placeholder: "Login With Facebook", editable: false }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  skipButtonContainer: {
    borderRadius: 20,
    alignSelf: "flex-end",
    margin: 10,
    paddingHorizontal: 15,
    overflow: "hidden"
  },
  skipButtonTitle: {
    fontWeight: "500"
  },
  logoContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    width: "70%",
    borderColor: "rgb(224, 224, 224)"
  },
  logo: {
    width: 170,
    height: 60
  },
  inputContainer: {
    flex: 2,
    marginTop: "15%"
  },
  inputStyle: {
    marginVertical: 10
  }
});

export default Login;
