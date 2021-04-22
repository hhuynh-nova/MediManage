import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Button, TextInput } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { FAB, Card, Title, Paragraph } from "react-native-paper";
import call from "react-native-phone-call";
import SwipeButton from "rn-swipe-button";
import { useForm, Controller } from "react-hook-form";

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home!</Text>
      <View style={styles.buttonContainer}>
        <Button onPress={() => { this.Call() }} style={{ borderWidth: 1 }} title="Call 911" />
      </View>
    </View>
  );
}

function Call() {
    console.log("Call called");
    const args = {
        number: '9085147186',
        prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call 
      }
    
    call(args).catch(console.error);
}

function MedicationsScreen() {
  var medCards = [];

  for (let i = 0; i < 10; i++) {
    medCards.push(
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
      <ScrollView style={{ marginTop: 28 }}>{medCards}</ScrollView>
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => console.log("Fab Pressed")}
      />
    </SafeAreaView>
  );
}

function MedicationForm() {
  const { 
    control, 
    handleSubmit, 
    formState: { errors } 
  } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <View>
      <Text></Text>
      <Text>NEW MEDICATION </Text>
      <Text></Text>
      <Text></Text>
      <Text>Medication:</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.container2}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
        name="medication"
        rules={{ required: true }}
        defaultValue=""
      />
      {errors.PerscriptionName && <Text>This is required.</Text>}

      <Text>Perscribing Doctor:</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.container2}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
        name="pDoctor"
        defaultValue=""
      />

      <Text>Dose:</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.container2}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
        name="Dose"
        defaultValue=""
      />
      {errors.Dose && <Text>This is required.</Text>}

      <Text>When to take medication:</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.container2}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
        name="Time"
        defaultValue=""
      />
      {errors.Time && <Text>This is required.</Text>}

      <Text>Instructions:</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.container2}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
        name="instructions"
        defaultValue=""
      />

      <Text>Refill Date:</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.container2}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
        name="refill"
        defaultValue=""
      />

      <Text>Notes:</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.container2}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
        name="Notes"
        defaultValue=""
      />

      <Button title="Save" onPress={
        handleSubmit(onSubmit)
        } />
    </View>
  );
}

function CreateAppointmentsCard(aptCards) {
  aptCards.push(
    <View style={styles.card}>
      <Card onPress={() => console.log("Edit Pressed")}>
        <Card.Content>
          <Title>Appointment 0</Title>
          <Paragraph>Content</Paragraph>
        </Card.Content>
      </Card>
    </View>
  );
}

function AppointmentsScreen() {
  var aptCards = [];

  for (let i = 0; i < 10; i++) {
    aptCards.push(
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
      <ScrollView style={{ marginTop: 28 }}>{aptCards}</ScrollView>
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => CreateAppointmentsCard(aptCards)}
      />
    </SafeAreaView>
  );
}

function AppointmentForm() {
  const { 
    control, 
    handleSubmit, 
    formState: { errors } 
  } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <View>
      <Text></Text>
      <Text>NEW APPOINTMENT</Text>
      <Text></Text>
      <Text></Text>
      <Text>Doctor:</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.container2}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
        name="doctor"
        rules={{ required: true }}
        defaultValue=""
      />
      {errors.doctorName && <Text>This is required.</Text>}

      <Text>Field / Specialty:</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.container2}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
        name="Specialty"
        defaultValue=""
      />

      <Text>Date of Upcoming Appointment:</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.container2}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
        name="Date"
        defaultValue=""
      />
      {errors.Date && <Text>This is required.</Text>}

      <Text>Time:</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.container2}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
        name="Time"
        defaultValue=""
      />
      {errors.Time && <Text>This is required.</Text>}

      <Text>Location:</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.container2}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
        name="Location"
        defaultValue=""
      />

      <Text>Phone:</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.container2}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
        name="Phone"
        defaultValue=""
      />

      <Text>Notes:</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.container2}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
        name="Notes"
        defaultValue=""
      />

      <Button title="Save" onPress={
        handleSubmit(onSubmit)
        } />
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
  buttonContainer: {
    backgroundColor: 'lightgray',
    margin: 30,
    borderRadius: 20,
  },
});
