import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useCartStore = create((set) => ({
  cartItems: [],
  init: async () => {
    try {
      const storedCartItems = await AsyncStorage.getItem('cartItems');
      if (storedCartItems) {
        set({ cartItems: JSON.parse(storedCartItems) });
      }
    } catch (error) {
      console.error('Error loading cart items from AsyncStorage:', error);
    }
  },  
  addToCart: async (item) => {
    try {
      set((state) => {
        const updatedCartItems = [...state.cartItems, item];
        AsyncStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        return { cartItems: updatedCartItems };
      });
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  },
  removeFromCart: async (itemId) => {
    try {
      set((state) => {
        const updatedCartItems = state.cartItems.filter((item) => {
          return item.idMeal !== itemId;
        });
        AsyncStorage.setItem('cartItems', JSON.stringify(updatedCartItems))
          .then(() => console.log('Updated cart items in AsyncStorage:', updatedCartItems))
          .catch((error) => console.error('Error updating cart items in AsyncStorage:', error));
        return { cartItems: updatedCartItems };
      });
    } catch (error) {
      console.error('Error removing item from cart:', error);
      throw error;
    }
  },  
}));
