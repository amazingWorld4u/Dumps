import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import {
  createStackNavigator,
  createSwitchNavigator,
  createMaterialTopTabNavigator,
  createBottomTabNavigator,
  createAppContainer
} from "react-navigation";
import { Button, ThemeProvider } from "react-native-elements";
import { colors, theme } from "styles";

/*-----app state manage-----*/
import { Provider } from "react-redux";
import createStore from "../redux/store";

//Components.
import Boot from "../Boot";
import Login from "screens/Login";
//Top tabs.
import Questions from "screens/main/Questions";
import JumpTo from "screens/main/JumpTo";
import Description from "screens/main/Description";
//Bottom tabs.
import Home from "screens/main/home";
import MyBooking from "screens/main/my_booking";
import HelpCenter from "screens/main/help_center";
import Profile from "screens/main/profile";
import TabBar from "./TabBar";

//Common configuration.
const commonConfig = {
  defaultNavigationOptions: {
    header: null
  }
};

/*===========( Auth Stack )============*/
const AuthStack = createStackNavigator(
  {
    Login
  },
  {
    ...commonConfig
  }
);

/*=============( Top Tabs )==============*/
const TopTabs = createMaterialTopTabNavigator(
  {
    Questions,
    JumpTo,
    Description
  },
  {
    tabBarOptions: {
      style: {
        backgroundColor: colors.primary
      },
      indicatorStyle: {
        backgroundColor: "red"
      }
    }
  }
);

/*=============( Bottom Tabs )==============*/
const BottomTabs = createBottomTabNavigator(
  {
    Home,
    MyBooking,
    HelpCenter,
    Profile
  },
  {
    tabBarComponent: TabBar
  }
);

/*===========( Main Stack )============*/
const MainStack = createStackNavigator(
  {
    Main: BottomTabs,
    TopTabs
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);

/*===========( Switch Stack )============*/
const SwtichStack = createSwitchNavigator({
  Boot,
  AuthStack,
  MainStack
});

const Route = createAppContainer(SwtichStack);

export default class Router extends React.Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary }}>
        <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
        <Provider store={createStore}>
          <ThemeProvider theme={theme}>
            <Route />
          </ThemeProvider>
        </Provider>
      </SafeAreaView>
    );
  }
}
