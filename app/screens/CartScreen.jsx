import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView, Animated } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeftIcon, MinusIcon, PlusIcon } from 'react-native-heroicons/outline';

import { useCartStore } from '../../stores/CartStore';
import Loader from '../components/Loader';

const CartScreen = () => {
  const [quantity, setQuantity] = useState(1);
  const cartItems = useCartStore(state => state.cartItems);
  const [fadeIn] = useState(new Animated.Value(0));

  const navigation = useNavigation();

  useEffect(() => {
    console.log(cartItems);

    Animated.timing(fadeIn, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <ScrollView className='flex-1 bg-[#fbfbfb]'>
      <StatusBar style='dark' />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className='space-y-6 pt-14'
      >
        {/* Avatar */}
        <View className='mx-4 flex-row justify-between items-center mb-2'>
          <TouchableOpacity 
            className='bg-white p-3 rounded-lg'
            onPress={() => navigation.goBack()}
          >
            <ChevronLeftIcon size={hp(2.5)} strokeWidth={4.5} color='#000' />
          </TouchableOpacity>
          <Text className='font-bold' style={{ fontSize: hp(2.5) }}>My Order</Text>
          <TouchableOpacity className='bg-white rounded-lg'>
            <Image source={require('../../assets/images/avatar.png')} style={{ width: hp(6.5), height: hp(6.5) }} />
          </TouchableOpacity>
        </View>

        {/* Cart Item */}
        <View className='mx-4 space-y-3'>
          <View>
            {cartItems.length  == 0 ? (
              <Loader size="large" className='mt-2' />
            ) : (
              <View>
                {cartItems && cartItems.map((item, index) => (
                  <Animated.View key={index} style={{ opacity: fadeIn, width: '100%' }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: 'white',
                        borderRadius: 20,
                        shadowColor: '#000',
                        shadowOffset: {
                          width: 0,
                          height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5,
                        marginBottom: 20,
                        padding: 10,
                      }}
                    >
                      <Image
                        source={{ uri: item.strMealThumb }}
                        style={{
                          width: 100,
                          height: 100,
                          borderRadius: 20,
                          marginRight: 10,
                        }}
                      />
                      <View style={{ flex: 1 }}>
                        <Text
                          style={{
                            fontWeight: 'bold',
                            fontSize: 16,
                            color: '#333',
                            marginBottom: 5,
                          }}
                        >
                          {item.strMeal.length > 20
                            ? item.strMeal.slice(0, 20) + '...'
                            : item.strMeal}
                        </Text>
                        {/* Counter */}
                        <View 
                          className='flex-row justify-center items-center rounded-lg p-1' 
                          style={{ marginVertical: hp(1), width: wp(35) }}
                        >
                          <TouchableOpacity 
                            onPress={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                            className='bg-[#f0f0f0] p-1 rounded-lg'
                          >
                            <MinusIcon size={24} color='black' />
                          </TouchableOpacity>
                          <Text className='font-md' style={{ fontSize: hp(2.5), marginHorizontal: hp(2.5) }}>{quantity}</Text>
                          <TouchableOpacity 
                            onPress={() => setQuantity(quantity + 1)}
                            className='bg-[#f0f0f0] p-1 rounded-lg'
                          >
                            <PlusIcon size={24} color='black' />
                          </TouchableOpacity>
                        </View>
                      </View>
                      <View className='flex-row items-center'>
                        <Text className='font-semibold text-[#f9c22d]' style={{ fontSize: hp(2.5) }}>$</Text>
                        <Text className='font-semibold' style={{ fontSize: hp(2.5) }}>10.00</Text>
                      </View>
                    </View>
                  </Animated.View>
                ))}
              </View>
            )}
          </View>
        </View>


        {/* Details */}
        <View className='w-full flex-row justify-between' style={{ marginVertical: hp(2.5), paddingHorizontal: hp(2.5) }}>
          <Text style={{ fontSize: hp(2.5) }}>Total Amout:</Text>
          <View className='flex-row items-center'>
            <Text className='font-semibold text-[#f9c22d]' style={{ fontSize: hp(2.5) }}>$</Text>
            <Text className='font-semibold' style={{ fontSize: hp(2.5) }}>10.00</Text>
          </View>
        </View>

        {/* Place Order */}
        <View style={{ marginVertical: hp(2.5), paddingHorizontal: hp(2.5), paddingBottom: hp(4) }}>
          <TouchableOpacity 
            className='bg-[#f9c22d] justify-center items-center' 
            style={{ paddingVertical: hp(2.5), zIndex: 999 }}
          >
            <Text className='font-bold' style={{ fontSize: hp(2) }}>Place Order</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </ScrollView>
  )
}

export default CartScreen;