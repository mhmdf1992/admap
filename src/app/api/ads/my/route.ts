import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";

  export async function GET(
    req: Request
  ) {
      const cookieStore = await cookies();
      const token = cookieStore.get('access_token')?.value;
      const headersList = await headers();
      const response = await fetch(`${process.env.API_URI}/ads/my`, {
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