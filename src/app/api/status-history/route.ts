// app/api/status-history/route.ts
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import { Order } from '@/types';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const data = JSON.parse(
    fs.readFileSync(process.cwd() + '/src/mocks/data.json', 'utf-8')
  );
  const order = data.find((order: Order) => order.id === id);
  //TODO: Format the pt-br date and time

  return NextResponse.json({ history: order.history || [] });
}
