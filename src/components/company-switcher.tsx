"use client";

import * as React from "react";
import {
  CaretSortIcon,
  CheckIcon,
  PlusCircledIcon,
} from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenuButton } from "@/components/ui/sidebar";

import useAuth from "@/lib/hooks/useAuth";
import { CreateCompany } from "@/components/create-company";
import { useCompanyStore } from "@/lib/store/useCompanyStore";
import { ChevronsUpDown } from "lucide-react";

type CompanySwitcherProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuTrigger
>;

export function CompanySwitcher({ className }: CompanySwitcherProps) {
  const { session }: any = useAuth();
  const [open, setOpen] = React.useState(false);
  const [showNewTeamDialog, setShowNewTeamDialog] = React.useState(false);
  const { companies, setSelectedCompany, selectedCompany, fetchCompanies } =
    useCompanyStore();

  React.useEffect(() => {
    console.log("session", session);
    if (session) fetchCompanies();
  }, [session]);

  return (
    <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton
            size="lg"
            aria-expanded={open}
            aria-label="Select a team"
            className={cn(
              "data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground justify-between",
              className,
            )}
          >
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-white dark:bg-black border text-sidebar-primary-foreground">
              <Avatar className="h-5 w-5">
                <AvatarImage
                  src={selectedCompany?.profile?.logo}
                  alt={selectedCompany?.name || "Company"}
                />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">
                {selectedCompany ? selectedCompany.name : "Select a team"}
              </span>
            </div>
            <ChevronsUpDown className="ml-auto" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-[200px] min-w-56 rounded-lg p-0"
          align="start"
          side="bottom"
          sideOffset={4}
        >
          <DropdownMenuLabel className="text-xs text-muted-foreground">
            Teams
          </DropdownMenuLabel>
          {companies.map((company, index) => (
            <DropdownMenuItem
              key={company._id}
              onClick={() => setSelectedCompany(company._id as string)}
              className="gap-2 p-2"
            >
              <div className="flex size-6 items-center justify-center rounded-sm border">
                <Avatar className="h-5 w-5">
                  <AvatarImage
                    src={company.profile?.logo}
                    alt={company.name}
                    className="grayscale"
                  />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
              </div>
              {company.name}
              <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <CreateCompany
        onClose={() => {
          setShowNewTeamDialog(false);
        }}
      />
    </Dialog>
  );
}
