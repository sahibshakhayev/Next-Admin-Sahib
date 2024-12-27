import { NextResponse } from 'next/server';
import axios from 'axios';

import { API_BASE_URL } from "../../../../providers/config";

export async function GET(request) {
  const authHeader = request.headers.get('Authorization');
  const accessToken = authHeader?.split(' ')[1];

  if (!accessToken) {
    return NextResponse.json({ message: 'Access token is missing' }, { status: 401 });
  }

  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/me`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return NextResponse.json(data);
  } catch (error) {
    const status = error.response?.status || 500;
    const message = error.response?.data?.message || 'Failed to fetch user info';
    return NextResponse.json({ message }, { status });
  }
}
