import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView, Animated } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeftIcon, MinusIcon, PlusIcon, XMarkIcon } from 'react-native-heroicons/outline';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useCartStore } from '../../stores/CartStore';
import Loader from '../components/Loader';

const CartScreen = () => {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const cartItems = useCartStore(state => state.cartItems);
  const [fadeIn] = useState(new Animated.Value(0));
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const initCart = useCartStore((state) => state.init);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchCartItems = async () => {
      await initCart();
      setLoading(false);

      Animated.timing(fadeIn, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    };

    fetchCartItems();
  }, []);

  // Increase Quantity
  const incQty = async (item) => {
    const allCarts = await AsyncStorage.getItem('cartItems');
    const parsedCarts = JSON.parse(allCarts);
    const foundItemIndex = parsedCarts.findIndex(cartItem => cartItem.idMeal === item.idMeal);

    if (foundItemIndex !== -1) {
      parsedCarts[foundItemIndex].quantity += 1;
      await AsyncStorage.setItem('cartItems', JSON.stringify(parsedCarts));

      useCartStore.setState({ cartItems: parsedCarts });

      return parsedCarts[foundItemIndex];
    } else {
      console.log("Item not found");
      return null;
    }
  }

  // Decrease Quantity
  const decQty = async (item) => {
    const allCarts = await AsyncStorage.getItem('cartItems');
    const parsedCarts = JSON.parse(allCarts);
    const foundItemIndex = parsedCarts.findIndex(cartItem => cartItem.idMeal === item.idMeal);

    if (foundItemIndex !== -1 && parsedCarts[foundItemIndex].quantity > 1) {
      parsedCarts[foundItemIndex].quantity -= 1;
      await AsyncStorage.setItem('cartItems', JSON.stringify(parsedCarts));

      useCartStore.setState({ cartItems: parsedCarts });

      return parsedCarts[foundItemIndex];
    } else if (foundItemIndex !== -1 && parsedCarts[foundItemIndex].quantity === 1) {
      await handleRemoveToCart(item.idMeal);
      return null;
    } else {
      console.log("Item not found");
      return null;
    }
  }


  // Remove From Cart
  const handleRemoveToCart = async (id) => {
    try {
      await removeFromCart(id);
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  }

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

        {loading ? (
          <View style={{ height: hp(80) }} className='items-center justify-center'>
            <Loader size="large" color='#f9c22d' />
          </View>
        ) : (
          <View className='mx-4 space-y-3'>
            <View>
              {cartItems.length == 0 ? (
                <View style={{ height: hp(80) }} className='items-center justify-center'>
                  <Text className='text-center'>There is no Cart</Text>
                </View>
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
                          <View className='flex-row items-center'>
                            <Text className='font-semibold text-[#f9c22d]' style={{ fontSize: hp(1.75) }}>$</Text>
                            <Text className='font-semibold' style={{ fontSize: hp(1.75) }}>10.00</Text>
                          </View>
                          <View
                            className='mt-2 flex-row justify-center items-center rounded-lg p-1'
                            style={{ marginVertical: hp(1), width: wp(35) }}
                          >
                            <TouchableOpacity
                              onPress={() => decQty(item)}
                              className='bg-[#f0f0f0] p-1 rounded-lg'
                            >
                              <MinusIcon size={24} color='black' />
                            </TouchableOpacity>
                            <Text className='font-md' style={{ fontSize: hp(2.5), marginHorizontal: hp(2.5) }}>{item.quantity}</Text>
                            <TouchableOpacity
                              onPress={() => incQty(item)}
                              className='bg-[#f0f0f0] p-1 rounded-lg'
                            >
                              <PlusIcon size={24} color='black' />
                            </TouchableOpacity>
                          </View>
                        </View>
                        <TouchableOpacity
                          className='bg-red-400 justify-center items-center rounded-full'
                          style={{ padding: hp(1.5) }}
                          onPress={() => handleRemoveToCart(item.idMeal)}
                        >
                          <XMarkIcon size={24} color='white' />
                        </TouchableOpacity>
                      </View>
                    </Animated.View>
                  ))}
                </View>
              )}
            </View>
          </View>
        )
        }

        {/* Details */}
        {cartItems.length !== 0 && (
          <View>
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
          </View>
        )}

      </ScrollView>
    </ScrollView >
  )
}

export default CartScreen;