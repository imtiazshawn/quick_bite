import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView, Animated } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';

import { useFavouriteStore } from '../../stores/FavouriteStore';
import Loader from '../components/Loader';

const FavouriteScreen = () => {
  const [quantity, setQuantity] = useState(1);
  const favouriteItems = useFavouriteStore(state => state.favouriteItems);
  const [fadeIn] = useState(new Animated.Value(0));

  const navigation = useNavigation();

  useEffect(() => {
    console.log(favouriteItems);

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
          <Text className='font-bold' style={{ fontSize: hp(2.5) }}>Favourites</Text>
          <TouchableOpacity className='bg-white rounded-lg'>
            <Image source={require('../../assets/images/avatar.png')} style={{ width: hp(6.5), height: hp(6.5) }} />
          </TouchableOpacity>
        </View>

        {/* Cart Item */}
        <View className='mx-4 space-y-3'>
          <View>
            {favouriteItems.length  == 0 ? (
              <Loader size="large" className='mt-2' />
            ) : (
              <View>
                {favouriteItems && favouriteItems.map((item, index) => (
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
                        <View className='flex-row items-center'>
                          <Text className='font-semibold text-[#f9c22d]' style={{ fontSize: hp(2.5) }}>$</Text>
                          <Text className='font-semibold' style={{ fontSize: hp(2.5) }}>10.00</Text>
                        </View>
                      </View>
                        <TouchableOpacity
                          className='bg-white p-3 rounded-lg'
                        >
                          <HeartIcon size={hp(3.5)} strokeWidth={4.5} color='red' />
                        </TouchableOpacity>
                    </View>
                  </Animated.View>
                ))}
              </View>
            )}
          </View>
        </View>

      </ScrollView>
    </ScrollView>
  )
}

export default FavouriteScreen;