import React from 'react';
import { View, Text, StatusBar, StyleSheet } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation-tabs';
import Constants from 'expo-constants';

// Mock Screen should be replace by a real component
const Home = () => (<Text>Home</Text>)
const SecondScreen = () => (<Text>Second Screen</Text>)

// Some colors to adjust the look and feel of the navigation tabs to the os
const purple = "#673AB7"
const white = "#FFFFFF"


// Config Object
const tabObject = {
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: 'Home  '
    }
  },
  SecondScreen: {
    screen: SecondScreen,
    navigationOptions: {
      tabBarLabel: 'SecondScreen'
    }
  }
};

//Config Options (mostly style)
const options = {
  navigationOptions: {
    headers: null,
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowRadius: 6,
      shadowOpacity: 1,
      showIcon: true,
      padding: 10,
    },
  },
};

// Create Tabs Component
const Tabs =
  createAppContainer(
    Platform.OS === 'ios' ?
      createBottomTabNavigator(tabObject, options)
      :
      createMaterialTopTabNavigator(tabObject, options)
  );


// Tabs are rendered in a app container, usually under a stack
const Stack =
  createAppContainer(
    createStackNavigator({
      Home: {
        screen: Tabs,
        header: null,
        navigationOptions: {
          headerShown: false,
          title: null,
          headerBackTitle: null
        },
      }
    })
  );

// Simple app view with the stack
class App extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        {/* Add a component just for the background color we need */}
        <View style={styles.statusBar} />
        <View style={{ flex: 1 }}>
          {/* Even though the status bar is being set expo doesn't respect the backgroud color */}
          {/* If we change the barstyle from light-content to dark-content we can see that the icons */}
          {/* do change colors */}
          <StatusBar
            barStyle="light-content"
            translucent={true}
          />
          <Stack />
        </View>
      </View>
    );
  };
};

const styles = StyleSheet.create({
  // add a style for the status  bar
  statusBar: {
    backgroundColor: "#00BCD4",
    height: Constants.statusBarHeight,
  },
});

export default App;