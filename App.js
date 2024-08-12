// App.js
import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import TodoListScreen from "./screens/TodoListScreen";
import TaskDetailScreen from "./screens/TaskDetailScreen";
import TaskCreationScreen from "./screens/TaskCreationScreen";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();

const App = () => {
  const[fontsLoaded] = useFonts({
    LibreBaskerville: require("./assets/font/LibreBaskerville-Bold.ttf"),
    LibreBaskervilleRegular: require("./assets/font/LibreBaskerville-Regular.ttf"),
    Platypi: require("./assets/font/Platypi-Bold.ttf"),
    DancingScript: require("./assets/font/DancingScript-Bold.ttf"),

  });
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync(); 
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown:false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="TodoList" component={TodoListScreen} />
        <Stack.Screen name="TaskDetail" component={TaskDetailScreen} />
        <Stack.Screen name="TaskCreation" component={TaskCreationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
