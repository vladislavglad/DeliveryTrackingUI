import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import PushNotification from "react-native-push-notification"

// Custom componenets...
import Title from "../components/Title"

export default function HomeScreen( {navigation} ) {

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>What would you like to do?</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button 
          onPress={ () => {
            navigation.navigate("requestScreen", {msg: "Passing msg to request Delivery!"});
          }}
          title = "Request Tracking"
        />
      </View>
      <View style={styles.buttonContainer}>
      <Button 
          onPress={ () => {
            navigation.navigate("checkScreen", {msg: "Passing msg to check Delivery!"});
          }}
          title = "Check Status"
        />
        
      <Text style={styles.text}>Test Local Notifications:</Text>
      </View>
      <View style={styles.buttonContainer}>
      <Button 
          onPress={ () => {
            PushNotification.localNotification({
              title: "Delivery Tracking", 
              message: "Your package has been delivered!"
            });
          }}
          title = "Notify Me!"
        />
      </View>
      <View style={styles.buttonContainer}>
      <Button 
          onPress={ () => {
            PushNotification.localNotificationSchedule({
              message: "Your package has been delivered!",
              date: new Date(Date.now() + 30 * 1000)
            });
          }}
          title = "Schedule Notification!"
        />
      </View>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center"
  },
  buttonContainer: {
    flexDirection: "column",
    margin: 15,
  },
  textContainer: {
    flexDirection: "row",
    margin: 20,
    justifyContent: "center"
  },
  text: {
    fontSize: 20,
    marginTop: 20,
    textAlign: "center"
  }
});
