"use client";

import { useState, useEffect, useCallback } from "react";
import { DateRange } from "react-day-picker";

interface OrderData {
  id: string;
  date: string;
  total: number;
  discountedTotal: number;
}

interface WorkerData {
  id: string;
  name: string;
  workerId: string;
  orders: OrderData[];
}

interface PayrollHookResult {
  data: WorkerData[];
  totalPayroll: number;
  loading: boolean;
  error: string | null;
  downloadXlsx: () => Promise<void>;
}

/**
 * Custom hook to fetch payroll data for a given tenant and date range,
 * and provide a method to download the data as XLSX.
 *
 * @param {string} tenantId - The ID of the tenant (company)
 * @param {DateRange | undefined} dateRange - The selected date range
 *
 * @returns {Object} - An object containing:
 *  - data: WorkerData[] - The transformed payroll data
 *  - totalPayroll: number - The total payroll sum across all orders
 *  - loading: boolean - Indicates whether data is being fetched
 *  - error: string | null - Error message if fetching fails
 *  - downloadXlsx: function - A function to download the payroll data as XLSX
 */
export function usePayrollData(
  tenantId: string,
  dateRange?: DateRange,
): PayrollHookResult {
  const [data, setData] = useState<WorkerData[]>([]);
  const [totalPayroll, setTotalPayroll] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!tenantId || !dateRange?.from || !dateRange?.to) {
      setData([]);
      setTotalPayroll(0);
      return;
    }

    const startDate = dateRange.from.toISOString();
    const endDate = dateRange.to.toISOString();

    setLoading(true);
    setError(null);

    fetch(
      `https://api.aionsites.com/companies/payroll/${tenantId}?start=${startDate}&end=${endDate}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      },
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch payroll data");
        }
        return res.json();
      })
      .then((responseData) => {
        const transformed: WorkerData[] = Object.entries(responseData).map(
          ([userId, payrollEntry]: [string, any]) => ({
            id: userId,
            name: payrollEntry.username,
            workerId: payrollEntry.workerId,
            orders: payrollEntry.orders.map((order: any) => ({
              id: order.orderId,
              date: order.createdAt,
              total: order.totalPrice,
              discountedTotal: order.discountedPrice ?? order.totalPrice,
            })),
          }),
        );

        const total = transformed.reduce((sum, worker) => {
          const workerTotal = worker.orders.reduce(
            (orderSum, order) => orderSum + order.total,
            0,
          );
          return sum + workerTotal;
        }, 0);

        setData(transformed);
        setTotalPayroll(total);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
        setData([]);
        setTotalPayroll(0);
      });
  }, [tenantId, dateRange]);

  const downloadXlsx = useCallback(async () => {
    if (!tenantId || !dateRange?.from || !dateRange?.to) {
      console.error(
        "Cannot download XLSX without tenantId and valid date range.",
      );
      return;
    }

    try {
      const startDate = dateRange.from.toISOString();
      const endDate = dateRange.to.toISOString();

      const res = await fetch(
        `https://api.aionsites.com/companies/payroll/${tenantId}/download?start=${startDate}&end=${endDate}&lang=he`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        },
      );

      if (!res.ok) {
        throw new Error("Failed to download XLSX");
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      // Create a temporary link and click it to download the file
      const a = document.createElement("a");
      a.href = url;
      a.download = "payroll_summary.xlsx";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err: any) {
      console.error("Error downloading XLSX:", err);
    }
  }, [tenantId, dateRange]);

  return { data, totalPayroll, loading, error, downloadXlsx };
}
