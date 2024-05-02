import React from 'react';
import Application from './src/app';
import 'react-native-gesture-handler';
import {SafeAreaProvider} from "react-native-safe-area-context";

export default function App() {
    return (
        <SafeAreaProvider style={{flex: 1}}>
            <Application />
        </SafeAreaProvider>
    );
}
