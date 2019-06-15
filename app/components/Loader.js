import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Bubbles } from "react-native-loader";
import { colors } from "styles";

class Loader extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Bubbles size={8} color={colors.primary} />
        <Text style={styles.msgStyle}>{this.props.msg}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  msgStyle: {
    color: colors.primary,
    margin: 20,
    fontStyle: "italic"
  }
});

export default Loader;
