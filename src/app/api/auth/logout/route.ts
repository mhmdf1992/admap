import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
 
export async function POST(
  req: Request
) {
    (await cookies()).delete('access_token');
    (await cookies()).delete('user_id');
    return NextResponse.json({});
}