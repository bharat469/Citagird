import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import { Primary } from '../../../data/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const RadioBtn = props => {
  const [click, setClick] = useState(props.default ? props.default : 'Male');

  return (
    <View style={styles.RadioBtnContainer}>
      {props.RadioArray.map(res => {
        return (
          <View key={res.key} style={styles.radioContainer}>
            <TouchableOpacity
              style={styles.radioCircle}
              onPress={() => {
                setClick(res.key);
                console.log('obj', res.key);
              }}
            >
              {click === res.key && <View style={styles.selectedRb} />}
            </TouchableOpacity>
            <Text style={styles.radioText}>{res.label}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default RadioBtn;

const styles = StyleSheet.create({
  RadioBtnContainer: {
    flexDirection: 'row',
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    bottom: hp('4%'),
    margin: 6,
    justifyContent: 'space-between',
  },
  radioText: {
    fontSize: hp('2%'),
    color: '#000',
    fontWeight: '700',
  },
  radioCircle: {
    height: hp('3%'),
    width: wp('6%'),
    borderRadius: 100,
    borderWidth: 2,
    borderColor: Primary,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 12,
  },
  selectedRb: {
    width: wp('3%'),
    height: hp('1.5%'),
    borderRadius: 50,
    backgroundColor: '#000',
  },
});