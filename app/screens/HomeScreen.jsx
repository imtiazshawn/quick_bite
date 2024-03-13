import { View, Text, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import axios from 'axios';

import Categories from '../components/Categories';
import Foods from '../components/Foods';
import Trending from '../components/Trending';

const HomeScreen = () => {
  const [activeCategory, setActiveCategory] = useState('Beef');
  const [categories, setCategories] = useState([]);
  const [foodsData, setFoodsData] = useState([]);

  useEffect(() => {
    getCategories();
    getFoods();
  }, [])

  // Handle Category
  const handleChangeCategory = category => {
    getFoods(category)
    setActiveCategory(category);
    setFoodsData([]);
  }

  // Get Categories
  const getCategories = async () => {
    try {
      const response = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');
      if (response && response.data) {
        setCategories(response.data.categories);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Category Data API Fetch
  const getFoods = async (category = 'beef') => {
    try {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      if (response && response.data) {
        setFoodsData(response.data.meals);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View className='flex-1 bg-[#fbfbfb]'>
      <StatusBar style='dark' />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className='space-y-6 pt-14'
      >
        {/* Avatar */}
        <View className='mx-4 flex-row justify-between items-center mb-2'>
          {/* <BellIcon size={hp(5)} color='gray' /> */}
          <TouchableOpacity className='bg-white p-3 rounded-lg'>
            <View className='h-1 w-3 bg-black'></View>
            <View className='mt-1 h-1 w-6 bg-black'></View>
            <View className='ml-3 mt-1 h-1 w-3 bg-black'></View>
          </TouchableOpacity>
          <TouchableOpacity className='bg-white rounded-lg'>
            <Image source={require('../../assets/images/avatar.png')} style={{ width: hp(6.5), height: hp(6.5) }} />
          </TouchableOpacity>
        </View>

        {/* Greetings */}
        <View className='mx-4 space-y-1 mb-2'>
          <View>
            <Text style={{ fontSize: hp(3.8) }} className='text-neutral-600 font-bold'>QuickBite</Text>
          </View>
          <Text style={{ fontSize: hp(2) }} className='text-neutral-500'>Satisfying Cravings, Rapidly Delivered!</Text>
        </View>

        {/* Searchbar */}
        <View className='mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]'>
          <TextInput
            placeholder='Search any recipe'
            placeholderTextColor='gray'
            style={{ fontSize: hp(1.7) }}
            className='flex-1 text-base mb-1 pl-3 tracking-wider'
          />
          <View className='bg-white rounded-full p-3'>
            <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color='gray' />
          </View>
        </View>

        {/* Trending */}
        <View>
          <Trending />
        </View>

        {/* Categories */}
        <View>
          {categories.length > 0 && <Categories categories={categories} activeCategory={activeCategory} handleChangeCategory={handleChangeCategory} />}
        </View>

        {/* Categorywise Foods */}
        <View>
          <Foods foods={foodsData} categories={categories} />
        </View>

      </ScrollView>
    </View>
  )
}

export default HomeScreen;