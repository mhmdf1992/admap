import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";
import { IJWTPayload, UserRole } from "@/types/jwt-payload";

export async function POST(
    req: Request
  ) {
      const createAdItem = await req.json();
      const cookieStore = cookies();
      const response = await fetch(`${process.env.API_URI}/ads`, {
          method: 'POST',
          body: JSON.stringify(createAdItem),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${(await cookieStore).get('access_token')?.value}`
          }
      })
      const result = await response.json();
      return NextResponse.json(result, {status: response.status});
  }
  export async function GET() {
      const cookieStore = await cookies();
      const token = cookieStore.get('access_token')?.value;
      const payload = jwtDecode(token ?? '') as IJWTPayload;
      const headersList = await headers()
      const response = await fetch(`${process.env.API_URI}/ads${payload.role === UserRole.ADMIN ? '-admin' : ''}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'page': headersList.get('page') ?? '',
            'page_size': headersList.get('page_size') ?? ''
          }
      })
      const result = await response.json();
      return NextResponse.json(result, {status: response.status});
  }