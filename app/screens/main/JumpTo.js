import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
import { getAllQuestions } from "actions";
import { Loader } from "components";

class JumpTo extends React.Component {
  componentDidMount() {
    const id = this.props.navigation.getParam("Id");
    this.props.getAllQuestions(id);
  }

  render() {
    const { allQuestions, loading } = this.props;
    if (loading.all_question) {
      return <Loader msg="Fetching Questions..." />;
    }
    return (
      <View style={styles.container}>
        {/* Above color indictors  */}
        <View style={styles.indicators}>
          <View style={styles.indicatorContainer}>
            <Icon
              style={[styles.indicatorIconStyle, { color: colors.answered }]}
              name="ios-square"
            />
            <Text style={styles.indicatorTextStyle}>Answered</Text>
          </View>
          <View style={styles.indicatorContainer}>
            <Icon
              style={[styles.indicatorIconStyle, { color: colors.current }]}
              name="ios-square"
            />
            <Text style={styles.indicatorTextStyle}>Current</Text>
          </View>
          <View style={styles.indicatorContainer}>
            <Icon
              style={[styles.indicatorIconStyle, { color: colors.skipped }]}
              name="ios-square"
            />
            <Text style={styles.indicatorTextStyle}>Skipped</Text>
          </View>
        </View>
        {/* ======================  */}

        {/* Questions list  */}
        <ScrollView>
          <View style={styles.questionsContainer}>
            {allQuestions.map((e, index) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate("Questions", {
                      questionDetail: e
                    })
                  }
                >
                  <View style={styles.questionContainer}>
                    <Text style={styles.questionNumber}>{index + 1}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
        {/* ======================  */}

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

const mapStateToProps = ({ questions }) => {
  return ({ allQuestions, loading } = questions);
};

export default connect(
  mapStateToProps,
  { getAllQuestions }
)(JumpTo);

// Colors for indictors.
const colors = {
  current: "lightgray",
  answered: "#6CA54C",
  skipped: "#FFB800"
};

// Define Styles.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 15
  },
  indicators: {
    flexDirection: "row"
  },
  indicatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10
  },
  indicatorIconStyle: {
    color: "green",
    fontSize: 30
  },
  indicatorTextStyle: {
    fontSize: 17,
    color: "gray",
    marginLeft: 15,
    marginTop: -2
  },
  questionContainer: {
    height: 30,
    width: 30,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#CFCFCF",
    margin: 5
  },
  questionsContainer: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    paddingVertical: 20
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
