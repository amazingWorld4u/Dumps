import React from "react";
import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  FlatList,
  ScrollView,
  StyleSheet
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Text } from "react-native-elements";
import { connect } from "react-redux";
import { getAllSeries } from "actions";
import { Loader } from "components";
import { colors } from "styles";

const labels = [
  { text: "Today's\nQuiz" },
  { text: "Old Archive\nPaper" },
  { text: "Your\nSubscriptions" },
  { text: "Upcoming\nExam" },
  { text: "Explore\nExam classes" },
  { text: "" }
];

const banners = [
  { img_path: require("assets//banner.jpg") },
  { img_path: require("assets//banner.jpg") },
  { img_path: require("assets//banner.jpg") },
  { img_path: require("assets//banner.jpg") },
  { img_path: require("assets//banner.jpg") },
  { img_path: require("assets//banner.jpg") },
  { img_path: require("assets//banner.jpg") },
  { img_path: require("assets//banner.jpg") },
  { img_path: require("assets//banner.jpg") },
  { img_path: require("assets//banner.jpg") }
];

class Home extends React.Component {
  componentDidMount() {
    this.props.getAllSeries();
  }

  renderBanners = ({ item, index }) => {
    const { img_path } = item;
    return (
      <TouchableWithoutFeedback key={index.toString()}>
        <Image
          key={index.toString()}
          source={img_path}
          style={styles.bannerStyle}
          resizeMode="stretch"
        />
      </TouchableWithoutFeedback>
    );
  };

  navigation(Id) {
    this.props.navigation.navigate("JumpTo", { Id });
  }

  render() {
    if (this.props.loading.home) {
      return <Loader msg="Fetching Series..." />;
    }
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Input
            containerStyle={styles.containerStyle}
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={styles.inputStyle}
            placeholder="Search for a    Exam classes"
            leftIcon={{
              type: "evilIcons",
              name: "search",
              size: 25,
              color: "rgb(100, 100, 100)",
              marginRight: 10,
              paddingLeft: 0
            }}
          />
        </View>
        <ScrollView>
          <View style={styles.topLinksContainer}>
            {this.props.series.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => this.navigation(item.Id)}
                  style={[
                    styles.topLink,
                    index % 2 === 1 && { backgroundColor: "#F2F2F2" }
                  ]}
                >
                  <View>
                    <Text style={styles.linkTextStyle}>{item.SeriesName}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.bannerContainer}>
            <FlatList data={banners} renderItem={this.renderBanners} />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({ questions }) => {
  return ({ series, loading } = questions);
};

export default connect(
  mapStateToProps,
  { getAllSeries }
)(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    height: 120,
    padding: 10,
    backgroundColor: colors.primary
  },
  inputContainerStyle: {
    borderBottomWidth: 0
  },
  containerStyle: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 0,
    paddingVertical: 0,
    height: 45
  },
  inputStyle: {
    fontSize: 16,
    color: colors.primary
  },
  topLinksContainer: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  topLink: {
    flex: 1,
    minWidth: "33%",
    maxHeight: 100,
    minHeight: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#F2F2F2"
  },
  linkTextStyle: {
    textAlign: "center",
    color: "#EC696C"
  },
  bannerContainer: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "#F2F2F2"
  },
  bannerStyle: {
    width: "100%",
    height: 80,
    marginBottom: 10
  }
});
