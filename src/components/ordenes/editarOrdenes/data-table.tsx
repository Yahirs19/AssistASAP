"use client"

import { useState, useMemo, useEffect } from "react";

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
  } from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog";

  import { Button } from "@/components/ui/button";
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  
  import { Input } from "@/components/ui/input";
  import { Label } from "@/components/ui/label";
  

import { useCart } from "@/contexts/contextCarrito";

import { useCantidad } from "@/contexts/contextCantProducOrden";


interface DataTableProps<TData, TValue> {
columns: ColumnDef<TData, TValue>[]
data: TData[]
cantProductos: number
}


export function DataTableOrden<TData, TValue>({
    columns,
    data,
    cantProductos
  }: DataTableProps<TData, TValue>) {

    const {setCantidad} = useCantidad();

    useEffect(() => {
      setCantidad(cantProductos);
    }, [cantProductos])

    const [rowSelection, setRowSelection] = useState({});
    const [disabled, setDisabled] = useState<boolean>(true);

    const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

    console.log(cantProductos);
    
    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel()
    });

  
    
    return (
      <>      
        <div className="rounded-md border min-w-full">
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
                    )
                    })}
                </TableRow>
                ))}
            </TableHeader>
            <TableBody>
                {table.getRowModel().rows.map((row) => (
                    <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    >
                    {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                    ))}
                    </TableRow>
                ))}
            </TableBody>
            </Table>
        </div>
      </>
    )
  }