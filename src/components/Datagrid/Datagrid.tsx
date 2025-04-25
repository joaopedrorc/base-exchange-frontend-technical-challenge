'use client';

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  useReactTable,
  getSortedRowModel,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '../ui/button';
import { useState } from 'react';
import { Input } from '../ui/input';
import { Label } from '@radix-ui/react-label';

interface DatagridProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function Datagrid<TData, TValue>({
  columns,
  data,
}: DatagridProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [selectedRow, setSelectedRow] = useState<TData | null>(null);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  // Send to Order details page and fetch all details from that order

  return (
    <div>
      <h2 className="bold text-2xl">Filtros</h2>

      <div className="flex flex-col items-center gap-4 py-4 md:flex-row">
        <div className="max-w-3x flex w-full flex-col py-2 md:max-w-3xs">
          <Label htmlFor="id" className="text-xs">
            Por ID
          </Label>

          <Input
            name="id"
            className="max-w-full"
            placeholder="Digite um ID"
            value={(table.getColumn('id')?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
              table.getColumn('id')?.setFilterValue(event.target.value)
            }
          />
        </div>

        <div className="flex w-full flex-col py-2 md:max-w-3xs">
          <Label htmlFor="asset" className="text-xs">
            Por ação
          </Label>

          <Input
            name="asset"
            className="max-w-full md:max-w-3xs"
            placeholder="Digite uma ação"
            value={(table.getColumn('asset')?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
              table.getColumn('asset')?.setFilterValue(event.target.value)
            }
          />
        </div>

        <div className="flex w-full flex-col py-2 md:max-w-3xs">
          <Label htmlFor="status" className="text-xs">
            Por status
          </Label>

          <Input
            name="status"
            className="max-w-full md:max-w-3xs"
            placeholder="Digite um status"
            value={
              (table.getColumn('status')?.getFilterValue() as string) ?? ''
            }
            onChange={(event) =>
              table.getColumn('status')?.setFilterValue(event.target.value)
            }
          />
        </div>

        <div className="flex w-full flex-col py-2 md:max-w-3xs">
          <Label htmlFor="date" className="text-xs">
            Por data
          </Label>

          <Input
            name="asset"
            className="max-w-full md:max-w-3xs"
            placeholder="Digite uma data"
            value={
              (table.getColumn('dateAndTime')?.getFilterValue() as string) ?? ''
            }
            onChange={(event) =>
              table.getColumn('dateAndTime')?.setFilterValue(event.target.value)
            }
          />
        </div>

        <div className="flex w-full flex-col py-2 md:max-w-3xs">
          <Label htmlFor="side" className="text-xs">
            Por operação
          </Label>

          <Input
            name="side"
            className="max-w-full md:max-w-3xs"
            placeholder="Digite uma operação"
            value={(table.getColumn('side')?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
              table.getColumn('side')?.setFilterValue(event.target.value)
            }
          />
        </div>
      </div>

      <h2 className="bold mb-4 text-2xl">Tabela de operações</h2>

      <div className="text-muted-foreground flex-1 text-sm">
        Selecione uma operação clicando em cima da linha desejada.
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => {
                const isSelected = selectedRow === row.original;
                return (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                    className={
                      isSelected
                        ? 'cursor-pointer bg-slate-800'
                        : 'cursor-pointer'
                    }
                    onClick={() => setSelectedRow(row.original)}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className={isSelected ? 'text-white' : 'text-oklab'}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Sem resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Próxima
        </Button>
      </div>
    </div>
  );
}
