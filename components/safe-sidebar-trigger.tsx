"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";

/**
 * A safe wrapper for SidebarTrigger that only renders when the component
 * is mounted on the client side and within a SidebarProvider context.
 * This prevents SSR/prerendering issues.
 */
export function SafeSidebarTrigger() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // Return a placeholder with the same dimensions during SSR
    return <div className="h-7 w-7" />;
  }

  try {
    return <SidebarTrigger />;
  } catch (error) {
    // If useSidebar fails, return a placeholder
    console.warn("SidebarTrigger failed to render:", error);
    return <div className="h-7 w-7" />;
  }
}
