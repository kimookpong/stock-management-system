import { cookies } from "next/headers";

export interface User {
  username: string;
  role: string;
}

// Simple authentication - in production, use proper password hashing
const VALID_CREDENTIALS = {
  username: "admin",
  password: "admin123",
};

export async function authenticate(
  username: string,
  password: string
): Promise<User | null> {
  if (
    username === VALID_CREDENTIALS.username &&
    password === VALID_CREDENTIALS.password
  ) {
    return {
      username: "admin",
      role: "administrator",
    };
  }
  return null;
}

export async function createSession(user: User) {
  const cookieStore = await cookies();
  const sessionData = JSON.stringify(user);

  cookieStore.set("session", sessionData, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function getSession(): Promise<User | null> {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("session");

    if (!session) {
      return null;
    }

    return JSON.parse(session.value);
  } catch {
    return null;
  }
}

export async function destroySession() {
  try {
    const cookieStore = await cookies();

    // Delete the session cookie with proper options
    cookieStore.set("session", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0, // Expire immediately
      path: "/", // Ensure it clears for the entire site
    });

    // Also try to delete it directly
    cookieStore.delete("session");
  } catch (error) {
    console.error("Error destroying session:", error);
    throw error;
  }
}
