import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';
import {Primary} from '../../../data/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Input = props => {
  return (
    <View>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        placeholder={props.Placeholder}
        style={styles.textInputStyle}
        placeholderTextColor={'#A5A5A5'}
        value={props.value}
        onChangeText={props.onChangeText}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  label: {
    fontSize: hp('2%'),
    padding: 12,
    color:'#000'
  },
  textInputStyle: {
    padding: 12,
    borderWidth: 1,
    borderColor: Primary,
    width: wp('85%'),
    borderRadius:12,
    fontSize:hp('2%'),
    margin:12
  },
});
