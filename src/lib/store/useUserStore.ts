import { create } from "zustand";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  changePassword,
} from "@/lib/utils";

interface User {
  _id?: string;
  tenantId: string;
  username: string;
  hashedPassword: string;
  firstName: string;
  lastName: string;
  profile?: {
    bio: string;
    profilePicture: string;
    coverPicture: string;
  };
  lastLogin?: Date;
  clockId?: number;
  hoursWorked?: number;
  shifts?: string[];
  settings?: {
    lineNotifications?: boolean;
    postNotifications?: boolean;
  };
  cart?: { item: string; quantity: number }[];
  createdAt?: string;
}

interface UserState {
  users: User[];
  fetchUsers: (tenantId: string) => Promise<void>;
  fetchUser: (userId: string) => Promise<User | undefined>;
  addUser: (user: User) => void;
  updateUser: (userId: string, user: User) => void;
  setUsers: (users: User[]) => void;
  removeUser: (userId: string) => void;
  changePassword: (
    newPassword: string,
    confirmPassword: string,
    userId: string,
    tenantId: string,
  ) => any;
}

export const useUserStore = create<UserState>((set, get) => ({
  users: [],
  fetchUsers: async (tenantId: string) => {
    try {
      const token: string = localStorage.getItem("jwt") as string;
      const users = await getAllUsers(token, tenantId);
      set({ users });
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  },
  fetchUser: async (userId: string) => {
    try {
      const token: string = localStorage.getItem("jwt") as string;
      const user = await getUserById(token, userId);
      return user;
    } catch (error) {
      console.error(`Error fetching user with ID ${userId}:`, error);
    }
  },
  addUser: async (user: User) => {
    try {
      const token: string = localStorage.getItem("jwt") as string;
      const newUser = await createUser(token, user);
      set((state) => ({
        users: [...state.users, newUser],
      }));
    } catch (error) {
      console.error("Error adding user:", error);
    }
  },
  updateUser: async (userId, user: User) => {
    try {
      const token: string = localStorage.getItem("jwt") as string;
      const updatedUser = await updateUser(token, userId, user);
      set((state) => ({
        users: state.users.map((u) => (u._id === user._id ? updatedUser : u)),
      }));
    } catch (error) {
      console.error("Error updating user:", error);
    }
  },
  setUsers: (users: User[]) => {
    set({ users });
  },
  removeUser: async (userId: string) => {
    try {
      const token: string = localStorage.getItem("jwt") as string;
      await deleteUser(token, userId);
      set((state) => ({
        users: state.users.filter((u) => u._id !== userId),
      }));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  },
  changePassword: async (
    newPassword: string,
    confirmPassword: string,
    userId: string,
    tenantId: string,
  ) => {
    try {
      const token: string = localStorage.getItem("jwt") as string;
      const response = await changePassword(
        token,
        userId,
        newPassword,
        confirmPassword,
        tenantId,
      );
      return response.status === 200;
    } catch (error) {
      console.error("Error changing password:", error);
    }
  },
}));
