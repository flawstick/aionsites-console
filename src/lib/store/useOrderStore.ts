import { create } from "zustand";
import axios from "axios";
import { IOrder as Order } from "@/lib/types";

interface OrderState {
  team: string;
  orders: Order[];
  ordersHashmap: { [page: number]: Order[] };
  maxPages: number; // Total server pages available
  totalCount: number;
  currentServerPage: number; // The last server page we fetched
  loadedServerPages: number; // How many server pages are currently loaded
  stats: any;
  setTeam: (team: string) => void;
  fetchOrders: (page?: number) => Promise<void>;
  fetchMoreOrders: () => Promise<void>;
  fetchOrdersPage: (page: number) => Promise<void>;
  updateOrderStatus: (
    orderId: string,
    status: "pending" | "confirmed" | "done" | "cancelled" | "delivered",
  ) => void;
  fetchStats: () => Promise<void>;
  setStats: (stats: any) => void;
}

const useCompanyOrderStore = create<OrderState>()((set, get) => ({
  team: "",
  orders: [],
  ordersHashmap: {},
  maxPages: 1,
  totalCount: 0,
  currentServerPage: 1,
  loadedServerPages: 0,
  stats: null,

  setTeam: (team: string) => set({ team }),

  fetchOrders: async (page: number = 1) => {
    const { team } = get();
    if (!team) return;
    try {
      const response = await axios.get(
        `https://api.aionsites.com/orders/company/${team}?page=${page}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}` || "",
          },
        },
      );

      const { orders, maxPages, totalCount } = response.data;

      set(() => ({
        orders,
        ordersHashmap: {
          ...get().ordersHashmap,
          [page]: orders,
        },
        maxPages,
        totalCount,
        currentServerPage: page,
        loadedServerPages: 1,
      }));
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  },

  fetchMoreOrders: async () => {
    const {
      team,
      currentServerPage,
      orders: currentOrders,
      maxPages,
      loadedServerPages,
    } = get();

    if (!team) return;
    if (loadedServerPages >= maxPages) {
      console.log("No more orders to load.");
      return;
    }

    const nextPage = currentServerPage + 1;

    try {
      const response = await axios.get(
        `https://api.aionsites.com/orders/company/${team}?page=${nextPage}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}` || "",
          },
        },
      );
      const {
        orders: newOrders,
        maxPages: newMaxPages,
        totalCount,
      } = response.data;

      if (newOrders.length === 0) {
        console.log("No more orders to load.");
        return;
      }

      set(() => ({
        orders: [...currentOrders, ...newOrders],
        ordersHashmap: {
          ...get().ordersHashmap,
          [nextPage]: newOrders,
        },
        maxPages: newMaxPages,
        totalCount,
        currentServerPage: nextPage,
        loadedServerPages: loadedServerPages + 1,
      }));
    } catch (error) {
      console.error("Failed to fetch more orders:", error);
    }
  },

  fetchOrdersPage: async (page: number) => {
    const { team } = get();
    if (!team) return;
    try {
      const response = await axios.get(
        `https://api.aionsites.com/orders/company/${team}?page=${page}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}` || "",
          },
        },
      );

      const { orders, maxPages, totalCount } = response.data;

      set(() => ({
        orders,
        ordersHashmap: {
          ...get().ordersHashmap,
          [page]: orders,
        },
        maxPages,
        totalCount,
        currentServerPage: page,
        loadedServerPages: 1,
      }));
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  },

  updateOrderStatus: async (
    orderId: string,
    status: "pending" | "confirmed" | "done" | "cancelled" | "delivered",
  ) => {
    try {
      const response = await axios.put(
        `https://api.aionsites.com/orders/${orderId}/status`,
        { status },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}` || "",
          },
        },
      );
      set((state) => ({
        orders: state.orders.map((order) =>
          order._id === orderId
            ? { ...order, status: response.data.status }
            : order,
        ),
      }));
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  },
  fetchStats: async () => {
    try {
      const response = await axios.get(
        `https://api.aionsites.com/companies/orders/${get().team}/stats`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}` || "",
          },
        },
      );
      set({ stats: response.data });
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    }
  },
  setStats: (stats: any) => set({ stats }),
}));

export default useCompanyOrderStore;
