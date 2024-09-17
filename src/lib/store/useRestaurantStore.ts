import { create } from "zustand";
import {
  getCompanyRestaurants,
  getNearbyRestaurants,
  addRestaurantToCompany,
  RemoveRestaurantFromCompany,
} from "@/lib/utils";
import { useCompanyStore } from "@/lib/store/useCompanyStore";

interface Restaurant {
  _id: string;
  name: string;
  profile?: {
    picture?: string;
    banner?: string;
    name?: string;
  };
  rating: number;
  category: string;
  cuisine: string;
  address: string;
  location: any;
  distance: string;
}

interface RestaurantState {
  companyRestaurants: Restaurant[];
  nearbyRestaurants: Restaurant[];
  selectedRestaurant: Restaurant | null;
  fetchCompanyRestaurants: () => Promise<void>;
  fetchNearbyRestaurants: () => Promise<void>;
  setCompanyRestaurants: (restaurants: Restaurant[]) => void;
  addCompanyRestaurant: (restaurant: Restaurant) => void;
  removeCompanyRestaurant: (restaurant: Restaurant) => void;
  setNearbyRestaurants: (restaurants: Restaurant[]) => void;
  setSelectedRestaurant: (restaurant: Restaurant | null) => void;
}

export const useRestaurantStore = create<RestaurantState>((set) => ({
  companyRestaurants: [],
  nearbyRestaurants: [],
  selectedRestaurant: null,
  fetchCompanyRestaurants: async () => {
    try {
      const token: string = localStorage.getItem("jwt") as string;
      const selectedCompany = useCompanyStore.getState().selectedCompany;
      if (!selectedCompany) return;
      const restaurants = await getCompanyRestaurants(
        token,
        selectedCompany._id as string,
      );
      set({ companyRestaurants: restaurants });
      console.log("companyRestaurants", restaurants);
    } catch (error) {
      console.error("Error fetching company restaurants:", error);
    }
  },
  fetchNearbyRestaurants: async () => {
    try {
      const token: string = localStorage.getItem("jwt") as string;
      const selectedCompany = useCompanyStore.getState().selectedCompany;
      if (!selectedCompany) return;
      const restaurants = await getNearbyRestaurants(
        token,
        selectedCompany._id as string,
      );
      set({ nearbyRestaurants: restaurants });
    } catch (error) {
      console.error("Error fetching nearby restaurants:", error);
    }
  },
  setCompanyRestaurants: (restaurants: Restaurant[]) => {
    set({ companyRestaurants: restaurants });
  },
  addCompanyRestaurant: async (restaurant: Restaurant) => {
    const response = await addRestaurantToCompany(
      localStorage.getItem("jwt") as string,
      useCompanyStore.getState().selectedCompany?._id as string,
      restaurant._id as string,
    );

    if (!response) {
      console.error("Error adding restaurant to company");
      return;
    }

    set((state) => ({
      companyRestaurants: [...state.companyRestaurants, restaurant],
    }));
  },
  removeCompanyRestaurant: async (restaurant: Restaurant) => {
    const response = await RemoveRestaurantFromCompany(
      localStorage.getItem("jwt") as string,
      useCompanyStore.getState().selectedCompany?._id as string,
      restaurant._id as string,
    );

    if (!response) {
      console.error("Error removing restaurant from company");
      return;
    }

    set((state) => ({
      companyRestaurants: state.companyRestaurants.filter(
        (r) => r._id !== restaurant._id,
      ),
    }));
  },
  setNearbyRestaurants: (restaurants: Restaurant[]) => {
    set({ nearbyRestaurants: restaurants });
  },
  setSelectedRestaurant: (restaurant: Restaurant | null) => {
    set({ selectedRestaurant: restaurant });
  },
}));
