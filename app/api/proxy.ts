//app/api/proxy.ts

import { NextRequest, NextResponse } from 'next/server';

const BACKEND = process.env.BACKEND_URL || 'http://localhost:3001';

export async function proxyToBackend(req: NextRequest, path: string) {
  const url = `${BACKEND}/api${path}`;
  const headers = new Headers();
  
  // Forward cookies
  const cookie = req.headers.get('cookie');
  if (cookie) headers.set('cookie', cookie);
  
  // Forward auth header
  const auth = req.headers.get('authorization');
  if (auth) headers.set('authorization', auth);

  const contentType = req.headers.get('content-type') || '';
  
  let body: any = undefined;
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    if (contentType.includes('multipart/form-data')) {
      body = await req.arrayBuffer();
      headers.set('content-type', contentType);
    } else {
      body = await req.text();
      headers.set('content-type', 'application/json');
    }
  }

  const backendRes = await fetch(url, { method: req.method, headers, body });
  
  const resHeaders = new Headers();
  // Forward set-cookie
  backendRes.headers.forEach((value, key) => {
    if (key.toLowerCase() === 'set-cookie') resHeaders.append(key, value);
    if (key.toLowerCase() === 'content-type') resHeaders.set(key, value);
  });

  const data = await backendRes.arrayBuffer();
  return new NextResponse(data, {
    status: backendRes.status,
    headers: resHeaders,
  });
}
