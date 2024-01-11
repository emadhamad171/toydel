import { StatusBar } from 'expo-status-bar';
import {StyleSheet, View} from 'react-native';
import Authorization from "./src/screens/Authorization";
import {useEffect, useState} from "react";
import * as firebase_auth from "firebase/auth";
import Toast from "react-native-toast-message";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "./src/firebase";

export default function App() {
  const [user, setUser] = useState<firebase_auth.User>();
    useEffect(() => {
        onAuthStateChanged(auth, (userInstance) => {
            !!userInstance && setUser(userInstance);
            !!userInstance && Toast.show({type: 'success', text1:'Log in successfully!'});
        });
    }, []);

  return (
      <View style={styles.container}>
          {!user && <Authorization />}
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
