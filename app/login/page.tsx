"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Package, Lock, User, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Login Successful",
          description: "Welcome to Stock Management System",
        });
        router.push("/");
        router.refresh();
      } else {
        const data = await response.json();
        setError(data.error || "Login failed");
      }
    } catch (error) {
      setError("Connection error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 p-3 md:p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-purple-400/20 to-pink-400/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-80 h-80 bg-gradient-to-t from-indigo-400/20 to-blue-400/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iYSIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVHJhbnNmb3JtPSJyb3RhdGUoNDUpIj48cmVjdCB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIGZpbGw9Im5vbmUiLz48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxLjUiIGZpbGw9IiNlMmU4ZjAiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjYSkiLz48L3N2Zz4=')] opacity-30"></div>

      <Card className="w-full max-w-sm mx-auto glass-effect border-0 shadow-2xl backdrop-blur-xl relative z-10 transform transition-all duration-300 hover:scale-[1.02]">
        <CardHeader className="text-center space-y-6 px-6 pt-8 pb-4">
          <div className="flex justify-center">
            <div className="relative group">
              <div className="p-4 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-3xl shadow-xl transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl">
                <Package className="h-12 w-12 text-white" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-3xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
            </div>
          </div>
          <div className="space-y-2">
            <CardTitle className="text-2xl md:text-3xl font-bold gradient-text">
              Stock Management
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="px-6 pb-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <Alert
                variant="destructive"
                className="border-red-200 bg-red-50/80 backdrop-blur-sm rounded-xl"
              >
                <AlertDescription className="text-red-700 text-sm font-medium">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-3">
              <Label
                htmlFor="username"
                className="text-sm font-semibold text-slate-700"
              >
                Username
              </Label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors duration-200" />
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  className="pl-12 h-14 rounded-2xl border-slate-200 bg-white/60 backdrop-blur-sm focus:border-blue-500 focus:ring-blue-500 focus:bg-white/80 transition-all duration-200 text-base placeholder:text-slate-400"
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label
                htmlFor="password"
                className="text-sm font-semibold text-slate-700"
              >
                Password
              </Label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors duration-200" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="pl-12 pr-14 h-14 rounded-2xl border-slate-200 bg-white/60 backdrop-blur-sm focus:border-blue-500 focus:ring-blue-500 focus:bg-white/80 transition-all duration-200 text-base placeholder:text-slate-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:text-blue-500 transition-colors duration-200 p-1 rounded-lg hover:bg-slate-100/50"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-14 bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 hover:from-blue-600 hover:via-blue-700 hover:to-purple-700 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] focus:scale-[1.02] text-base mt-6"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Signing in...
                </div>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="mt-8 p-5 bg-gradient-to-r from-blue-50/80 to-purple-50/80 backdrop-blur-sm rounded-2xl border border-blue-100/50">
            <div className="text-sm font-bold text-blue-700 text-center mb-4 flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Demo Credentials
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-white/60 rounded-xl backdrop-blur-sm">
                <span className="font-semibold text-slate-700 text-sm">
                  Username:
                </span>
                <code className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg font-mono text-sm font-semibold">
                  admin
                </code>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/60 rounded-xl backdrop-blur-sm">
                <span className="font-semibold text-slate-700 text-sm">
                  Password:
                </span>
                <code className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg font-mono text-sm font-semibold">
                  admin123
                </code>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
