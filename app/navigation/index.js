import React from "react";
import { SafeAreaView, StatusBar,StyleSheet,TouchableOpacity ,Text, View } from "react-native";
import {
  createStackNavigator,
  createSwitchNavigator,
  createMaterialTopTabNavigator,
  createBottomTabNavigator,
  createAppContainer,
  createDrawerNavigator,Platform
  
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

 import DHome from '../screens/Drawers/Home/index';
 import About from '../screens/Drawers/About/index';
 import Contact from '../screens/Drawers/Contact/index';
import DrawerScreen from '../screens/Drawers/Common/DrawerScreen';
import { DrawerActions } from 'react-navigation';
import { Icon } from "react-native-elements";
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
  },
  
);


/*=================(side Drawer)===============*/

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});



const MyDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: BottomTabs,
  },
 
},{
    initialRouteName: 'Home',
    contentComponent: DrawerScreen,
    drawerWidth: 300
},
);

const MenuImage = ({navigation}) => {
  if(!navigation.state.isDrawerOpen){
      return <Image source={require('../assets/menu-button.png')}/>
  }else{
      return <Image source={require('../assets/left-arrow.png')}/>
  }
}


const styless = StyleSheet.create({
  container: {
    flex: 1
  },
  icon: {
    paddingLeft: 10
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: 120
  }
});

const navigationOptions = ({ navigation }) => ({
  title: "Exam Dumps",
  headerLeft: (
    <TouchableOpacity  onPress={() => {navigation.dispatch(DrawerActions.toggleDrawer())} }>
    <Icon
      containerStyle={styless.icon}
      type="ionicon"
      name={"md-menu"} navigation={navigation}
    />
     </TouchableOpacity>
  ),
  headerRight: (
    <View style={styless.iconContainer}>
      <Icon type="ionicon" name={ "md-search"} />
      <Icon type="ionicon" name={ "md-heart"} />
      <Icon type="ionicon" name={ "md-more"} />
    </View>
  )
});;
const StackNavigator = createStackNavigator({
  DrawerNavigator:{
      screen: MyDrawerNavigator
  },
  TopTabs: {
    screen: TopTabs,
  }
},{

//   defaultNavigationOptions: {
//     headerStyle: {
//         backgroundColor: '#28F1A6',
//         elevation: 0,
//         shadowOpacity: 0
//     },
//     headerTintColor: '#333333',
//     headerTitleStyle: {
//         fontWeight: 'bold',
//         color: '#ffffff'
//     }
// }

defaultNavigationOptions:navigationOptions

// defaultNavigationOptions:{
//       title: 'ReactNavigation',
//       headerStyle: {
//           backgroundColor: '#ccc',
//       },
//       headerTintColor: '#fff',
//       headerTitleStyle: {
//         fontWeight: 'bold',
//       },
//   }
},
);



// const drawernav = DrawerNavigator({
//   Item1: {
//       screen: stackNav,
//     }
//   }, {
//     contentComponent: SideMenu,
//     drawerWidth: Dimensions.get('window').width - 120,  
// });

// AppRegistry.registerComponent('Demo', () => drawernav);


/*===========( Main Stack )============*/
const MainStack = createStackNavigator(
  {
    Main: BottomTabs,
    TopTabs ,
   // Dashboard: {screen: MyDrawerNavigator}
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
  StackNavigator
},
);

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
