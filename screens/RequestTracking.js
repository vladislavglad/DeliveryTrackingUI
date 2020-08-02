import React from 'react';
import { StyleSheet, Text, View, Button, Alert, ScrollView, TextInput } from 'react-native';
import PushNotification from 'react-native-push-notification';
//import { TextInput } from 'react-native-gesture-handler'; // What's the difference with React's own?

const API = "http://localhost:3000/requestTracking";
let registrationToken = {}; // Holds value of user's device token.

export default function RequestTracking( {navigation} ) {
    
    const [getUserName, setUserName] = React.useState("");
    const [getEmail, setEmail] = React.useState("");
    const [getTrackingNum, setTrackingNum] = React.useState("");

    return (
        <ScrollView>
        <View style={styles.container}>
        
            {/* TODO: Make these into a separate component */}
            <View>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>Your Name</Text>            
                </View>
                <TextInput style={styles.textInput}
                    placeholder="John Doe"
                    value = {getUserName}
                    onChangeText = {name => setUserName(name)}
                />
            </View>
            <View>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>Email Address</Text>            
                </View>
                <TextInput style={styles.textInput}
                    placeholder="johndoe@mail.com"
                    value = {getEmail}
                    onChangeText = {email => setEmail(email)}
                />
            </View>
            <View>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>Tracking Number</Text>            
                </View>
                <TextInput style={styles.textInput}
                    placeholder="9300100000000000000000"
                    value = {getTrackingNum}
                    onChangeText = {num => setTrackingNum(num)}
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button 
                    onPress={() => {
                        // console.log(registrationToken);
                        sendRequest(getUserName, getEmail, getTrackingNum, registrationToken);
                    }}
                    title = "Submit"
                />
            </View>
        </View>
        </ScrollView>
  );

}

async function sendRequest(username, email, trackingNum, token) {

    const data = {
        username,
        email,
        trackingNum, // The only field that is really required!
        token // Auto generated and passed to the server.
    };
    //console.log(data.username, data.email, data.trackingNum);

    if (data.trackingNum === "") {
        Alert.alert("Error:", "Please provide a tracking number!");
        return;
    } else if (data.trackingNum.length < 10) { // Length should be at least 10.
        Alert.alert("Error:", "Your tracking number is invalid!");
        return;
    }

    try {
        const res = await fetch(API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        const serverResponse = await res.json();
        //console.log(serverResponse);

        if (serverResponse.msg === "Recieved successfully!")
            Alert.alert("Success:", "Your request has been processed!");
        else if (serverResponse.msg === "Bad/invalid request!")  
            Alert.alert("Error:", "You provided invalid information!\n\nPlease Try again.");
        else // Causes crashing (if not careful) with Java Exception: UnexpectedNativeTypeException.
            Alert.alert("Error:", serverResponse.msg);

    } catch (err) {
        //console.log(err);
        Alert.alert("Error:" , "Server is not responding!\nPlease try again leter.");
    }

}

PushNotification.configure({
    // Called when Token is generated.
    onRegister: function (token) {
        console.log("TOKEN:", token);
        setRegistrationToken(token.token);
    },
  
    // Called when a notification is opened.
    onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
    },
    permissions: {
        alert: true,
        badge: true,
        sound: true,
    },
    popInitialNotification: true,
    requestPermissions: true,
});

function setRegistrationToken(token) {
    registrationToken = token; 
}

const styles = StyleSheet.create({
    container: {
      flexDirection: "column",
      justifyContent: "center"
    },
    buttonContainer: {
        marginTop: 35,
        flexDirection: "column",
        margin: 15,
    },
    textContainer: {
        flexDirection: "row",
        margin: 20,
        justifyContent: "center"
    },
    text: {
      fontSize: 18,
      marginTop: 20,
      textAlign: "center"
    },
    textInput: {
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1, 
        textAlign: "center"
    }
  });