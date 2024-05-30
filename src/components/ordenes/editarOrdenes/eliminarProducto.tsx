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

interface EliminarProductoProps {
    children: React.ReactNode;
    handleEliminar: (idOrden: string, idProducto: string) => Promise<void>;
    idProducto: string;
    idOrden: string;
}

export const EliminarProducto = ({children, handleEliminar, idProducto, idOrden}: EliminarProductoProps) => {
    return (
        <AlertDialog>
                <AlertDialogTrigger asChild>
                  {children}
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>¿Estás seguro que quieres eliminar el producto?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta acción no se podrá deshacer.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleEliminar(idOrden, idProducto)}>Confirmar</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
        </AlertDialog>
    )
}