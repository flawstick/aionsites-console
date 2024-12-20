"use client";

import { Button } from "@/components/ui/button";
import { usePayrollData } from "@/lib/hooks/usePayrollData";
import { Download } from "lucide-react";
import { useParams } from "next/navigation";
import { DateRange } from "react-day-picker";

interface ExportButtonProps {
  dateRange: DateRange | undefined;
}

export function ExportButton({ dateRange }: ExportButtonProps) {
  const { team } = useParams();
  const { downloadXlsx } = usePayrollData(team as string, dateRange);
  const handleExport = () => {
    downloadXlsx();
  };

  return (
    <Button onClick={handleExport} className="flex items-center h-auto">
      <Download className="h-4 w-4" />
      Export to Excel
    </Button>
  );
}
