import { create } from "zustand";
import {
  getAllCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
} from "@/lib/utils";

interface Company {
  _id?: string;
  name: string;
  profile?: { url: string; logo: string };
  address?: string;
  contactEmail?: string;
  contactPhone?: string;
  tenantId: string;
  restaurants: string[];
  members?: string[];
  coordinates?: { lat: number; lng: number };
  maxOrdersPerDay?: number;
  maxOrdersPerMonth?: number;
  maxPerOrder?: number;
  maxOrderShekels?: number;
  companyContributionPercentage?: number;
}

interface CompanyState {
  companies: Company[];
  selectedCompany: Company | null;
  fetchCompanies: () => Promise<any>;
  fetchCompany: (companyId: string) => Promise<void>;
  addCompany: (company: Company) => void;
  updateCompany: (company: Company) => void;
  setCompanies: (companies: Company[]) => void;
  setSelectedCompany: (companyId: string) => void;
  removeCompany: (companyId: string) => void;
}

export const useCompanyStore = create<CompanyState>((set, get) => ({
  companies: [],
  selectedCompany: null,
  fetchCompanies: async () => {
    try {
      const token: string = localStorage.getItem("jwt") as string;
      const companies = await getAllCompanies(token);
      set({ companies });
      if (companies.length > 0 && !get().selectedCompany) {
        set({ selectedCompany: companies[0] });
      }
      return companies;
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  },
  fetchCompany: async (companyId: string) => {
    try {
      const token: string = localStorage.getItem("jwt") as string;
      const company = await getCompanyById(token, companyId);
      set({ selectedCompany: company });
    } catch (error) {
      console.error(`Error fetching company with ID ${companyId}:`, error);
    }
  },
  addCompany: (company: Company) => {
    set((state) => ({
      companies: [...state.companies, company],
    }));

    const token: string = localStorage.getItem("jwt") as string;
    createCompany(token, company);
  },
  updateCompany: (company: Company) => {
    set((state) => ({
      companies: state.companies.map((c) =>
        c._id === company._id ? company : c,
      ),
    }));

    const token: string = localStorage.getItem("jwt") as string;
    updateCompany(token, company._id as string, company);
  },
  setCompanies: (companies: Company[]) => {
    set({ companies });
  },
  setSelectedCompany: async (companyId: string) => {
    try {
      const token: string = localStorage.getItem("jwt") as string;
      const company = await getCompanyById(token, companyId);
      set({ selectedCompany: company });
    } catch (error) {
      console.error(
        `Error setting selected company with ID ${companyId}:`,
        error,
      );
    }
  },
  removeCompany: (companyId: string) => {
    set((state) => ({
      companies: state.companies.filter((c) => c._id !== companyId),
    }));

    const token: string = localStorage.getItem("jwt") as string;
    deleteCompany(token, companyId);
  },
}));
