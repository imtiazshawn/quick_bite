import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useFavouriteStore = create((set) => ({
  favouriteItems: [],
  init: async () => {
    try {
      const storedFavouriteItems = await AsyncStorage.getItem('favouriteItems');
      if (storedFavouriteItems) {
        set({ favouriteItems: JSON.parse(storedFavouriteItems) });
      }
    } catch (error) {
      console.error('Error loading favourite items from AsyncStorage:', error);
    }
  },  
  addToFavourite: async (item) => {
    try {
      set((state) => {
        const updatedFavouriteItems = [...state.favouriteItems, item];
        AsyncStorage.setItem('favouriteItems', JSON.stringify(updatedFavouriteItems));
        return { favouriteItems: updatedFavouriteItems };
      });
    } catch (error) {
      console.error('Error adding item to favourite:', error);
    }
  },
  removeFromFavourite: async (itemId) => {
    try {
      set((state) => {
        const updatedFavouriteItems = state.favouriteItems.filter((item) => {
          return item.idMeal !== itemId;
        });
        AsyncStorage.setItem('favouriteItems', JSON.stringify(updatedFavouriteItems))
          .then(() => console.log('Updated favourite items in AsyncStorage:', updatedFavouriteItems))
          .catch((error) => console.error('Error updating favourite items in AsyncStorage:', error));
        return { favouriteItems: updatedFavouriteItems };
      });
    } catch (error) {
      console.error('Error removing item from favourite:', error);
      throw error;
    }
  },  
}));
