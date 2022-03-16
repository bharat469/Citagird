import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Keyboard
} from 'react-native';
import React, {useState} from 'react';
import {Avatar} from 'react-native-elements';
import {Profile} from '../../data/svgImages';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Primary} from '../../data/colors';
import ImagePicker from 'react-native-image-crop-picker';
import ReactNativeModal from 'react-native-modal';
import {SafeAreaView} from 'react-native-safe-area-context';
import Input from '../../helpers/props/input/input';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import RadioBtn from '../../helpers/props/radioBtn/RadioBtn';
import Button from '../../helpers/props/button';
import moment from 'moment';
import { Link } from '../../data/Links';

const ProfileData = ({navigation, route}) => {
  const [image, setImage] = useState('');
  const [visible, setVisible] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState('');

  const close = () => {
    setVisible(false);
  };
  const open = () => {
    setVisible(true);
  };

  const chooseImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        console.log(image);
        setImage(image.path);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        console.log(image);
        setImage(image.path);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
   
    hideDatePicker();
    setDate(moment(date).format('Do MMMM YYYY'));
  };

  const {location} = route.params;

  const gender = [{id: 0, key: 'Male', label: 'Male'},{id:1,key:'female',label:'female'}];

  return (
    <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>

    <View style={styles.profileContainer}>
      <View style={styles.profileTop}>
        <Text style={styles.profileHead}>Complete your profile</Text>
        <View>
          <Avatar
            size={164}
            rounded
            containerStyle={{backgroundColor: Primary}}
            source={{
              uri:image?image:Link
            }}></Avatar>
          <TouchableOpacity style={styles.headerCamera} onPress={open}>
            <Entypo name="camera" size={24} />
          </TouchableOpacity>
        </View>
        <ScrollView>
          <Input label="First Name" Placeholder="Eg Michael" />
          <Input label="Last Name" Placeholder="Eg Jordon" />
          <View>
            <Text style={styles.label}>DOB</Text>
            <TouchableOpacity
              style={styles.textInputStyle}
              onPress={showDatePicker}>
              <Text style={styles.DateText}>{date ? date : '04/04/1991'}</Text>
              <FontAwesome name="calendar" size={24} color={Primary} />
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </View>
          <View style={{top:hp('4%'),alignItems:'center'}}>
          <RadioBtn RadioArray={gender} default={'Male'} />
            </View>
        </ScrollView>
        <Button buttonText="Save" buttonSize={{width:wp('80%')}} onPress={()=>navigation.navigate('HomeScreen',{
          location,
          image
        })} />
      </View>
      <ReactNativeModal
        isVisible={visible}
        onBackdropPress={close}
        onBackButtonPress={close}
        style={{justifyContent: 'flex-end', margin: 0}}>
        <SafeAreaView style={styles.options}>
          <Pressable style={styles.Picker} onPress={openCamera}>
            <Entypo name="camera" size={34} />
            <Text style={styles.textPicker}>Camera</Text>
          </Pressable>
          <Pressable style={styles.Picker} onPress={chooseImage}>
            <Entypo name="folder-images" size={34} />
            <Text style={styles.textPicker}>Library</Text>
          </Pressable>
        </SafeAreaView>
      </ReactNativeModal>
    </View>
    </TouchableWithoutFeedback>
  );
};

export default ProfileData;

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileTop: {
    top: hp('3%'),
    alignItems: 'center',
  },
  profileHead: {
    fontSize: hp('2.2%'),
    padding: 12,
    fontWeight: '700',
  },
  headerCamera: {
    bottom: hp('5.4%'),
    alignItems: 'center',
    right: hp('1.4%'),
    backgroundColor: '#A5A5A5',
    width: wp('12%'),
    padding: 12,
    borderRadius: 50,
    left: wp('25%'),
  },
  options: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  Picker: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  TextPicker: {
    fontSize: hp('2%'),
    color: '#000',
    padding: 12,
  },
  inputStyle: {
    padding: 12,
    borderWidth: 1,
    borderColor: Primary,
    width: wp('85%'),
    borderRadius: 12,
    fontSize: hp('2%'),
    margin: 12,
  },
  label: {
    fontSize: hp('2%'),
    padding: 12,
    color: '#000',
  },
  textInputStyle: {
    padding: 12,
    borderWidth: 1,
    borderColor: Primary,
    width: wp('85%'),
    borderRadius: 12,
    flexDirection: 'row',
    margin: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  DateText: {
    fontSize: hp('2%'),
    color: '#000',
  },
});
