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
