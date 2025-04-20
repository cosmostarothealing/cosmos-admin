import { dbConnect } from '../../../../utils/mongoose';
import OtherProduct from '../../../../models/otherProduct'; // changed model import
import { NextResponse } from 'next/server';

export async function GET(req, context) {
    const { params } = context;
    const id = params?.id;

    if (!id) {
        return NextResponse.json({ message: 'Invalid product ID' }, { status: 400 });
    }

    const authKey = req.headers.get("x-api-key");

    if (!authKey || authKey !== process.env.NEXT_PUBLIC_API_KEY) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        await dbConnect();
        const product = await OtherProduct.findById(id); // updated model call

        if (!product) {
            return NextResponse.json({ message: 'Product not found' }, { status: 404 });
        }

        return NextResponse.json(product);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
