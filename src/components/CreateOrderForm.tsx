'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from 'sonner';
import { formatInteger, formatToBRL } from '@/lib/formatter';
import { formSchema } from '@/lib/schema';

export function CreateOrderForm() {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      asset: '',
      side: 'Compra',
      price: '',
      amount: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        body: JSON.stringify(values),
      });

      const payload = await res.json();

      if (!res.ok) {
        return toast.error(
          `Erro: ${payload?.errors ? JSON.stringify(payload.errors) : 'Não foi possível criar a ordem.'}`
        );
      }

      toast.success(`Ordem de ${values.side} criada com sucesso!`);
    } catch (error) {
      console.log('ERROR', error);

      toast.error(
        `Atenção: ordem de ${values.side} não foi criada. Tente novamente mais tarde.`
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-4 space-y-8 lg:grid-cols-4"
        >
          <FormField
            control={form.control}
            name="asset"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ações</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione uma ação" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="B3SA3">B3 (B3SA3)</SelectItem>
                        <SelectItem value="BBAS3">
                          Banco do Brasil (BBAS3)
                        </SelectItem>
                        <SelectItem value="PETR4">Petrobras (PETR4)</SelectItem>
                        <SelectItem value="HAPV3">Hapvida (HAPV3)</SelectItem>
                        <SelectItem value="ITUB4">
                          Itaú Unibanco (ITUB4)
                        </SelectItem>
                        <SelectItem value="BBDC4">Bradesco (BBDC4)</SelectItem>
                        <SelectItem value="VALE3">Vale (VALE3)</SelectItem>
                        <SelectItem value="CMIG4">Cemig (CMIG4)</SelectItem>
                        <SelectItem value="ABEV3">Ambev (ABEV3)</SelectItem>
                        <SelectItem value="BEEF3">Minerva (BEEF3)</SelectItem>
                        <SelectItem value="MGLU3">
                          Magazine Luiza (MGLU3)
                        </SelectItem>
                        <SelectItem value="PETZ3">
                          Pet Center (PETZ3)
                        </SelectItem>
                        <SelectItem value="RADL3">
                          Raia Drogasil (RADL3)
                        </SelectItem>
                        <SelectItem value="WEGE3">WEG (WEGE3)</SelectItem>
                        <SelectItem value="SUZB3">Suzano (SUZB3)</SelectItem>
                        <SelectItem value="RENT3">Localiza (RENT3)</SelectItem>
                        <SelectItem value="ELET3">
                          Eletrobras (ELET3)
                        </SelectItem>
                        <SelectItem value="GGBR4">Gerdau (GGBR4)</SelectItem>
                        <SelectItem value="CSNA3">CSN (CSNA3)</SelectItem>
                        <SelectItem value="KLBN11">Klabin (KLBN11)​</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>As 20 ações mais negociadas.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="side"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Operação</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione uma operação" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Compra">Compra</SelectItem>
                        <SelectItem value="Venda">Venda</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>Operação de compra/venda.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preço</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    inputMode="numeric"
                    pattern="^(\s?R\$)?\s?\d{1,3}(\.\d{3})*(,\d{2})?$"
                    placeholder="R$ 10,99"
                    onChange={(e) =>
                      field.onChange(formatToBRL(e.target.value))
                    }
                    value={field.value}
                  />
                </FormControl>
                <FormDescription>Preço de negociação.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantidade</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value}
                    onChange={(e) =>
                      field.onChange(formatInteger(e.target.value))
                    }
                    type="text"
                    inputMode="numeric"
                    placeholder="2 un."
                  />
                </FormControl>
                <FormDescription>Digite um número de 1 a 1000.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={loading}>
            {loading ? 'enviando' : 'Criar ordem'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
