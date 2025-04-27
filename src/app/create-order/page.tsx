import { CreateOrderForm } from '@/components/CreateOrderForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default async function CreateOrder() {
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
          <CardTitle className="text-slate-900">Crie uma Nova Ordem</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-slate-800">
          <CreateOrderForm />
        </CardContent>
      </Card>
    </div>
  );
}
