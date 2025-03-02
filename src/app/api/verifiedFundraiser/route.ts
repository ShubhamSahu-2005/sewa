import { NextResponse } from "next/server";
import mongoose from 'mongoose';
import { connectToDB } from "@/utils/database";

export async function GET(){
    console.log("inside  get req");
    try {
        await connectToDB();
        
        // Direct collection access
        const db = mongoose.connection.db;
        if (!db) {
            throw new Error('Database connection not established');
        }
        const collection = db.collection('verifiedCamp'); // Exact match from your logs
        
        // Try to get documents directly
        console.log(collection);
        const campaigns = await collection.find({}).toArray();
        console.log("Direct collection access found:", campaigns.length, "documents");
        
        return NextResponse.json(campaigns, { status: 200 });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ 
            message: 'Error fetching campaigns', 
            error: error instanceof Error ? error.message : 'An unknown error occurred'
        }, { status: 500 });
    }
}