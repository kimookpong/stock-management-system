"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { User } from "lucide-react";

interface UserData {
  username: string;
  role: string;
}

export function UserInfo() {
  const [user, setUser] = useState<UserData | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Get user info from session
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
        }
      })
      .catch(() => {
        // Handle error silently
      });
  }, []);

  // Prevent hydration mismatch by not rendering until client-side mounted
  if (!mounted) {
    return (
      <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-muted/50">
        <User className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Loading...</span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-muted/50">
        <User className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Loading...</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-muted/50">
      <User className="h-4 w-4 text-muted-foreground" />
      <span className="text-sm font-medium">{user.username}</span>
      <Badge variant="secondary" className="text-xs">
        {user.role === "administrator" ? "Administrator" : user.role}
      </Badge>
    </div>
  );
}
