import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AppLoading } from 'expo';
import { Archivo_400Regular, Archivo_700Bold, useFonts } from '@expo-google-fonts/archivo';
import { Poppins_600SemiBold, Poppins_400Regular } from '@expo-google-fonts/poppins';
import AppStack from './src/routes/AppStack';

export default function App() {
  let [fontsLoaded] = useFonts({
    Archivo_400Regular, Archivo_700Bold, Poppins_600SemiBold, Poppins_400Regular,
  });

  if (!fontsLoaded){
    return <AppLoading /> 
  }else{
    return (
      <>
      <AppStack />
      <StatusBar style="light" />
    </>
    );
  }
    
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
