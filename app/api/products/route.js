import { dbConnect } from '../../utils/mongoose';
import OtherProduct from '../../models/otherProduct'; // updated import
import { NextResponse } from 'next/server';

// Secure API Key (Store in .env file)
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export async function GET(req) {
    const authKey = req.headers.get("x-api-key");

    if (!authKey || authKey !== API_KEY) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        await dbConnect();
        const products = await OtherProduct.find(); // fetch other products
        return NextResponse.json(products);
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
