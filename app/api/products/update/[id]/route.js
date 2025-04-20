import { dbConnect } from '../../../../utils/mongoose';
import OtherProduct from '../../../../models/otherProduct'; // updated model
import { NextResponse } from 'next/server';

export async function PUT(req, { params }) {
    const { id } = params;

    try {
        await dbConnect();

        const { 
            type, 
            name, 
            price, 
            description, 
            img1, 
            img2 
        } = await req.json();

        const updatedProduct = await OtherProduct.findByIdAndUpdate(
            id,
            {
                type,
                name,
                price,
                description,
                img1,
                img2,
            },
            { new: true }
        );

        return NextResponse.json({ message: 'Product updated successfully', product: updatedProduct }, { status: 200 });
    } catch (error) {
        console.error('Error:', error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
