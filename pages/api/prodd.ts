import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';
import { parse } from 'path';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, name, imageUrl, price, slug, description, usuarioAdminID, proveedorID,cantidad, cate} = req.body;
  const parsedPrice = parseFloat(price);
  const intcantid = parseInt(cantidad);

  if (req.method === 'GET') {
    const users = await prisma.product.findMany();
    res.status(200).json(users);
  } else if (req.method === 'POST') {
    const post = await prisma.product.create({
      data: {
        name,
        imageUrl,
        price: parsedPrice,
        cantidad:intcantid,
        slug,
        description,
        cate,
        usuarioAdminID,
        proveedorID,
      },
    });
    res.status(201).json(post);
  } else if (req.method === 'PUT') {
    const post = await prisma.product.update({
      where: { id: id },
      data: {
        name,
        imageUrl,
        price: parsedPrice,
        cantidad: intcantid,
        slug,
        description,
        cate,
        usuarioAdminID,
        proveedorID,
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
        const post = await prisma.product.delete({
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
