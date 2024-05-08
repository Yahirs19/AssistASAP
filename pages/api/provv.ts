import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';
import { parse } from 'path';
import { NextResponse } from 'next/server';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, Nombre, Foto, Empresa, Ubicacion, RFC } = req.body;

  if (req.method === 'GET') {
    const users = await prisma.proveedor.findMany();
    res.status(200).json(users);
  } else if (req.method === 'POST') {
    const post = await prisma.proveedor.create({
      data: {
            Nombre,
            Foto,
            Empresa,
            Ubicacion,
            RFC,
      },
    });
    res.status(201).json(post);
  } else if (req.method === 'PUT') {
    const post = await prisma.proveedor.update({
      where: { id: id },
      data: {
            Nombre,
            Foto,
            Empresa,
            Ubicacion,
            RFC,
      },
    });
    res.status(201).json(post);
  } else if (req.method === 'DELETE') {
    const { id } = req.query;
    
    // Valida que el ID es una cadena (string)
    if (typeof id !== 'string') {
        res.status(400).json({ error: 'Invalid ID' });
        return;
    }
    
    try {
        // Elimina el producto con el ID especificado
        const post = await prisma.proveedor.delete({
            where: { id: id },
        });
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ error: 'Product not found' });
    }
} else {
    res.status(405).end();
}
  
}
