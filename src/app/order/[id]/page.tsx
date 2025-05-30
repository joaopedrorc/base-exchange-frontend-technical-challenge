import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import fs from 'fs/promises';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Order } from '@/types';
import { Badge } from '@/components/ui/badge';
import { redirect } from 'next/navigation';
import { StatusHistory } from '@/components/StatusHistory';
import { badgeTheme } from '@/lib/utils';
import { Modal } from '@/components/Modal';
import { filePath } from '@/lib/constants';

async function getOrderDetails(orderId: string): Promise<Order | null> {
  try {
    const file = await fs.readFile(filePath, 'utf-8');
    const data: Order[] = JSON.parse(file);

    const filteredData = data.filter((item: Order) => item.id === orderId);

    return filteredData[0];
  } catch (error) {
    console.error('Error reading or parsing data:', error);

    return null;
  }
}

export default async function OrderDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getOrderDetails(id);

  if (!data) {
    redirect('/');
  }

  const {
    id: dataId,
    asset,
    side,
    price,
    amount,
    amountLeft,
    status,
    dateAndTime,
  } = data;

  return (
    <div>
      <div className="mb-4">
        <Button className="bg-slate-800">
          <Link href="/" className="flex flex-row items-center gap-1">
            <ArrowLeft />
            <span className="text-sm">Votar</span>
          </Link>
        </Button>
      </div>

      <Card className="rounded-2xl border-slate-200 bg-slate-50 p-4 shadow-md">
        <CardHeader>
          <CardTitle className="text-slate-900">Operação #{dataId}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-slate-800">
          <div className="flex justify-between">
            <span className="font-medium">Código da ação:</span>
            <span>{asset}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Tipo de operação:</span>
            <span>{side}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Preço da ação:</span>
            <span>R$ {price}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Quantidade:</span>
            <span>{amount}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Quantidade restante:</span>
            <span>{amountLeft}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Status:</span>
            <Badge className={badgeTheme[status]}>{status}</Badge>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Data/Hora:</span>
            <span>{dateAndTime}</span>
          </div>
          {(status === 'Aberta' || status === 'Parcial') && (
            <div className="my-4 flex justify-between">
              <Modal orderId={dataId} orderStatus={status} />
              <span />
            </div>
          )}
          <StatusHistory id={id} />
        </CardContent>
      </Card>
    </div>
  );
}
