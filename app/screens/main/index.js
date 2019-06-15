import React from "react";
import { createMaterialTopTabNavigator } from "react-navigation";

import Questions from "./Questions";
import JumpTo from "./JumpTo";
import Description from "./Description";

const TopTabs = createMaterialTopTabNavigator({
  Questions,
  JumpTo,
  Description
});

class Main extends React.Component {
  static router = TopTabs;
  render() {
    return <TopTabs navigation={this.props.navigation} />;
  }
}

export default Main;
