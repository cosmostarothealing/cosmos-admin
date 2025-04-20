import { dbConnect } from '../../../utils/mongoose';
import OtherProduct from '../../../models/otherProduct'; // updated import
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const authKey = req.headers.get("x-api-key");
        const SERVER_API_KEY = process.env.NEXT_PUBLIC_API_KEY;

        if (!authKey || authKey !== SERVER_API_KEY) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();
        const data = await req.json();

        const { 
            type, 
            name, 
            price, 
            description, 
            img1, 
            img2 
        } = data;

        // ✅ Validate Required Fields
        if (!type || !name || !price || !description || !img1 || !img2) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const newProduct = new OtherProduct({
            type,
            name,
            price,
            description,
            img1,
            img2,
        });

        await newProduct.save();
        return NextResponse.json({ message: "Product added successfully" }, { status: 201 });

    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
