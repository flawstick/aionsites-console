import axios from "axios";

export const getAllCompanies = async (jwt: string) => {
  const response = await axios.get(`https://api.aionsites.com/companies`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  });

  return response.data;
};

export const getCompanyById = async (jwt: string, id: string) => {
  const response = await axios.get(
    `https://api.aionsites.com/companies/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    },
  );
  return response.data;
};

export const createCompany = async (jwt: string, companyData: any) => {
  const response = await axios.post(
    `https://api.aionsites.com/companies`,
    companyData,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    },
  );
  return response.data;
};

export const updateCompany = async (
  jwt: string,
  id: string,
  companyData: any,
) => {
  const response = await axios.put(
    `https://api.aionsites.com/companies/${id}`,
    companyData,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    },
  );
  return response.data;
};

export const deleteCompany = async (jwt: string, id: string) => {
  const response = await axios.delete(
    `https://api.aionsites.com/companies/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    },
  );
  return response.data;
};

export const getCompanyRestaurants = async (
  token: string,
  companyId: string,
) => {
  try {
    const response = await axios.get(
      `https://api.aionsites.com/companies/${companyId}/restaurants`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching restaurants for company ${companyId}:`,
      error,
    );
    throw error;
  }
};

export const getNearbyRestaurants = async (
  token: string,
  companyId: string,
) => {
  try {
    const response = await axios.get(
      `https://api.aionsites.com/companies/${companyId}/restaurants/nearby`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching nearby restaurants for company ${companyId}:`,
      error,
    );
    throw error;
  }
};
