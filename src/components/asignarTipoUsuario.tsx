"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
  } from "@/components/ui/dialog"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useToast } from "./ui/use-toast";

import { useRouter } from "next/navigation";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { useClerk } from "@clerk/nextjs";
import { useState, useEffect } from "react";

import axios from "axios";

type TipoUsuario = "MECANICO" | "CLIENTE";

export const AsignarTipoUsuario = ({idUsuario, mostrarDialog}:{idUsuario:string|undefined, mostrarDialog:boolean}) => {
    const {toast} = useToast();

    const router = useRouter();

    const { signOut } = useClerk();

    const [isOpen, setIsOpen] = useState<boolean>(mostrarDialog);
    const [isMounted, setIsMounted] = useState<boolean>(false);
    const [tipoUsuario, setTipoUsuario] = useState<TipoUsuario>("CLIENTE");

    useEffect(()=>{
        setIsMounted(true);
    },[]);

    const handleChangeTipo = (value: string) => {
        console.log(value);

        if(value === "MECANICO" || value === "CLIENTE"){
            setTipoUsuario(value);
        }
    }

    const handleSubmit = async () => {
        const resp = await axios.post("api/profiles/asignarTipoUsuario", {
            tipoUsuario: tipoUsuario
        }).catch((error)=>{
            console.log(error);
        });

        if(resp && resp.data) { 
            toast({
                description: `Se te ha asignado el rol de ${tipoUsuario}.`,
            });
            console.log(resp.data);
            setIsOpen(false);
            router.push("/");
        }
    }


    if(!isMounted) {
        return null;
    }
    
    return (
        <Dialog open={isOpen}>
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Selecciona un rol para tu cuenta</DialogTitle>
            <DialogDescription>
                This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
                En cuanto selecciones el rol de tu cuenta, no podrás cambiarlo después. 
                En caso de querer cambiarlo, tendrás que eliminar tu cuenta y volver a registrarte
                a nuestro servicio.
            </DialogDescription>
            </DialogHeader>

            <Label htmlFor="tipoUsuario" className="text-right">
              Tipo de usuario
            </Label>

            <RadioGroup defaultValue="CLIENTE" onValueChange={handleChangeTipo}>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="CLIENTE" id="r1" checked={tipoUsuario === "CLIENTE"}/>
                    <Label htmlFor="r1">Cliente</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="MECANICO" id="r2" checked={tipoUsuario === "MECANICO"}/>
                    <Label htmlFor="r2">Mecanico</Label>
                </div>
            </RadioGroup>

            <DialogFooter>
                <Button type="button" onClick={handleSubmit}>Guardar cambios</Button>
                <DialogClose asChild>
                    <Button type="button" variant="secondary" onClick={() => {
                        signOut({redirectUrl: '/'})
                        setIsOpen(false);
                    }}>
                    Cancelar
                    </Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
        </Dialog>

    )
}