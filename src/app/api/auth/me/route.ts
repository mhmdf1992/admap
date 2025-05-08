import { IApiResponse } from '@/types/api-response';
import { IJWTPayload } from '@/types/jwt-payload';
import { ILoginResponseData } from '@/types/login-response';
import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
 
export async function GET(
  req: Request
) {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;
  const payload = jwtDecode(token ?? '') as IJWTPayload;
  return NextResponse.json(payload);
}