import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useSidebar } from "../ui/sidebar";

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const navItems = [
  "General",
  "Order Regulation",
  "Meal Contribution",
  "Timeline Scheduler",
];
const navUrls: Record<string, string> = {
  General: "",
  "Order Regulation": "/regulation",
  "Meal Contribution": "/contribution",
  "Timeline Scheduler": "/timeline",
};

export function Header({ activeSection, setActiveSection }: HeaderProps) {
  const { open } = useSidebar();

  const navRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const [indicatorStyles, setIndicatorStyles] = useState<{
    left: number;
    width: number;
  }>({
    left: 0,
    width: 0,
  });
  const [lineStyles, setLineStyles] = useState<{
    left: number;
    width?: number;
  }>({
    left: 0,
    width: 0,
  });
  const [indicatorVisible, setIndicatorVisible] = useState(false);
  const [justActivated, setJustActivated] = useState(false);
  const [justRendered, setJustRendered] = useState(true);

  useEffect(() => {
    // On initial mount, after rendering:
    setJustRendered(false);
  }, []);

  useEffect(() => {
    const idx = getItemIndex(activeSection);
    if (itemRefs.current[idx] && navRef.current) {
      const navRect = navRef.current.getBoundingClientRect();
      const itemRect = itemRefs.current[idx]!.getBoundingClientRect();
      setLineStyles({
        left: itemRect.left - navRect.left + 8,
        width: itemRect.width - 16,
      });
    }
  }, [activeSection]);

  function updateIndicator(index: number) {
    if (itemRefs.current[index] && navRef.current) {
      const navRect = navRef.current.getBoundingClientRect();
      const itemRect = itemRefs.current[index]!.getBoundingClientRect();
      setIndicatorStyles({
        left: itemRect.left - navRect.left,
        width: itemRect.width,
      });
    }
  }

  function getActiveIndex() {
    return navItems.findIndex((item) => item === activeSection);
  }

  function getItemIndex(item: string) {
    return navItems.findIndex((i) => i === item);
  }

  // Position the indicator at the active item on changes to activeSection.
  useEffect(() => {
    const activeIndex = getActiveIndex();
    if (activeIndex !== -1 && itemRefs.current[activeIndex] && navRef.current) {
      // Place the indicator at the active item's position
      updateIndicator(activeIndex);
      // Keep it invisible initially so it doesn't jump from somewhere else
      setIndicatorVisible(false);
      setJustActivated(true);
    } else {
      // No active item, hide indicator and reset position
      setIndicatorVisible(false);
      setJustActivated(false);
      setIndicatorStyles({ left: 0, width: 0 });
    }
  }, [activeSection]);

  function handleItemMouseEnter(index: number) {
    if (!indicatorVisible) {
      // Indicator is hidden, show instantly at hovered item
      updateIndicator(index);
      setIndicatorVisible(true);
      setJustActivated(true);
    } else {
      // Indicator is visible, animate to new position
      updateIndicator(index);
      setJustActivated(false);
    }
  }

  function handleNavMouseLeave() {
    // Hide indicator instantly when leaving nav
    setIndicatorVisible(false);
    setJustActivated(false);
  }

  function handleItemClick(item: string) {
    setActiveSection(navUrls[item]);
  }

  return (
    <header
      className={cn(
        "fixed -ml-4 transition-all duration-400 w-full shadow-sm bg-background z-30 border-b",
        open ? "top-16" : "top-12",
      )}
    >
      <nav
        ref={navRef}
        className="px-4 relative"
        onMouseLeave={handleNavMouseLeave}
      >
        <motion.div
          className="absolute top-0 h-full bg-accent z-0 rounded-lg"
          initial={{
            left: indicatorStyles.left,
            width: indicatorStyles.width,
            opacity: indicatorVisible ? 1 : 0,
          }}
          animate={{
            left: indicatorStyles.left,
            width: indicatorStyles.width,
            opacity: indicatorVisible ? 1 : 0,
          }}
          transition={
            justActivated
              ? {
                  left: { duration: 0 }, // Instantly place the indicator
                  width: { duration: 0 }, // Instantly set width
                  opacity: {
                    duration: justRendered ? 0 : 0.2,
                    ease: "easeInOut",
                  }, // Smooth opacity fade in if not the first render
                }
              : {
                  left: { type: "spring", stiffness: 300, damping: 30 },
                  width: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.3, ease: "easeInOut" },
                }
          }
        />
        <ul className="flex relative z-10 mb-2 mt-2">
          {navItems.map((item, index) => (
            <li key={item} className="relative">
              <button
                ref={(el: any) => (itemRefs.current[index] = el)}
                onMouseEnter={() => handleItemMouseEnter(index)}
                onClick={() => handleItemClick(item)}
                className={cn(
                  "py-2 px-4 text-sm font-medium transition-colors duration-300 text-muted-foreground hover:text-primary",
                  activeSection === item && "text-primary",
                )}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
        {/* a line that follows the active item */}
      </nav>
      <motion.div
        animate={{
          width: lineStyles.width,
          left: lineStyles.left,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="absolute bottom-0 h-0.5 bg-primary rounded-lg"
      />
    </header>
  );
}
