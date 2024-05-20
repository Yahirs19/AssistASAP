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

type InfoDeOrdenes = {
    id: string,
    fecha: string,
    estado: string,
    total: number,
    tipo: string,
    client: {
      profile:{
        name: string,
        apellidoP: string,
        apellidoM: string,
        email: string,
        telephone: string
      }
    },
    mecanico: {
      profile: {
        name: string,
        apellidoP: string,
        apellidoM: string,
        email: string,
        telephone: string
      }
    },
    productos: {
      cantidad: number,
      producto: {
        name: string,
        imageUrl: string,
        price: number,
        description: string,
        slug: string,
        proveedor: {
          Empresa: string,
          Foto: string
        }
      },
      categoria: {
        nombre: string
      }
    }[]
  }