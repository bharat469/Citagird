import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Header from '../../helpers/props/header/header';
import {Link} from '../../data/Links';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Primary } from '../../data/colors';

const Home = ({navigation, route}) => {
  const {location, image} = route.params;

  return (
    <View style={styles.HomeContainer}>
      <Header location={location} uri={image ? image : Link} />
      <View style={styles.searchContainer}>
        <Text style={styles.headText}>Let's find you a doctor for consultation</Text>
        <TouchableOpacity style={styles.searchBar}>
          <Text style={styles.searchText}>Search by doctors symptoms...</Text>
          <View style={styles.searchView}>
            <FontAwesome5 name="search" size={24} color="#fff" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  HomeContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer:{
    top:hp('6%'),
    alignItems:'center',
    backgroundColor:'#DOE3FF',
    padding:12,
    width:wp('90%'),
    left:wp('5%'),
    borderRadius:12
  },
headText:{
  fontSize:hp('3%'),
  textAlign:'center',
  fontWeight:'700',
  color:'#2F2F2F'
},
searchBar:{
  flexDirection:'row',
  backgroundColor:'#fff',
  padding:6,
  margin:22,
  width:wp('75%'),
  borderRadius:44,
  justifyContent:'space-around',
  alignItems:'center',
},
searchText:{
  fontSize:hp('1.4%'),
  color:'#A5A5A5'
},
searchView:{
  backgroundColor:Primary,
  padding:12,
  borderRadius:50
}

});
