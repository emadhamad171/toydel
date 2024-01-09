import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Authorization from "./src/screens/Authorization";
import {useState} from "react";
import * as firebase_auth from "firebase/auth";
import Toast from "react-native-toast-message";

export default function App() {
  const [userCred, setUserCred] = useState<firebase_auth.UserCredential>();
  return (
      <View style={styles.container}>
        {!!!userCred && <Authorization setUserCred={setUserCred}/>}
        <Text>Welcome!</Text>
        <StatusBar style="auto" />
        <Toast />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
