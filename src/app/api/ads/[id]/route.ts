import { AdStatus } from '@/types/ad-item';
import { IJWTPayload } from '@/types/jwt-payload';
import { IUpdateStatus } from '@/types/update-status';
import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
 
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
    const cookieStore = cookies();
    const response = await fetch(`${process.env.API_URI}/ads/${(await params).id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${(await cookieStore).get('access_token')?.value}`
        }
    })
    const result = await response.json();
    return NextResponse.json(result, {status: response.status});
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
    const cookieStore = cookies();
    const response = await fetch(`${process.env.API_URI}/ads/${(await params).id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${(await cookieStore).get('access_token')?.value}`
        }
    })
    const result = await response.json();
    return NextResponse.json(result, {status: response.status});
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const createAdItem = await req.json();
  const id = (await params).id;
  const cookieStore = cookies();
  const response = await fetch(`${process.env.API_URI}/ads/${id}`, {
      method: 'PUT',
      body: JSON.stringify(createAdItem),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${(await cookieStore).get('access_token')?.value}`
      }
  })
  const result = await response.json();
  return NextResponse.json(result, {status: response.status});
}

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
  ) {
    const statusUpdate = await req.json() as IUpdateStatus;
      const cookieStore = await cookies();
      const token = cookieStore.get('access_token')?.value;
      const response = await fetch(`${process.env.API_URI}/ads-admin/${(await params).id}`, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(statusUpdate)
      })
      const result = await response.json();
      return NextResponse.json(result, {status: response.status});
  }