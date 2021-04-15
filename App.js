import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { FAB, Card, Title, Paragraph } from "react-native-paper";

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home!</Text>
    </View>
  );
}

function MedicationsScreen() {
  var cards = [];

  for (let i = 0; i < 10; i++) {
    cards.push(
      <View style={styles.card}>
        <Card onPress={() => console.log("Edit Pressed")}>
          <Card.Content>
            <Title>Medication {i + 1}</Title>
            <Paragraph>Content {i + 1}</Paragraph>
          </Card.Content>
        </Card>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ marginTop: 28 }}>{cards}</ScrollView>
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => console.log("Fab Pressed")}
      />
    </SafeAreaView>
  );
}

function AppointmentsScreen() {
  var cards = [];

  for (let i = 0; i < 10; i++) {
    cards.push(
      <View style={styles.card}>
        <Card onPress={() => console.log("Edit Pressed")}>
          <Card.Content>
            <Title>Appointment {i + 1}</Title>
            <Paragraph>Content {i + 1}</Paragraph>
          </Card.Content>
        </Card>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ marginTop: 28 }}>{cards}</ScrollView>
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => console.log("Fab Pressed")}
      />
    </SafeAreaView>
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
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    flexDirection: "column",
  },
  card: {
    paddingHorizontal: 10,
    paddingTop: 3,
    paddingBottom: 5,
    justifyContent: "flex-start",
    alignSelf: "stretch",
  },
});
