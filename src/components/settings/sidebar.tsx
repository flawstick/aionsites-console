import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronRight, Building, Utensils, FileText } from "lucide-react";
import { ThemeToggle } from "../theme-toggle";

const menuItems = [
  { icon: Building, label: "General", href: "#general" },
  { icon: FileText, label: "Order Regulation", href: "#order-regulation" },
  { icon: Utensils, label: "Meal Contribution", href: "#meal-contribution" },
];

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export function Sidebar({ activeSection, setActiveSection }: SidebarProps) {
  return (
    <aside className="flex w-64 bg-background p-4">
      <ScrollArea className="flex flex-col h-[calc(80vh)] mt-10">
        <nav className="space-y-2 mt-30">
          {menuItems.map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              className={`w-full justify-start gap-3 transition-all duration-300 ease-in-out ${
                activeSection === item.label
                  ? "bg-primary/20 text-foreground hover:bg-primary/30 dark:bg-primary/10 dark:hover:bg-primary/20"
                  : "hover:bg-primary/10"
              }`}
              onClick={() => setActiveSection(item.label)}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
              <ChevronRight
                className={`ml-auto h-5 w-5 transition-transform duration-300 ${
                  activeSection === item.label ? "" : "rotate-180"
                }`}
              />
            </Button>
          ))}
        </nav>
      </ScrollArea>
      <div className="fixed bottom-4 left-4">
        <ThemeToggle />
      </div>
    </aside>
  );
}
