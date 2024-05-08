export type TypeUser = "CLIENTE" | "MECANICO";

type Producto = {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
    cantidad: number;
    slug: string;
    description: string;
    categoria: string|null;
    usuarioAdminID: string | null;
    proveedorID: string | null;
    inventarioId: string | null;
    RegDate: Date;
    UpdatedDate: Date;
}