import { create } from "zustand";
import { getCompanyRestaurants, getNearbyRestaurants } from "@/lib/utils";
import { useCompanyStore } from "@/lib/store/useCompanyStore";

interface Coordinates {
  lat: number;
  lng: number;
}

interface Restaurant {
  profile: string;
  rating: string;
  category: string;
  address: string;
  coordinates: Coordinates;
}

interface RestaurantState {
  companyRestaurants: Restaurant[];
  nearbyRestaurants: Restaurant[];
  selectedRestaurant: Restaurant | null;
  fetchCompanyRestaurants: () => Promise<void>;
  fetchNearbyRestaurants: () => Promise<void>;
  setCompanyRestaurants: (restaurants: Restaurant[]) => void;
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
  setNearbyRestaurants: (restaurants: Restaurant[]) => {
    set({ nearbyRestaurants: restaurants });
  },
  setSelectedRestaurant: (restaurant: Restaurant | null) => {
    set({ selectedRestaurant: restaurant });
  },
}));
