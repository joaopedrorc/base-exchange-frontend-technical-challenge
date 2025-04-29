'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { toast } from 'sonner';

export function Modal({
  orderId,
  orderStatus,
}: {
  orderId: string;
  orderStatus: string;
}) {
  const [open, setOpen] = useState<boolean>(false);

  const deleteSelectedOrder = async (orderId: string, orderStatus: string) => {
    if (orderStatus === 'Cancelada' || orderStatus === 'Executada') {
      setOpen(false);
      return toast.error(
        'Atenção: somente operações Abertas ou Parciais podem ser canceladas.'
      );
    }

    const response = await fetch('/api/orders', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: orderId, status: 'Cancelada' }),
    });

    const data = await response.json();

    if (!response.ok) {
      toast.error(
        `Erro ao cancelar ordem: ${data.error}` || 'Erro ao cancelar ordem.'
      );
      setOpen(false);
      return;
    }

    toast.success('Ordem cancelada com sucesso!');

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">Cancelar ordem</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cancelar ordem</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja cancelar essa ordem?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="link" onClick={() => setOpen(false)}>
            Fechar
          </Button>
          <Button
            variant="destructive"
            onClick={() => deleteSelectedOrder(orderId, orderStatus)}
          >
            Cancelar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
