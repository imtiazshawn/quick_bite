import React, { useEffect, useState } from 'react'
import { View, Text, Pressable, Image, Animated, TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

import Loader from './Loader';

const Foods = ({ foods, categories }) => {
  const navigation = useNavigation();
  const [fadeIn] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeIn, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View className='mx-4 space-y-3'>
      <Text style={{ fontSize: hp(3) }} className='text-neutral-600 font-semibold'>Foods</Text>

      <View>
        {categories.length == 0 || foods.length == 0 ? (
          <Loader size="large" color='#f9c22d' className='mt-2' />
        ) : (
          <View>
            {foods && foods.map((item, index) => (
              <Animated.View key={index} style={{ opacity: fadeIn, width: '100%' }}>
                <Pressable
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
                  onPress={() => navigation.navigate('FoodDetail', { ...item })}
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
                    <Text style={{ marginBottom: 5 }}>Chap with Salad</Text>
                  </View>
                  <View className='flex-row items-center'>
                    <Text className='font-semibold text-[#f9c22d]' style={{ fontSize: hp(2.5) }}>$</Text>
                    <Text className='font-semibold' style={{ fontSize: hp(2.5) }}>10.00</Text>
                  </View>
                </Pressable>
              </Animated.View>
            ))}
          </View>
        )}
      </View>
    </View>
  )
}

export default Foods;