import {StyleSheet, Text, TouchableOpacity, View,ActivityIndicator} from 'react-native';
import React,{useState} from 'react';
import {Locations} from '../../data/svgImages';
import Entypo from 'react-native-vector-icons/Entypo';
import {Primary} from '../../data/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import RNLocation from 'react-native-location';
import {API_KEY} from '../../data/apiKey'
import Geocoder from 'react-native-geocoding';



const Location = () => {

 
    const getLocation = async () => {
  
        let location
         let permission = await RNLocation.checkPermission({
           ios:'whenInUse',
           android:{
             detail:'coarse',
             rationale:{
               title:'CitaGird need to access your location',
               message:'We use your location to show where you are on the map',
               buttonPositive:'OK',
               buttonNegative:'Cancel'
             }
           }
         })
         console.log('here2',permission)
       
         location= await RNLocation.getLatestLocation({timeout:100})
         console.log('locataion data =>',location,location.longitude,location.latitude)
       
         Geocoder.init(API_KEY);
           Geocoder.from(location.latitude,location.longitude)
             .then(json => {
               var addressComponent = json.results[0].formatted_address;
               var cityComponent = json.results[0].address_components[3].long_name;
       
            //  {addressComponent?  navigation.replace('Home',{
            //    cityComponent
            //  }):<ActivityIndicator size='large'/>}
             Alert('city component',cityComponent)
             console.log('city component',cityComponent
             )
             // alert(addressComponent)
       
             })
             .catch(error => console.log('error.......', error));
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
        <TouchableOpacity style={[styles.LocationBtn, styles.currentLocation]} onPress={()=>getLocation()}>
          <Entypo name="location" size={29} color="#fff" />
          <Text style={[styles.locationText, {  color:'#fff',marginLeft:12}]}>Get Current location</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.LocationBtn, ]}>
          
          <Text style={[styles.locationText, {  color:Primary}]}>Enter Location Manually</Text>
        </TouchableOpacity>
      </View>
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
    alignItem: 'center',
    borderWidth: 2,
    padding: 12,
    borderColor: Primary,
    width: wp('80%'),
    justifyContent: 'center',
    borderRadius: 22,
    margin:12
  },
  currentLocation: {
    backgroundColor: Primary,
  },
  locationText:{
      fontSize:hp('2.2%'),
    
      fontWeight:'700',
     
  }
});
