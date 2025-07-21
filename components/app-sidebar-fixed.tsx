"use client";

import {
  Package,
  Plus,
  Minus,
  ArrowRightLeft,
  Settings,
  Home,
  Tags,
  Warehouse,
  LogOut,
  History,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useSidebar } from "@/components/ui/sidebar";
import Link from "next/link";
import { UserInfo } from "@/components/user-info";

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Warehouses",
    url: "/warehouses",
    icon: Warehouse,
  },
  {
    title: "SKU Groups",
    url: "/sku-groups",
    icon: Tags,
  },
  {
    title: "Products (SKU)",
    url: "/skus",
    icon: Package,
  },
];

const stockMovements = [
  {
    title: "Stock Transactions",
    url: "/transactions",
    icon: History,
  },
  {
    title: "Receive Stock",
    url: "/movements/receive",
    icon: Plus,
  },
  {
    title: "Issue Stock",
    url: "/movements/issue",
    icon: Minus,
  },
  {
    title: "Transfer Stock",
    url: "/movements/transfer",
    icon: ArrowRightLeft,
  },
  {
    title: "Adjust Stock",
    url: "/movements/adjust",
    icon: Settings,
  },
];

export function AppSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  const { setOpenMobile, isMobile } = useSidebar();

  const handleMenuClick = () => {
    // Close mobile menu when a menu item is clicked
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (response.ok) {
        toast({
          title: "Logout Successful",
          description: "Thank you for using our service",
        });
        router.push("/login");
        router.refresh();
      }
    } catch (error) {
      toast({
        title: "Error Occurred",
        description: "Unable to logout",
        variant: "destructive",
      });
    }
  };

  return (
    <Sidebar className="border-r-0 bg-gradient-to-b from-slate-50 to-white shadow-xl">
      <SidebarHeader className="border-b border-slate-200 p-6 bg-white/80 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
            <Package className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold gradient-text">
              Stock Management
            </h2>
          </div>
        </div>
        <UserInfo />
      </SidebarHeader>
      <SidebarContent className="px-3 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
            Main Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={`hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-all duration-200 ${
                        isActive
                          ? "bg-blue-100 text-blue-800 border border-blue-200 shadow-sm"
                          : ""
                      }`}
                    >
                      <Link
                        href={item.url}
                        className="flex items-center gap-3 px-3 py-2.5"
                        onClick={handleMenuClick}
                      >
                        <item.icon
                          className={`h-4 w-4 ${
                            isActive ? "text-blue-700" : ""
                          }`}
                        />
                        <span
                          className={`font-medium ${
                            isActive ? "font-semibold" : ""
                          }`}
                        >
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
            Stock Movements
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {stockMovements.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={`hover:bg-emerald-50 hover:text-emerald-700 rounded-lg transition-all duration-200 ${
                        isActive
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-200 shadow-sm"
                          : ""
                      }`}
                    >
                      <Link
                        href={item.url}
                        className="flex items-center gap-3 px-3 py-2.5"
                        onClick={handleMenuClick}
                      >
                        <item.icon
                          className={`h-4 w-4 ${
                            isActive ? "text-emerald-700" : ""
                          }`}
                        />
                        <span
                          className={`font-medium ${
                            isActive ? "font-semibold" : ""
                          }`}
                        >
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <div className="mt-auto p-4 border-t border-slate-200 bg-white/50">
        <Button
          variant="ghost"
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 font-medium"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </Sidebar>
  );
}
