import { create } from 'zustand';

export const useFavouriteStore = create((set) => ({
  favouriteItems: [],
  favourites: (item) => set((state) => ({ favouriteItems: [...state.favouriteItems, item] })),
}));
