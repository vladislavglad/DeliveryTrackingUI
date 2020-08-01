import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Header,Colors} from 'react-native/Libraries/NewAppScreen';

export default function App() {
  return (
    <>
      <Header />
      <View style={styles.body}>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Step One</Text>
          <Text style={styles.sectionDescription}>
            Write <Text style={styles.highlight}>"Hello World!"</Text> program 
            to test that everything is set up correctly.
          </Text>
        </View>
      </View>
      <View style={styles.body}>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Step Two</Text>
          <Text style={styles.sectionDescription}>
            Import your App!
          </Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
});