import { NextResponse } from 'next/server';
import axios from 'axios';

import { API_BASE_URL } from "../../../../providers/config";

export async function POST(request) {
  const authHeader = request.headers.get('Authorization');
  const refreshToken = authHeader?.split(' ')[1];

  if (!refreshToken) {
    return NextResponse.json({ message: 'Refresh token is missing' }, { status: 401 });
  }

  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/api/refresh`,
      {},
      { headers: { Authorization: `Bearer ${refreshToken}` } }
    );
    return NextResponse.json(data);
  } catch (error) {
    const status = error.response?.status || 500;
    const message = error.response?.data?.message || 'Failed to refresh token';
    return NextResponse.json({ message }, { status });
  }
}
