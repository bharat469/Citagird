import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Primary} from '../../data/colors';
import AntDesign from 'react-native-vector-icons/AntDesign'

const Button = props => {
  return (
    <TouchableOpacity style={[styles.buttonStyle,props.buttonSize]} onPress={props.onPress}>
      <Text style={styles.btnTextStyle}>{props.buttonText}</Text>
     
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  buttonStyle: {
    padding: 16,
    backgroundColor: Primary,
    width: wp('40%'),
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    marginTop:hp('4%'),
    
  },
  btnTextStyle:{
      fontSize:hp('2%'),
      textAlign:'center',
      color:'#fff',
      fontWeight:'bold'
  }
});
