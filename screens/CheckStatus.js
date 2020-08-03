import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert} from 'react-native';

const API = "http://localhost:3000/checkStatus/:trackingNum";

export default function CheckStatus( {navigation} ) {

  const [text, onChangeText] = React.useState("");

  const processRequest = async (trackingNum) => {
    console.log("Provided tracking num: " + trackingNum);

    // Some basic client-side validation (before bothering server).
    if (trackingNum === "") {
      Alert.alert("Error:", "Please provide a tracking number!");
      return;
    } else if (trackingNum.length < 10) { // Length should be at least 10.
      Alert.alert("Error:", "Your tracking number is invalid!");
      return;
    }

    try {
      const res = await fetch(API.replace(":trackingNum", trackingNum));
      const data = await res.json();
      Alert.alert("Message:", data.msg);

    } catch(err) {
      //console.log(err);
      Alert.alert("Error:", "Server is not responding!");
    }

  }

  return (
    <View>
      <View style={styles.textContainer}>
        <Text styel={styles.text}>Please provide your tracking number!</Text>
      </View>
      <TextInput
        style={styles.textInput}
        onChangeText={text => onChangeText(text)}
        value={text}
        placeholder="Your Tracking Number"
      />
      <View style={styles.buttonContainer}>
        <Button
          onPress={async () => await processRequest(text)}
          title="Submit"
        />
      </View>
    </View>
  );

}

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: "row",
    margin: 20,
    justifyContent: "center"
  },
  buttonContainer: {
    margin: 20
  },
  textInput: {
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1, 
    textAlign: "center"
  },
  text: {
    textAlign: "center"
  }
});