import { Order, columns } from '@/components/Datagrid/columns';
import { Datagrid } from '@/components/Datagrid/Datagrid';

import { promises as fs } from 'fs';
import { NextResponse } from 'next/server';

export async function getData(): Promise<Order[]> {
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

export default async function Home() {
  const data = await getData();

  return (
    <div className="">
      <Datagrid columns={columns} data={data} />
    </div>
  );
}
