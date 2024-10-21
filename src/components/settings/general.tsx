import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Image as ImageIcon, Link } from "lucide-react";
import { Button } from "@/components/ui/button";
import useUpload from "@/lib/hooks/useUpload";
import { useCompanyStore } from "@/lib/store/useCompanyStore";

interface GeneralSettingsProps {
  logo: string;
  setLogo: (logo: string) => void;
  companyName: string;
  setCompanyName: (companyName: string) => void;
  companyUrl: string;
  setCompanyUrl: (companyUrl: string) => void;
  activeSection: string;
}

export function GeneralSettings({
  logo,
  setLogo,
  companyName,
  setCompanyName,
  companyUrl,
  setCompanyUrl,
  activeSection,
}: GeneralSettingsProps) {
  const { uploadImage, progress, error } = useUpload();
  const { selectedCompany } = useCompanyStore();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = await uploadImage(file);
      setLogo(url as string);
    }
  };

  return (
    <Card id="general" className={activeSection !== "General" ? "hidden" : ""}>
      <CardHeader>
        <CardTitle>General Settings</CardTitle>
        <CardDescription>
          Manage your company's basic information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4">
          <Avatar className="w-24 h-24">
            <AvatarImage src={logo} alt="Company Logo" />
            <AvatarFallback>
              <ImageIcon className="w-12 h-12" />
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-semibold">Company Logo</h3>
            <label htmlFor="logo-upload" className="inline-block mt-2">
              <span className="sr-only">{selectedCompany?.name}</span>
              <input
                id="logo-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  handleUpload(e);
                }}
              />
              <Button
                type="button"
                variant="outline"
                className="cursor-pointer"
                onClick={() => document.getElementById("logo-upload")?.click()} // Trigger the file input on button click
                disabled={progress > 0}
              >
                Upload new logo
              </Button>
              {error && <p className="text-red-500">{error}</p>}
            </label>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="company-name">Company Name</Label>
            <Input
              id="company-name"
              placeholder="Enter your company name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="company-url">Company Website</Label>
            <div className="flex items-center space-x-2">
              <Link className="w-4 h-4 text-gray-500" />
              <Input
                id="company-url"
                placeholder="https://www.example.com"
                value={companyUrl}
                onChange={(e) => setCompanyUrl(e.target.value)}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
