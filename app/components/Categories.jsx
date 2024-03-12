import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Animated } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Categories = ({ categories, activeCategory, handleChangeCategory }) => {
  const [fadeIn] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeIn, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        { categories && categories.map((cat, index) => {
          let isActive = cat.strCategory === activeCategory;
          const translateY = fadeIn.interpolate({
            inputRange: [0, 1],
            outputRange: [-100, 0],
          });

          return (
            <Animated.View
              key={index}
              style={{
                transform: [{ translateY }],
                opacity: fadeIn,
                marginRight: hp(1.75),
              }}
            >
              {
                isActive ? (
                    <View>
                        <TouchableOpacity
                            onPress={() => handleChangeCategory(cat.strCategory)}
                            className='bg-amber-400 rounded-full items-center justify-between border border-slate-200'
                            style={{
                                height: hp(16),
                                width: wp(16),
                            }}
                        >
                            <Text className='text-white mt-6 break-words' style={{ fontSize: hp(1.6) }}>{cat.strCategory}</Text>
                            <View className='rounded-full p-[6px] '>
                            <Image
                                source={{ uri: cat.strCategoryThumb }}
                                style={{ width: hp(7), height: hp(7), borderRadius: hp(3) }}
                            />
                            </View>
                        </TouchableOpacity>
                    </View>
                )
                : (
                    <View>
                        <TouchableOpacity
                            onPress={() => handleChangeCategory(cat.strCategory)}
                            className='bg-white rounded-full flex-col justify-between items-center shadow-2xl border border-slate-200'
                            style={{ 
                              height: hp(16), 
                              width: wp(16)
                            }}
                        >
                            <View className='rounded-full p-[6px] '>
                            <Image
                                source={{ uri: cat.strCategoryThumb }}
                                style={{ width: hp(7), height: hp(7), borderRadius: hp(3) }}
                            />
                            </View>
                            <Text className='mb-6 break-words' style={{ fontSize: hp(1.6) }}>{cat.strCategory}</Text>
                        </TouchableOpacity>
                    </View>
                )
              }
            </Animated.View>
          );
        })}
      </ScrollView>
    </View>
  );
}

export default Categories;