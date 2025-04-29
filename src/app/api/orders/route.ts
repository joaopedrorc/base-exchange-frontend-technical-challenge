import { promises as fs } from 'fs';
import { formSchema } from '@/lib/schema';
import { Order } from '@/types';
import { redirect } from 'next/navigation';

const filePath = process.cwd() + '/src/mocks/data.json';
function parsePrice(price: string) {
  return Number(
    price
      .replace(/\./g, '') // remove separadores de milhar (ponto)
      .replace(',', '.') // substitui vírgula decimal por ponto
      .replace(/[^\d.]/g, '') // remove qualquer caractere que não seja número ou ponto
  );
}

export async function GET(): Promise<Response> {
  const response = await fs.readFile(filePath, 'utf-8');

  const data = JSON.parse(response);

  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
    status: 200,
  });
}

export async function POST(request: Request) {
  const formData = await request.json();

  const {
    success: schemaValidationSuccess,
    error: schemaValidationError,
    data: schemaValidationData,
  } = formSchema.safeParse(formData);

  if (!schemaValidationSuccess) {
    return new Response(
      JSON.stringify({
        success: false,
        errors: schemaValidationError.flatten().fieldErrors,
        values: formData,
      }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }

  const response = await fs.readFile(filePath, 'utf-8');

  const file = await JSON.parse(response);

  const newId = (file.length > 0 ? file.length : 0) + 1;
  const newOrder = {
    ...schemaValidationData,
    id: `ORD-${newId}`,
    status: 'Aberta',
    amountLeft: Number(schemaValidationData.amount),
    dateAndTime: new Date().toLocaleString('pt-BR'),
    history: [`Pedido criado em ${new Date().toLocaleString('pt-BR')}`],
  };

  const oppositeSide = newOrder.side === 'Compra' ? 'Venda' : 'Compra';
  const matchingOrder = file.find((order: any) => {
    if (
      order.side === oppositeSide &&
      order.status !== 'Executada' &&
      order.status !== 'Cancelada' &&
      order.asset === newOrder.asset
    ) {
      const newOrderPrice = parsePrice(newOrder.price);
      const orderPrice = parsePrice(order.price);

      if (newOrder.side === 'Compra') {
        return newOrderPrice >= orderPrice;
      } else {
        return newOrderPrice <= orderPrice;
      }
    } else {
      return false;
    }
  });

  if (matchingOrder) {
    if (newOrder.amountLeft === matchingOrder.amountLeft) {
      newOrder.status = 'Executada';
      matchingOrder.status = 'Executada';
      newOrder.amountLeft = 0;
      matchingOrder.amountLeft = 0;
      newOrder.history.push(
        `Ordem totalmente executada com ${matchingOrder.id} em ${new Date().toLocaleString('pt-BR')}`
      );
      matchingOrder.history.push(
        `Ordem totalmente executada com ${newOrder.id} em ${new Date().toLocaleString('pt-BR')}`
      );
    } else if (newOrder.amountLeft > matchingOrder.amountLeft) {
      newOrder.amountLeft -= matchingOrder.amountLeft;
      newOrder.status = 'Parcial';
      matchingOrder.amountLeft = 0;
      matchingOrder.status = 'Executada';
      newOrder.history.push(
        `Execução parcial contra ${matchingOrder.id} em ${new Date().toLocaleString('pt-BR')}`
      );
      matchingOrder.history.push(
        `Ordem totalmente executada com ${newOrder.id} em ${new Date().toLocaleString('pt-BR')}`
      );
    } else {
      matchingOrder.amountLeft -= newOrder.amountLeft;
      matchingOrder.status = 'Parcial';
      newOrder.amountLeft = 0;
      newOrder.status = 'Executada';
      newOrder.history.push(
        `Ordem totalmente executada com ${matchingOrder.id} em ${new Date().toLocaleString('pt-BR')}`
      );
      matchingOrder.history.push(
        `Execução parcial contra ${newOrder.id} em ${new Date().toLocaleString('pt-BR')}`
      );
    }
  }

  const updatedFile = file.map((order: any) => {
    if (order.id === matchingOrder?.id) {
      return matchingOrder;
    }
    return order;
  });

  updatedFile.push(newOrder);

  await fs.writeFile(filePath, JSON.stringify(updatedFile, null, 2), 'utf-8');

  return new Response(JSON.stringify(newOrder), {
    headers: { 'Content-Type': 'application/json' },
    status: 201,
  });
}

export async function PATCH(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return new Response(
        JSON.stringify({ error: 'ID da ordem é obrigatório.' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const data = await fs.readFile(filePath, 'utf-8');
    const orders = JSON.parse(data);

    const orderIndex = orders.findIndex((order: Order) => order.id === id);

    if (orderIndex === -1) {
      return new Response(JSON.stringify({ error: 'Ordem não encontrada.' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const order = orders[orderIndex];

    if (order.status === 'Cancelada' || order.status === 'Executada') {
      return new Response(
        JSON.stringify({ error: 'A ordem já está cancelada ou executada.' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    orders[orderIndex] = {
      ...order,
      status: 'Cancelada',
      history: [
        ...(order.history || []),
        `Pedido cancelado em ${new Date().toLocaleString('pt-BR')}`,
      ],
    };

    await fs.writeFile(filePath, JSON.stringify(orders, null, 2), 'utf-8');

    return new Response(
      JSON.stringify({ success: true, order: orders[orderIndex] }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Erro ao cancelar ordem:', error);
    return new Response(
      JSON.stringify({ error: 'Erro interno do servidor.' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
