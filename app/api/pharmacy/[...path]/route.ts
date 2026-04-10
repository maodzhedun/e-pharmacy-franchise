import { NextRequest } from 'next/server';
import { proxyToBackend } from '../../proxy';

async function handler(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  const p = '/' + path.join('/');
  const search = req.nextUrl.search;
  return proxyToBackend(req, p + search);
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const DELETE = handler;
