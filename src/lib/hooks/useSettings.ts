import React from "react";
import axios from "axios";
import useAuth from "@/lib/hooks/useAuth";

export function useSettings() {
  const { session } = useAuth();

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  const updateSettings = async (companyId: string, settings: any) => {
    try {
      setLoading(true);
      setError(null);
      await axios.put(
        `https://api.aionsites.com/companies/settings/${companyId}`,
        { ...settings },
        {
          headers: {
            // @ts-ignore
            Authorization: `Bearer ${session.jwt}`,
            "Content-Type": "application/json",
          },
        },
      );
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  return { updateSettings, loading, error };
}
