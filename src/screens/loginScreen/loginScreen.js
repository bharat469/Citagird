import {StyleSheet, Text, View, Alert, TouchableOpacity, Keyboard,TouchableWithoutFeedback} from 'react-native';
import React, {useState} from 'react';
import {GoogleLogo, Logo} from '../../data/svgImages';
import PhoneInput from 'react-native-phone-number-input';
import Navigation from '../../navigation/navigation';
import Button from '../../helpers/props/button';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const LoginScreen = ({navigation}) => {
  const [value, setValue] = useState('');
  const [formatted, setFormatted] = useState('');

  const login = () => {
    if (value.length === 10) {
      return navigation.navigate('OtpScreen', {
        number: formatted,
      });
    } else {
      Alert.alert(
        'Invalid Phone Number !!!!!',
        'Please enter valid phone number',
      );
    }
  };

  return (
    <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>

    <View style={styles.loginScreenContainer}>
      <View style={styles.logo}>
        <Logo height={350} width={350} />
      </View>
      <View style={styles.phoneInput}>
        <PhoneInput
          defaultCode="IN"
          defaultValue={value}
          layout="first"
          onChangeText={text => {
            setValue(text);
          }}
          onChangeFormattedText={text => {
            setFormatted(text);
          }}
          withDarkTheme
          withShadow
          autoFocus
        />
        <Button buttonText={`Get Otp `} onPress={login} buttonSize={{width:wp('80%')}} />
      </View>
      <View style={styles.GoogleLogin}>
        <Text style={styles.textLogin}>Or</Text>
        <TouchableOpacity style={styles.loginButton}>
          <GoogleLogo height={40} width={40} />
          <Text style={styles.googleText}>Join with Google</Text>
        </TouchableOpacity>
      </View>
    </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  loginScreenContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logo: {
    alignItems: 'center',
  },
  phoneInput: {
    alignItems: 'center',
  },
  GoogleLogin: {
    alignItems: 'center',
    padding: 12,
  },
  textLogin: {
    fontSize: hp('2%'),
    color: '#686868',
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderWidth: 1,
    padding: 12,
    width: wp('70%'),
    top: hp('3%'),
    borderRadius: 22,
   
    borderColor:'#D8D8D8'
  },
  googleText:{
    fontSize:hp('2%'),
    color:'#2F2F2F'
  }
});
