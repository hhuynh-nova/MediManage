//import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
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
  const phoneIcon = () => <Ionicons name={"call"} size={40} color={"white"} />;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 50,
      }}
    >
      <SwipeButton
        onSwipeSuccess={() => Call()}
        thumbIconComponent={phoneIcon}
        height={70}
        width={375}
        title="Emergency Services"
        railBackgroundColor="#dedede"
        railFillBackgroundColor="#949494"
        railFillBorderColor="#949494"
        thumbIconBackgroundColor="#ff8400"
        thumbIconBorderColor="#ff8400"
      />
    </View>
  );
}

function Call() {
  const debug = false; // does not call phone number in debug mode

  const args = {
    number: "9085147186",
    prompt: false, // Optional boolean property. Determines if the user should be prompt prior to the call
  };

  if (debug != true) {
    call(args).catch(console.error);
  }
  console.log("Calling Emergency Services...");
}

function MedicationsScreen({ navigation }) {
  var medCards = [];

  for (let i = 0; i < 1; i++) {
    medCards.push(
      <View style={styles.card}>
        <Card onPress={() => console.log("Edit Pressed")}>
          <Card.Content>
            <Title>Vitamin</Title>
            <Paragraph>Daily</Paragraph>
          </Card.Content>
        </Card>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>{medCards}</ScrollView>
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

function MedicationForm({ navigation }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    SetMedicationInfo(data);
    navigation.goBack();
  };
  //const onSubmit = (data) => SetMedicationInfo(data);
  //   AsyncStorage.setItem('DataDict', data)
  //   console.log(data)
  // };

  return (
    <View>
      <Text></Text>
      <Text style={styles.title}>NEW MEDICATION</Text>
      <Text></Text>
      <Text></Text>
      <Text style={styles.label}>Medication:</Text>
      {errors.Medication && <Text>Medication Name is required.</Text>}
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name="Medication"
        rules={{ required: true }}
        defaultValue=""
      />
      <Text style={styles.label}>Perscribing Doctor:</Text>
      {errors.doctorName && <Text>Perscribing doctor is required.</Text>}
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name="doctorName"
        rules={{ required: true }}
        defaultValue=""
      />

      <Text style={styles.label}>Dose:</Text>
      {errors.dose && <Text>Dose is required.</Text>}
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name="dose"
        rules={{ required: true }}
        defaultValue=""
      />

      <Text style={styles.label}>Time:</Text>
      {errors.Time && <Text>Time is required.</Text>}
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name="Time"
        rules={{ required: true }}
        defaultValue=""
      />

      <Text style={styles.label}>Refill Date:</Text>
      {errors.Refill && <Text>Refill Date is required.</Text>}
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name="Refill"
        rules={{ required: true }}
        defaultValue=""
      />

      <Text style={styles.label}>Pharmacy:</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name="Parma"
        defaultValue=""
      />

      <Text style={styles.label}>Notes:</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
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

var aptFinalCards = [];

async function AppointmentCardList() {
  for (let i = 1; i <= cardNum; i++) {
    var apptCardNum = "AppointmentDataDict" + i;
    apptCardNum = JSON.stringify(apptCardNum);
    await AsyncStorage.getItem(apptCardNum).then((res) => {
      var data = JSON.parse(res);
      console.log(data);
      console.log(data["Doctor"]);
      aptFinalCards.push(
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
}

var cardNum = 6; //Globar varible to keep track of the number of cards

//Appt screen/apptList with come fron appt stack nav always be the intial contents
//Appt form will be pushed to stacked when + is pressed
function AppointmentsScreen({ navigation }) {
  const [count, setCount] = useState(0);
  const [aptCards, setCards] = useState([]);

  useEffect(() => {
    console.log("Refresh");
    setCards(aptFinalCards);
    console.log(aptCards);
  }, [count]);

  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>{aptCards}</ScrollView>
      <Button
        title="Refresh"
        onPress={() => {
          setCount(count + 1);
          AppointmentCardList();
        }}
      >
        Refresh
      </Button>

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
      <Text style={styles.title}>NEW APPOINTMENT</Text>
      <Text></Text>
      <Text></Text>
      <Text style={styles.label}>Doctor:</Text>
      {errors.doctorName && <Text>Doctor Name is required.</Text>}
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name="doctorName"
        rules={{ required: true }}
        defaultValue=""
      />

      <Text style={styles.label}>Field / Specialty:</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name="Specialty"
        defaultValue=""
      />

      <Text style={styles.label}>Date of Upcoming Appointment:</Text>
      {errors.Date && <Text>Date is required.</Text>}
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name="Date"
        rules={{ required: true }}
        defaultValue=""
      />

      <Text style={styles.label}>Time:</Text>
      {errors.Time && <Text>Time is required.</Text>}
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name="Time"
        rules={{ required: true }}
        defaultValue=""
      />

      <Text style={styles.label}>Location:</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name="Location"
        defaultValue=""
      />

      <Text style={styles.label}>Phone:</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name="Phone"
        defaultValue=""
      />

      <Text style={styles.label}>Notes:</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name="Notes"
        defaultValue=""
      />

      <Button
        title="Save"
        onPress={handleSubmit(onSubmit)}
        style={styles.buttonContainer}
      />
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
        name="Appointments"
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
  input: {
    color: "black",
    fontSize: 15,
    borderColor: "black",
    borderWidth: 1,
  },
  label: {
    color: "red",
    fontSize: 20,
    fontWeight: "bold",
  },
  title: {
    color: "red",
    fontSize: 30,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "red",
    borderRadius: 10,
    paddingVertical: 10,
  },
});
