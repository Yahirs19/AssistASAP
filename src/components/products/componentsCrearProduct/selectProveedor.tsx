import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SelectProveedorCrearProducto() {
  return (
    <>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Proveedor" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Amazon MX</SelectItem>
          <SelectItem value="dark">Mercado Libre</SelectItem>
          <SelectItem value="system">Grainger Mexico</SelectItem>
          <SelectItem value="system">Productos Castrol</SelectItem>
          <SelectItem value="system">LTH</SelectItem>
          <SelectItem value="system">Autozone</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
}
