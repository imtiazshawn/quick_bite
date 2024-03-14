import React, { useEffect, useRef } from 'react';
import { Image, Text, View, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = () => {
  const animatedPadding = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  useEffect(() => {
    Animated.timing(animatedPadding, {
      toValue: hp(5),
      duration: 1000,
      useNativeDriver: false,
    }).start();

    setTimeout(() => navigation.navigate('Login'), 2500);
  }, []);

  return (
    <View className='flex-1 justify-center items-center bg-[#f9c22d]' style={{ padding: hp(5) }}>
      <StatusBar style='light' />

      {/* Logo  */}
      <Animated.View className='bg-white/50 rounded-full' style={{ padding: animatedPadding }}>
        <View className='bg-white/50 rounded-full' style={{ padding: hp(5.5) }}>
          <Image source={{ uri: 'https://links.papareact.com/wru'}} style={{ width: wp(40), height: hp(22) }} />
        </View>
      </Animated.View>

      {/* Title */}
      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <Text className='font-bold text-white tracking-widest' style={{ fontSize: hp(5) }}>QuickBite</Text>
        <Text className='font-bold text-white tracking-wider' style={{ fontSize: hp(1.75) }}>Satisfying Cravings, Rapidly Delivered!</Text>
      </View>
    </View>
  );
};

export default WelcomeScreen;
