"use client";

import {
  Breadcrumb,
  BreadcrumbSeparator,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb";
import { useSidebar } from "@/components/ui/sidebar";

export function Breadcrumbs() {
  const { breadcrumbs } = useSidebar();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((crumb) => (
          <>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href={crumb.href}>{crumb.label}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
