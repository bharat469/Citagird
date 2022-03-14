import {
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  Animated,
} from 'react-native';
import React from 'react';
import {Primary} from '../../../data/colors';

const Paginator = props => {
  const {width} = useWindowDimensions();
  return (
    <View style={{flexDirection: 'row', height: 64}}>
      {props.data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

        const dotWidth = props.scrollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
          extrapolate: 'clamp',
        });

        const opacity = props.scrollX.interpolate({
            inputRange,
            outputRange:[0.3,1,0.3],
            extrapolate:'clamp'
        })

        return (
          <Animated.View
            style={[styles.dot, {width: dotWidth,opacity}]}
            key={i.toString()}
          />
        );
      })}
    </View>
  );
};

export default Paginator;

const styles = StyleSheet.create({
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: Primary,
    marginHorizontal: 8,
  },
});
