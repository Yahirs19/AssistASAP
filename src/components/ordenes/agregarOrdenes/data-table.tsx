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
  } from "@/components/ui/alert-dialog"
  

import { Button } from "@/components/ui/button";

import { useCart } from "@/contexts/contextCarrito";


interface DataTableProps<TData, TValue> {
columns: ColumnDef<TData, TValue>[]
data: TData[]
}


export function DataTableProductos<TData, TValue>({
    columns,
    data,
  }: DataTableProps<TData, TValue>) {
    const { cart, removeFromCart } = useCart();

    const [rowSelection, setRowSelection] = useState({});
    const [disabled, setDisabled] = useState<boolean>(true);

    const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

    console.log(rowSelection);
    
    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      onRowSelectionChange: setRowSelection,
      state: {
        rowSelection
      }
    });

    useEffect(()=>{
        const productsIndex = Object.keys(rowSelection);

        setSelectedProducts(productsIndex);

    }, [rowSelection])

    useEffect(() => {
        if(Object.keys(rowSelection).length > 0) {
            setDisabled(false);
        }else{
            setDisabled(true);
        }

    }, [selectedProducts]);

    const deleteAllSelectedProd = () => {
        selectedProducts.forEach((index) => {
            const indexN = Number(index);
            removeFromCart(cart[indexN].id);
        });

        setDisabled(true);

        setSelectedProducts([]);

        setRowSelection({});


    }

    
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
                {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
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
                ))
                ) : (
                <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                    No se han seleccionado productos.
                    </TableCell>
                </TableRow>
                )}
            </TableBody>
            </Table>
        </div>
        <div className="flex w-11/12 items-center justify-end space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} de{" "}
            {table.getFilteredRowModel().rows.length} producto(s) seleccionados.
            </div>


            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="destructive" disabled={disabled}>Eliminar productos seleccionados</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>¿Estás seguro que quieres eliminar los productos?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta acción no se podrá deshacer.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={deleteAllSelectedProd}>Confirmar</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
        </div>
      </>
    )
  }