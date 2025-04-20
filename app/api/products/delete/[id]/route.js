import { dbConnect } from '../../../../utils/mongoose';
import OtherProduct from '../../../../models/otherProduct'; // updated model
import { NextResponse } from 'next/server';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export async function DELETE(req, { params }) {
    const { id } = params;

    const apiKey = req.headers.get("x-api-key");

    if (!apiKey || apiKey !== API_KEY) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        await dbConnect();
        await OtherProduct.findByIdAndDelete(id); // use updated model
        return NextResponse.json({ message: 'Product deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error:', error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
