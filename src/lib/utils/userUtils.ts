import axios from "axios";

export const getAllUsers = async (jwt: string, tenantId: string) => {
  const response = await axios.get("https://api.aionsites.com/users/", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
      "x-tenant-id": tenantId,
    },
  });
  return response.data;
};

export const getUserById = async (jwt: string, userId: string) => {
  const response = await axios.get(
    `https://api.aionsites.com/users/${userId}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    },
  );
  return response.data;
};

export const createUser = async (jwt: string, userData: any) => {
  const response = await axios.post(
    "https://api.aionsites.com/users/",
    userData,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    },
  );
  return response.data;
};

export const updateUser = async (
  jwt: string,
  userId: string,
  userData: any,
) => {
  const response = await axios.put(
    `https://api.aionsites.com/users/${userId}`,
    userData,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    },
  );
  return response.data;
};

export const deleteUser = async (jwt: string, userId: string) => {
  const response = await axios.delete(
    `https://api.aionsites.com/users/${userId}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    },
  );
  return response.data;
};
