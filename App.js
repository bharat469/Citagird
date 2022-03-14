import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import Navigation from './src/navigation/navigation';

const App=() => {


  return (
    <SafeAreaView style={{flex:1}} >
    <Navigation/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

});

export default App;
