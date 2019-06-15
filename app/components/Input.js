import React from "react";
import {
  View,
  TextInput,
  Image,
  Text,
  TouchableWithoutFeedback,
  StyleSheet
} from "react-native";
import CountryPicker from "react-native-country-picker-modal";

/**
 * Input wrapper on top of react native TextInput.
 */
class Input extends React.Component {
  /**
   * Render country picker if enableCountryPicker == true.
   */
  renderCountryPicker() {
    return (
      <View style={styles.ccStyle}>
        <CountryPicker
          onChange={this.props.onCountryPick}
          filterable
          cca2={this.props.cca2}
        />
        <Text style={styles.cca2LabelStyle}> +{this.props.callingCode}</Text>
      </View>
    );
  }

  render() {
    const {
      leftIconSource,
      inputProps,
      onPress,
      enableCountryPicker,
      style
    } = this.props;
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={[styles.container, style]}>
          <View style={styles.leftContent}>
            {enableCountryPicker && this.renderCountryPicker()}
            {leftIconSource && (
              <Image
                style={styles.leftIconStyle}
                source={leftIconSource}
                resizeMode="stretch"
              />
            )}
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputStyle}
              {...inputProps}
              placeholderTextColor="rgb(160, 160, 160)"
              pointerEvents={inputProps.editable === false ? "none" : "auto"}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

Input.defaultProps = {
  cca2: "IN"
};

const styles = StyleSheet.create({
  container: {
    width: "80%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgb(224, 224, 224)",
    borderRadius: 5
  },
  leftContent: {
    height: "70%",
    width: 90,
    overflow: "hidden",
    borderRightWidth: 1,
    borderColor: "rgb(224, 224, 224)",
    justifyContent: "center",
    alignItems: "center"
  },
  leftIconStyle: {
    width: 30,
    height: 30
  },
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 10
  },
  inputStyle: {
    flex: 1,
    color: "rgb(160, 160, 160)",
    textAlign: "center",
    fontSize: 18
  },
  ccStyle: {
    flexDirection: "row",
    alignItems: "center"
  },
  cca2LabelStyle: {
    marginTop: 4,
    marginLeft: 1
  }
});

export default Input;
