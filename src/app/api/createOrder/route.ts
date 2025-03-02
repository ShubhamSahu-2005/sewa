import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import Fundraiser from "@/models/fundraiser";
import Donation from "@/models/donations";
import { connectToDB } from "@/utils/database"; // Import your DB connection utility

const razorpay = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID as string,
    key_secret: process.env.RAZORPAY_KEY_SECRET as string,
});

export async function POST(req: Request) {
    try {
        // Connect to the database first
        await connectToDB();
        console.log("Connected to database");

        const body = await req.json();
        const { amount, fundraiserID } = body;

        if (!amount || isNaN(amount) || amount <= 0) {
            return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
        }

        // const cookieStore = cookies();
        // const token = cookieStore.get("authToken");

        // console.log("Token is:", token);

        // if (!token) {
        //     return NextResponse.json(
        //         { error: "Unauthorized: Token not provided" },
        //         { status: 401 }
        //     );
        // }

        // let decoded;
        // try {
        //     decoded = verifyToken(token.value); // No need for await if verifyToken is synchronous
        //     console.log("Decoded token:", decoded);
        // } catch (err) {
        //     return NextResponse.json(
        //         { error: "Invalid or expired token" },
        //         { status: 401 }
        //     );
        // }

        // const userID = decoded.id;

        const order = await razorpay.orders.create({
            amount: amount * 100, // Razorpay expects paise
            currency: "INR",
        });

        // Use findOne with query object instead of findById
        const fundraiser = await Fundraiser.findOne({ _id: fundraiserID });
        if (!fundraiser) {
            return NextResponse.json(
                { error: "Fundraiser not found" },
                { status: 404 }
            );
        }

        fundraiser.raisedAmount = (fundraiser.raisedAmount || 0) + amount;
        await fundraiser.save();

        const donation = new Donation({
            donationID: order.id,
            fundraiserID: fundraiserID,
            userID: userID,
            amount: amount,
        });
        await donation.save();

        return NextResponse.json(order);
    } catch (error) {
        console.error("Error creating Razorpay order:", error);
        return NextResponse.json(
            { error: "Failed to create order", details: error instanceof Error ? error.message : "Unknown error" },
            { status: 500 }
        );
    }
}