import { Order } from '@/types';
import { Datagrid } from '@/components/Datagrid/Datagrid';

import fs from 'fs';
import { NextResponse } from 'next/server';
import { columns } from '@/components/Datagrid/columns';

export async function getData(): Promise<Order[]> {
  try {
    const data = JSON.parse(
      fs.readFileSync(process.cwd() + '/src/mocks/data.json', 'utf-8')
    );

    return data;
  } catch (error) {
    console.error('Error reading or parsing data:', error);
    NextResponse.json({ message: 'Error fetching data' }, { status: 500 });

    return [];
  }
}

export default async function Home() {
  const data = await getData();

  // const data = await fetch('http://localhost:3000/api/orders');
  // const data = JSON.parse(response);

  return (
    <div>
      <Datagrid columns={columns} data={data} />
    </div>
  );
}
