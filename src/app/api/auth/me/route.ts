import { IJWTPayload } from '@/types/jwt-payload';
import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
 
export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;
  const payload = jwtDecode(token ?? '') as IJWTPayload;
  return NextResponse.json(payload);
}