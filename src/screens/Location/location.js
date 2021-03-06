import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {Locations} from '../../data/svgImages';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Primary} from '../../data/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import RNLocation from 'react-native-location';
import {API_KEY} from '../../data/apiKey';
import Geocoder from 'react-native-geocoding';
import ReactNativeModal from 'react-native-modal';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const Location = ({navigation}) => {
  const [visible, setVisible] = useState(false);
  const close = () => setVisible(false);
  const open = () => setVisible(true);

  const getLocation = async () => {
    try {
      let location;
      let permission = await RNLocation.checkPermission({
        ios: 'whenInUse',
        android: {
          detail: 'coarse',
        },
      });
      if (!permission) {
        RNLocation.requestPermission({
          ios: 'whenInUse',
          android: {
            detail: 'coarse',
            rationale: {
              message: 'we need to access your location',
              buttonPositive: 'Allow',
              buttonNegative: 'Deny',
            },
          },
        });
      }
      location = await RNLocation.getLatestLocation({timeout: 100});
      console.log(
        'Location Data =>',
        location,
        location.longitude,
        location.latitude,
      );
      Geocoder.init(API_KEY);
      Geocoder.from(location.latitude, location.longitude)
        .then(json => {
          var addressComponent = json.results[0].formatted_address;
          var cityComponent = json.results[0].address_components[3].long_name;
          {
            addressComponent ? (
              navigation.navigate('ProfileData', {
                location: cityComponent,
              })
            ) : (
              <ActivityIndicator size="large" />
            );
          }
        })
        .catch(error => console.log('error......', error));
    } catch (error) {
      console.log(error);
      alert('we are unable to fetch your location please select below');
    }
  };

  const placeholder = data => {
    close();
    navigation.navigate('ProfileData', {
      location: data.description,
    });
  };

  return (
    <View style={styles.locationContainer}>
      <View style={styles.locationImage}>
        <Locations />
        <Text style={styles.textDark}>
          Allow us permission to access your location
        </Text>
        <Text style={styles.textLight}>
          This will help us to find the best doctors around you for consultation
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.LocationBtn, styles.currentLocation]}
          onPress={() => getLocation()}>
          <Entypo name="location" size={29} color="#fff" />
          <Text style={[styles.locationText, {color: '#fff', marginLeft: 12}]}>
            Get Current location
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.LocationBtn]} onPress={open}>
          <Text style={[styles.locationText, {color: Primary}]}>
            Enter Location Manually
          </Text>
        </TouchableOpacity>
      </View>
      <ReactNativeModal
        isVisible={visible}
        onBackButtonPress={close}
        onBackdropPress={close}
        style={{justifyContent: 'flex-end', margin: 0}}>
        <View style={styles.searchContainer}>
          <TouchableOpacity style={styles.cross} onPress={close}>
            <Text style={styles.crossText}>X</Text>
          </TouchableOpacity>
          <View style={styles.searchBar}>
            <Text style={styles.textLocation}>Select your location</Text>
            <View style={styles.searchView}>
              <FontAwesome name="search" size={24} color={Primary} />
              <GooglePlacesAutocomplete
                placeholder="Search"
                onPress={(data, details = null) => {
                  placeholder(data);
                }}
                query={{
                  key: API_KEY,
                  language: 'en',
                }}
                styles={{
                  textInput: {
                    padding: 12,
                    height: 35,
                    fontSize: hp('2%'),
                  },
                }}
              />
            </View>

            <TouchableOpacity
              style={styles.LocationBtn}
              onPress={() => getLocation()}>
              <Entypo name="location" size={29} color={Primary} />
              <Text
                style={[styles.locationText, {color: Primary, marginLeft: 12}]}>
                Get Current location
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ReactNativeModal>
    </View>
  );
};

export default Location;

const styles = StyleSheet.create({
  locationContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  locationImage: {
    top: hp('7%'),
    alignItems: 'center',
  },
  textDark: {
    padding: 12,
    fontSize: hp('3%'),
    textAlign: 'center',
    color: '#000',
    fontWeight: '700',
  },
  textLight: {
    padding: 12,
    fontSize: hp('1.9%'),
    textAlign: 'center',
    color: '#686868',
  },
  buttonContainer: {
    top: hp('12%'),
    alignItems: 'center',
  },
  LocationBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    padding: 12,
    borderColor: Primary,
    width: wp('80%'),
    justifyContent: 'center',
    borderRadius: 22,
    margin: 12,
  },
  currentLocation: {
    backgroundColor: Primary,
  },
  locationText: {
    fontSize: hp('2.2%'),

    fontWeight: '700',
  },
  searchContainer: {
    flex: 1,
    top: hp('30%'),
    backgroundColor: '#fff',
    alignItem: 'center',
    borderTopRightRadius:30,
    borderTopLeftRadius:30
  },
  searchBar: {
    width: wp('90%'),

    left: wp('5%'),
  },
  textLocation: {
    padding: 12,
    textAlign: 'center',
    fontSize: hp('2.8%'),
    fontWeight: 'bold',
  },
  searchView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 22,
    borderColor: '#C2C2C2',
    padding: 12,
  },
  cross: {
    bottom: hp('4%'),
    backgroundColor: '#fff',
    width: wp('15%'),
    padding: 22,
    alignItems: 'center',
    borderRadius: 100,
    left: wp('40%'),
  },
  crossText: {
    fontSize: hp('2%'),
    fontWeight: 'bold',
  },
});
