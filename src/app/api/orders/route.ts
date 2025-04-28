import { Order } from '@/components/Datagrid/columns';

import { promises as fs } from 'fs';
import { NextResponse } from 'next/server';

export async function GET(): Promise<Order[]> {
  try {
    const file = await fs.readFile(
      process.cwd() + '/src/mocks/data.json',
      'utf8'
    );
    const data = JSON.parse(file);
    return data;
  } catch (error) {
    console.error('Error reading or parsing data:', error);
    NextResponse.json({ message: 'Error fetching data' }, { status: 500 });

    return [];
  }
}

export async function POST(request: Request) {
  const data = await request.json();

  console.log('DATA', data);

  const newOrder = {
    id: `ORD-01`,
    data,
  };

  return new Response(JSON.stringify(newOrder), {
    headers: { 'Content-Type': 'application/json' },
    status: 201,
  });
}
