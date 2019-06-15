import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  Dimensions
} from "react-native";
import { Icon } from "react-native-elements";
import { Ripple } from "components";
import { colors } from "styles";

const deviceWidth = Dimensions.get("screen").width;

const tabIcons = [
  {
    iconProps: { type: "material-community", name: "home-variant" },
    label: "Home"
  },
  {
    iconProps: { type: "antdesign", name: "calendar" },
    label: "My Bookings"
  },
  {
    iconProps: { type: "material", name: "chat-bubble-outline" },
    label: "Help Center"
  },
  {
    iconProps: { type: "material", name: "person-outline" },
    label: "Profile"
  }
];

const totalTabs = 4;
const singleTabWidth = deviceWidth / totalTabs;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: deviceWidth,
    height: 65,
    alignItems: "center",
    bottom: 0
  },
  tabContainer: {
    width: singleTabWidth,
    alignItems: "center",
    maxHeight: 75,
    justifyContent: "center"
  },
  tabLabelStyle: {
    fontSize: 12,
    fontWeight: "300",
    textAlign: "center",
    color: "gray"
    // marginTop: 5
  }
});

class CustomTabbar extends React.Component {
  openTab(tabIndex) {
    const { state } = this.props.navigation;
    const { routes } = state;
    this.props.jumpTo(routes[tabIndex].key);
  }

  getActiveTintColor = currentIndex => {
    return 0 === currentIndex;
  };

  render() {
    const { navigation } = this.props;
    const currentIndex = navigation.state.index;

    return (
      <View
        style={{
          backgroundColor: "transparent",
          backfaceVisibility: "visible"
        }}
      >
        <View style={styles.container}>
          {tabIcons.map((element, index) => (
            <Ripple
              rippleCentered
              rippleOpacity={1}
              rippleContainerBorderRadius={20}
              rippleColor={colors.primary}
              onPress={this.openTab.bind(this, index)}
            >
              <View style={styles.tabContainer}>
                <Icon
                  {...element.iconProps}
                  size={25}
                  color={currentIndex === index ? colors.primary : "#707070"}
                />
                <Text
                  style={[
                    styles.tabLabelStyle,
                    currentIndex === index && { color: colors.primary }
                  ]}
                >
                  {element.label}
                </Text>
              </View>
            </Ripple>
          ))}
        </View>
        <Image
          source={require("assets/tab_bg.png")}
          style={{
            zIndex: -100,
            height: 75,
            right: 0,
            position: "absolute",
            bottom: 0,
            left: -10,
            width: deviceWidth * 3
          }}
          resizeMode="stretch"
        />
      </View>
    );
  }
}

export default CustomTabbar;
