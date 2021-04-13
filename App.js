import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { FAB } from "react-native-paper";

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home!</Text>
      <Text></Text>
      <Text></Text>
    </View>
  );
}

function MedicationsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Medications!</Text>
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => console.log("Pressed")}
      />
    </View>
  );
}

function AppointmentsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Appointments!</Text>
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => console.log("Pressed")}
      />
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === "Home") {
              return (
                <Ionicons
                  name={focused ? "home" : "home-outline"}
                  size={size}
                  color={color}
                />
              );
            } else if (route.name === "Medications") {
              return (
                <Ionicons
                  name={focused ? "medkit" : "medkit-outline"}
                  size={size}
                  color={color}
                />
              );
            } else if (route.name === "Appointments") {
              return (
                <Ionicons
                  name={focused ? "calendar" : "calendar-outline"}
                  size={size}
                  color={color}
                />
              );
            }
          },
        })}
        tabBarOptions={{
          activeTintColor: "red",
          inactiveTintColor: "gray",
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Medications" component={MedicationsScreen} />
        <Tab.Screen name="Appointments" component={AppointmentsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  fab: {
    backgroundColor: "red",
    position: "absolute",
    margin: 20,
    right: 0,
    bottom: 10,
  },
});
