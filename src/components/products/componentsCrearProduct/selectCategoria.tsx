import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SelectCatergoriaCrearProducto() {
  return (
    <>
      <Select>
        <SelectTrigger className="w-[220px]">
          <SelectValue placeholder="Selecciona" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Lubricantes Quimicos</SelectItem>
          <SelectItem value="dark">Herramientas Electricas</SelectItem>
          <SelectItem value="test">Herramientas Especializadas</SelectItem>
          <SelectItem value="test2">Equipos de Medicion</SelectItem>
          <SelectItem value="test1">Aceites</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
}
