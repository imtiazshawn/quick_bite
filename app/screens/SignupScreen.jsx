import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { ChevronDoubleRightIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';

const SignupScreen = () => {
  const navigation = useNavigation();

  return (
    <View className='flex-1 bg-white'>
    <View className='flex-1 justify-center items-center'>
      {/* Logo, Company Name, Tagline */}
      <View className='items-center' style={{ marginBottom: hp(4) }}>
        <Image source={{ uri: 'https://links.papareact.com/wru' }} style={{ width: hp(10), height: hp(10) }} />
        <Text className='font-bold mt-2' style={{ fontSize: hp(4) }}>QuickBite</Text>
        <Text className='text-slate-500 mt-2' style={{ fontSize: hp(2) }}>Satisfying Cravings, Rapidly Delivered!</Text>
      </View>
      
      {/* Form Email & Password */}
      <View style={{ width: wp(90) }}>
        <View style={{ marginBottom: hp(2) }}>
          <Text style={{ marginBottom: hp(0.5) }}>Full Name</Text>
          <TextInput
            className='border-none border-b border-b-gray-300 rounded pl-1'
            style={{ height: hp(5) }}
            placeholder="Full Name"
            autoCapitalize="none"
          />
        </View>
        <View style={{ marginBottom: hp(2) }}>
          <Text style={{ marginBottom: hp(0.5) }}>Email</Text>
          <TextInput
            className='border-none border-b border-b-gray-300 rounded pl-1'
            style={{ height: hp(5) }}
            placeholder="Enter your email"
            autoCapitalize="none"
          />
        </View>
        <View style={{ marginBottom: hp(3.5) }}>
          <Text style={{ marginBottom: hp(0.5) }}>Password</Text>
          <TextInput
            className='border-none border-b border-b-gray-300 rounded pl-1'
            style={{ height: hp(5) }}
            placeholder="Password"
            autoCapitalize="none"
          />
        </View>
        <TouchableOpacity className='bg-[#f9c22d] rounded-lg font-bold' style={{ paddingVertical: hp(2) }}>
          <Text className='font-bold text-center'>Signup</Text>
        </TouchableOpacity>
      </View>
    </View>

      {/* Don't have an account? & Sign Up */}
      <View className='px-4 flex-row items-center justify-between' style={{ width: wp(100), marginBottom: hp(4) }}>
        <Text className='text-md'>Already have an Account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')} className='flex-row items-center gap-1'>
          <Text className='font-bold text-lg'>Login</Text>
          <ChevronDoubleRightIcon style={{ width: hp(2) }} color='#f9c22d' />
        </TouchableOpacity>
      </View>

    </View>
  );
}

export default SignupScreen;