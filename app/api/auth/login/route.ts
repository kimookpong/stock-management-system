import { type NextRequest, NextResponse } from "next/server"
import { authenticate, createSession } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json({ error: "กรุณากรอกชื่อผู้ใช้และรหัสผ่าน" }, { status: 400 })
    }

    const user = await authenticate(username, password)

    if (!user) {
      return NextResponse.json({ error: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" }, { status: 401 })
    }

    await createSession(user)

    return NextResponse.json({ success: true, user })
  } catch (error) {
    return NextResponse.json({ error: "เกิดข้อผิดพลาดในระบบ" }, { status: 500 })
  }
}
