import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import { Order } from '@/types';
import { filePath } from '@/lib/constants';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    const file = await fs.readFile(filePath, 'utf-8');
    const data: Order[] = JSON.parse(file);

    const order = data.find((order: Order) => order.id === id);

    if (!order) {
      return NextResponse.json({ message: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ history: order.history }, { status: 200 });
  } catch (error) {
    console.error('Failed to load order history:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
