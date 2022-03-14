import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Animated,
} from 'react-native';
import React, {useState, useRef} from 'react';
import {OneSlider} from '../../data/svgImages';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Button from '../../helpers/props/button';
import {Onboarding} from '../../data/onBoarding';
import Paginator from '../../helpers/props/paginator/Paginator';

const OnboardScreen = ({navigation}) => {
  const[currentIndex,setCurrentIndex]= useState(0)
  const slidesRef = useRef(null)
  const scrollx = useRef(new Animated.Value(0)).current;
const viewableItemsChanged = useRef(({viewableItems})=>{
  setCurrentIndex(viewableItems[0].index)
}).current

const viewConfig = useRef({viewAreaCoveragePercentThreshold:50}).current

const scrollTo =()=>{
  if(currentIndex<Onboarding.length -1){
    slidesRef.current.scrollToIndex({index:currentIndex +1})
  }
  else{
    navigation.navigate('LoginScreen')
  }
}

  return (
    <FlatList
      data={Onboarding}
      horizontal
      showsHorizontalScrollIndicator={false}
      pagingEnabled
      keyExtractor={item => item.id}
      scrollEventThrottle={32}
      onScroll={Animated.event([{nativeEvent: {contentOffset: {x: scrollx}}}], {
        useNativeDriver: false,
      })}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={viewConfig}
      ref={slidesRef}
      renderItem={({item, index}) => {
        return (
          <View style={styles.pageOne}>
            <View style={styles.headerOnboarding}>
              <Text></Text>
            <Paginator data={Onboarding} scrollX={scrollx} />
              <TouchableOpacity
                onPress={() => navigation.navigate('LoginScreen')}>
                <Text>Skip</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.onboardingContainer}>
              <Text style={styles.onboardingText}>{item.title}</Text>
              <Button buttonText="Next" onPress={scrollTo} />
            </View>
            <View style={styles.bordingImage}>
              <item.image width={430} height={400} />
            </View>
          </View>
        );
      }}
      bounces={false}
    />
  );
};

export default OnboardScreen;

const styles = StyleSheet.create({
  onboardingStyle: {
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  pageOne: {
    flex: 1,
    // alignItems: 'center',
    backgroundColor: '#fff',
    width:wp('100%')
  },

  headerOnboarding: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  
    top: hp('2%'),
  },
  onboardingContainer: {
    top: hp('2%'),
    padding: 12,
  },
  onboardingText: {
    width: wp('63%'),
    fontSize: hp('3%'),
    letterSpacing: 0.2,
    fontWeight: 'bold',
    color:'#000'
  },
  bordingImage: {
    top: hp('24%'),
    // margin: 12,

  },
});
