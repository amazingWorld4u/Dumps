import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { CheckBox } from "react-native-elements";

const replaceBrRegx = new RegExp("</br>", "g");

class Questions extends React.Component {
  render() {
    const questionDetails = this.props.navigation.getParam(
      "questionDetail",
      []
    );
    if (!questionDetails.length) return <View />;

    return (
      <View style={styles.container}>
        <View>
          <Text>
            {questionDetails[0].QuestionNo}.{" "}
            {questionDetails[0].Question.replace(replaceBrRegx, "")}
          </Text>
        </View>
        <View>
          {questionDetails.map(item => {
            return (
              <View style={styles.questionStyle}>
                <CheckBox
                  containerStyle={styles.checkboxContainer}
                  uncheckedColor="#ED3833"
                />
                <Text>{item.Option}</Text>
              </View>
            );
          })}
        </View>
       {/* Below left and right arrow  */}
       <View style={styles.arrowContainer}>
          <View>
            <Image
              resizeMode="stretch"
              style={styles.arrowImage}
              source={require("assets/left_arrow.png")}
            />
            <Text>Previous</Text>
          </View>

          <View>
            <Image
              resizeMode="stretch"
              style={[styles.arrowImage, { transform: [{ rotate: "180deg" }] }]}
              source={require("assets/left_arrow.png")}
            />
            <Text>Skip</Text>
          </View>
        </View>
        {/* ======================  */}
      </View>
    );
  }
}

export default Questions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20
  },
  questionStyle: {
    padding: 15,
    paddingLeft: 20,
    borderWidth: 0.5,
    borderColor: "#ED3833",
    backgroundColor: "#F8F8F8",
    borderRadius: 5,
    marginVertical: 10,
    shadowOffset: { width: 0, height: 1 },
    shadowColor: "#000",
    shadowOpacity: 0.3,
    justifyContent: "center"
  },
  checkboxContainer: {
    position: "absolute",
    left: -30
  },
  arrowContainer: {
    width: "85%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20
  },
  arrowImage: {
    height: 30,
    width: 35
  }
});
