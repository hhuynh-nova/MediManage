//import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Button,
  TextInput,
  StatusBar,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { FAB, Card, Title, Paragraph } from "react-native-paper";
import call from "react-native-phone-call";
import SwipeButton from "rn-swipe-button";
import { useForm, Controller } from "react-hook-form";
import { startDetecting } from "react-native/Libraries/Utilities/PixelRatio";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationEvents } from "react-navigation";
//create function that returns a stack nav ( first content is the appt cards )

function HomeScreen() {
  const defaultStatusMessage = "swipe status appears here";

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <SwipeButton height={75} width={375} onSwipeSuccess={() => Call()} />

      <Text>Home!</Text>
    </View>
  );
}

function Call() {
  console.log("Called 911!");
  /*
    const args = {
        number: '9085147186',
        prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call 
      }
    
    call(args).catch(console.error);
    */
}

function MedicationsScreen({ navigation }) {
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
        onPress={() => navigation.navigate("Add a New Medication")}
      />
    </SafeAreaView>
  );
}

function SetMedicationInfo(data) {
  data = JSON.stringify(data);
  AsyncStorage.setItem("DataDict", data);
  console.log(data);
  // data is datatype ReadableNativeMap
}

function MedicationForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => SetMedicationInfo(data);
  //   AsyncStorage.setItem('DataDict', data)
  //   console.log(data)
  // };

  return (
    <View>
      <Text></Text>
      <Text>NEW MEDICATION</Text>
      <Text></Text>
      <Text></Text>
      <Text>Medication:</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.container2}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name="Medication"
        defaultValue=""
      />
      <Text>Perscribing Doctor:</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.container2}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name="Doctor"
        rules={{ required: true }}
        defaultValue=""
      />
      {errors.doctorName && <Text>This is required.</Text>}

      <Text>Dose:</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.container2}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name="Dose"
        defaultValue=""
      />

      <Text>Time:</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.container2}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name="Time"
        rules={{ required: true }}
        defaultValue=""
      />
      {errors.Date && <Text>This is required.</Text>}

      <Text>Refill Date:</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.container2}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name="Refill"
        rules={{ required: true }}
        defaultValue=""
      />
      {errors.Refill && <Text>This is required.</Text>}

      <Text>Pharmacy:</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.container2}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name="Parma"
        defaultValue=""
      />

      <Text>Notes:</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.container2}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name="Notes"
        defaultValue=""
      />

      <Button title="Save" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

var cardNum = 0; //Globar varible to keep track of the number of cards

//Appt screen/apptList with come fron appt stack nav always be the intial contents
//Appt form will be pushed to stacked when + is pressed
function AppointmentsScreen({ navigation }) {
  var aptCards = [];
  var data;
  //const {navigate} = this.props.navigation;

  for (let i = 1; i <= 6; i++) {
    var apptCardNum = "AppointmentDataDict" + i;
    apptCardNum = JSON.stringify(apptCardNum);
    AsyncStorage.getItem(apptCardNum).then((res) => {
      data = JSON.parse(res);
      console.log(data);
      console.log(data["Doctor"]);
      aptCards.push(
        <View style={styles.card}>
          <Card onPress={() => console.log("Edit Pressed")}>
            <Card.Content>
              <Title>{data["Doctor"]}</Title>
              <Paragraph>{data["Date"]}</Paragraph>
            </Card.Content>
          </Card>
        </View>
      );
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ marginTop: 28 }}>{aptCards}</ScrollView>
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate("Add a New Appointment")}
        //push to stack and go to appt form screen
      />
    </SafeAreaView>
  );
}

async function SetAppointmentInfo(data) {
  //const [data] = AppointmentForm();  //'data' is containing the view of the form
  cardNum++;
  data = JSON.stringify(data);
  var apptCardNum = "AppointmentDataDict" + cardNum;
  apptCardNum = JSON.stringify(apptCardNum);
  await AsyncStorage.setItem(apptCardNum, data);
  console.log(data);
  // data is datatype ReadableNativeMap
}

function AppointmentForm({ navigation }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    SetAppointmentInfo(data);
    navigation.goBack();
  };

  return (
    //<Button title="Save" onPress={ () => Navigation.goBack() }/>
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
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name="Doctor"
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
            onChangeText={(value) => onChange(value)}
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
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name="Date"
        rules={{ required: true }}
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
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name="Time"
        rules={{ required: true }}
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
            onChangeText={(value) => onChange(value)}
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
            onChangeText={(value) => onChange(value)}
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
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name="Notes"
        defaultValue=""
      />

      <Button title="Save" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

const Tab = createBottomTabNavigator();
const AppointmentStack = createStackNavigator();
const MedicationStack = createStackNavigator();

function AppointmentStackSetUp() {
  return (
    <AppointmentStack.Navigator initialRouteName="AppointmentCards">
      <AppointmentStack.Screen
        name="AppointmentCards"
        component={AppointmentsScreen}
      />
      <AppointmentStack.Screen
        name="Add a New Appointment"
        component={AppointmentForm}
      />
    </AppointmentStack.Navigator>
  );
}

function MedicationStackSetUp() {
  return (
    <MedicationStack.Navigator initialRouteName="Medications">
      <MedicationStack.Screen
        name="Medications"
        component={MedicationsScreen}
      />
      <MedicationStack.Screen
        name="Add a New Medication"
        component={MedicationForm}
      />
    </MedicationStack.Navigator>
  );
}

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
        <Tab.Screen name="Medications" component={MedicationStackSetUp} />
        <Tab.Screen name="Appointments" component={AppointmentStackSetUp} />
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
    backgroundColor: "lightgray",
    margin: 30,
    borderRadius: 20,
  },
});
