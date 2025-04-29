import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const badgeTheme: { [key: string]: string } = {
  Aberta: 'bg-blue-400',
  Parcial: 'bg-yellow-400',
  Executada: 'bg-green-600',
  Cancelada: 'bg-red-400',
};
