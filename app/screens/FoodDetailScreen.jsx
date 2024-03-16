import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ChevronLeftIcon, MinusIcon, PlusIcon } from 'react-native-heroicons/outline';
import { ClockIcon, FireIcon, HeartIcon } from 'react-native-heroicons/solid';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useCartStore } from '../../stores/CartStore';
import { useFavouriteStore } from '../../stores/FavouriteStore';


const FoodDetailScreen = (props) => {
  const [foodData, setFoodData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasAddedCart, setHasAddedCart] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isFavourite, setIsFavourite] = useState(false);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const favourites = useFavouriteStore((state) => state.addToFavourite);
  const removeFromFavourite = useFavouriteStore((state) => state.removeFromFavourite);
  const initCart = useCartStore((state) => state.init);
  const initFav = useFavouriteStore((state) => state.init);

  const item = props.route.params;

  useEffect(() => {
    getFoodData(item.idMeal);
    initCart();
    initFav();
    
    // Check If Cart Item is Added or Not
    const checkCartAdded = async () => {
      const allCarts = await AsyncStorage.getItem('cartItems');
      const parsedCarts = JSON.parse(allCarts);
      const foundItemIndex = parsedCarts.findIndex(cartItem => cartItem.idMeal === item.idMeal);

      if (foundItemIndex) {
        setHasAddedCart(false);
      } else {
        setHasAddedCart(true);
      }
    }

    // Check If Fav Item is Added or Not
    const checkFavAdded = async () => {
      const allCarts = await AsyncStorage.getItem('favouriteItems');
      const parsedCarts = JSON.parse(allCarts);
      const foundItemIndex = parsedCarts.findIndex(favouriteItem => favouriteItem.idMeal === item.idMeal);

      if (foundItemIndex) {
        setIsFavourite(false);
      } else {
        setIsFavourite(true);
      }
    }

    checkCartAdded();
    checkFavAdded();
  }, []);

  // Meal Data API Fetch
  const getFoodData = async (id) => {
    try {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      if (response && response.data) {
        setFoodData(response.data.meals[0]);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  }

  // Add To Cart
  const handleAddToCart = async () => {
    await addToCart({ ...item, quantity });
    setHasAddedCart(true);
  }

  // Remove From Cart
  const handleRemoveToCart = async () => {
    try {
      await removeFromCart(item.idMeal);
      setHasAddedCart(false);
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  }

  // Add to Favourites
  const handleFavourites = async () => {
    await setIsFavourite(!isFavourite);

    if (isFavourite) {
      await removeFromFavourite(item.idMeal);
    } else {
      favourites({ ...item });
    }
  }

  return (
    <View className='h-100 relative w-full'>
      <ScrollView>
        <SafeAreaView className='flex-1 items-center bg-[#f9f9f9]'>
          {/* Header */}
          <View className='w-full flex-row justify-between'>
            <TouchableOpacity
              className='bg-white p-3 rounded-lg ml-6'
              onPress={() => props.navigation.goBack()}
            >
              <ChevronLeftIcon size={hp(2.5)} strokeWidth={4.5} color='#000' />
            </TouchableOpacity>
            <TouchableOpacity
              className='bg-white p-3 rounded-lg mr-6'
              onPress={() => handleFavourites()}
            >
              <HeartIcon size={hp(3.5)} strokeWidth={4.5} color={isFavourite ? 'red' : 'gray'} />
            </TouchableOpacity>
          </View>

          {/* Food Title */}
          <Text className='font-bold text-center mt-2' style={{ fontSize: hp(3.5) }}>Spicy Egg Chap</Text>

          {/* Ratings, Calories, Delivery Time */}
          <View className='w-full flex-row justify-around px-4' style={{ marginVertical: hp(3) }}>
            <View className='flex-row items-center gap-2'>
              <Text style={{ fontSize: hp(2.5) }}>⭐</Text>
              <Text style={{ fontSize: hp(2.5) }}>4.5</Text>
            </View>
            <View className='flex-row items-center gap-2'>
              <FireIcon size={hp(3)} color='#f9c22d' />
              <Text style={{ fontSize: hp(2.5) }}>50 Calories</Text>
            </View>
            <View className='flex-row items-center gap-2'>
              <ClockIcon size={hp(3)} color='#000' />
              <Text style={{ fontSize: hp(2.5) }}>20-30 Mins</Text>
            </View>
          </View>

          {/* Food Image */}
          <Image
            source={{ uri: item.strMealThumb }}
            style={{ width: 300, height: 300 }}
            className='rounded-full'
            resizeMode="cover"
          />

          {/* Counter */}
          <View className='flex-row justify-center items-center bg-[#f0f0f0] rounded-lg p-2' style={{ marginVertical: hp(3) }}>
            <TouchableOpacity
              onPress={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
              className='bg-white p-1 rounded-lg'
            >
              <MinusIcon size={24} color='black' />
            </TouchableOpacity>
            <Text className='font-md' style={{ fontSize: hp(2.5), marginHorizontal: hp(2.5) }}>{quantity}</Text>
            <TouchableOpacity
              onPress={() => setQuantity(quantity + 1)}
              className='bg-white p-1 rounded-lg'
            >
              <PlusIcon size={24} color='black' />
            </TouchableOpacity>
          </View>

          {/* Details */}
          <View className='w-full flex-row justify-between mx-4' style={{ marginVertical: hp(3), paddingHorizontal: hp(3) }}>
            <Text className='font-semibold' style={{ fontSize: hp(3) }}>Details</Text>
            <View className='flex-row items-center'>
              <Text className='font-semibold text-[#f9c22d]' style={{ fontSize: hp(3) }}>$</Text>
              <Text className='font-semibold' style={{ fontSize: hp(3) }}>10.00</Text>
            </View>
          </View>
          <Text className='text-slate-500 mx-5' style={{ fontSize: hp(2), textAlign: 'justify' }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>

        </SafeAreaView>
      </ScrollView>
      {/* Add To Cart Button */}
      {!hasAddedCart ? (
        <TouchableOpacity
          className='absolute bottom-5 bg-[#f9c22d] justify-center items-center rounded-full'
          style={{ padding: hp(3), zIndex: 999, left: wp(41.5) }}
          onPress={() => handleAddToCart()}
        >
          <PlusIcon size={24} color='white' />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          className='absolute bottom-5 bg-red-500 justify-center items-center rounded-full'
          style={{ padding: hp(3), zIndex: 999, left: wp(41.5) }}
          onPress={() => handleRemoveToCart()}
        >
          <MinusIcon size={24} color='white' />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default FoodDetailScreen;