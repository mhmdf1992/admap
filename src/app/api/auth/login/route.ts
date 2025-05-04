import { IApiResponse } from '@/types/api-response';
import { ILoginResponseData } from '@/types/login-response';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
 
export async function POST(
  req: Request
) {
    const cred = await req.json();
    const response = await fetch(`${process.env.API_URI}/auth/login`, {
        method: 'POST',
        body: JSON.stringify(cred),
        headers: {
          'Content-Type': 'application/json'
        }
    })
    const result = await response.json() as IApiResponse<ILoginResponseData>;
    if(response.status === 200){
      (await cookies()).set('access_token', result.data.token);
      (await cookies()).set('user_id', result.data.user_id);
    }
    return NextResponse.json(result, {status: response.status});
}