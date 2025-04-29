import { Order } from '@/types';
import { Datagrid } from '@/components/Datagrid/Datagrid';

import fs from 'fs/promises';
import { columns } from '@/components/Datagrid/columns';
import { filePath } from '@/lib/constants';

async function getData(): Promise<Order[]> {
  try {
    const file = await fs.readFile(filePath, 'utf-8');

    const data: Order[] = JSON.parse(file);
    return data;
  } catch (error) {
    console.error('Error reading or parsing data:', error);
    return [];
  }
}

export default async function Home() {
  const data = await getData();

  return (
    <div>
      <Datagrid columns={columns} data={data} />
    </div>
  );
}
