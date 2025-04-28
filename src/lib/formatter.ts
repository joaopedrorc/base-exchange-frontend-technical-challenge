export function formatToBRL(value: string) {
  const numericValue = value.replace(/\D/g, '');
  const amount = parseInt(numericValue || '0', 10) / 100;
  return amount.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

export function formatInteger(value: string) {
  let numericValue = value.replace(/\D/g, '');
  let intValue = parseInt(numericValue || '0', 10);

  if (intValue > 1000) {
    intValue = 1000;
  }

  return intValue > 0 ? intValue.toString() : '';
}
