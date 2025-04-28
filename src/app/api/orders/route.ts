import fs from 'fs';
import { formSchema } from '@/lib/schema';

export async function GET(): Promise<Response> {
  const data = JSON.parse(
    fs.readFileSync(process.cwd() + '/src/mocks/data.json', 'utf-8')
  );

  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
    status: 200,
  });
}

// Order is created with status "Aberta"
// Order is executed (status : "Executada") when there is an open order
// with opposite side (buy/sell) and "price" igual or grader and there is
// enough amount

// when the counterpart has the same amount and grater or same price both are
// executed "Status: Executada"

// When the counterpart amount is grater the original order is executed with status
// partial and its amount updated

export async function POST(request: Request) {
  const data = await request.json();

  const {
    success: schemaValidationSuccess,
    error: schemaValidationError,
    data: schemaValidationData,
  } = formSchema.safeParse(data);

  if (!schemaValidationSuccess) {
    return new Response(
      JSON.stringify({
        success: false,
        errors: schemaValidationError.flatten().fieldErrors,
        values: data,
      }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }

  console.log('DATA', data);

  const newOrder = {
    id: `ORD-01`,
    data: schemaValidationData,
  };

  return new Response(JSON.stringify(newOrder), {
    headers: { 'Content-Type': 'application/json' },
    status: 201,
  });
}
