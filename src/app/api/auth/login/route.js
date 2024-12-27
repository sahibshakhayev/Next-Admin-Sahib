import { NextResponse } from 'next/server';
import axios from 'axios';

import { API_BASE_URL } from "../../../../providers/config";

export async function POST(request) {
  const { email, password } = await request.json();

  try {
    const { data } = await axios.post(`${API_BASE_URL}/api/login`, { email, password });
    return NextResponse.json(data);
  } catch (error) {
    const status = error.response?.status || 500;
    const message = error.response?.data?.message || 'Something went wrong';
    return NextResponse.json({ message }, { status });
  }
}
