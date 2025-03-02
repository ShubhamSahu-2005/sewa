import Razorpay from "razorpay";
import { connectToDB } from "@/utils/database";
import Donation from "@/models/donations";

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
console.log("RAZORPAY_KEY_ID:", process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID);
console.log("RAZORPAY_KEY_SECRET:", process.env.RAZORPAY_KEY_SECRET);


export async function POST(req) {
  try {
    const body = await req.json(); // Parse JSON in App Router
    const { fundraiserID, amount, name, email, pancardNumber } = body;

    if (!fundraiserID || !amount || !name || !email) {
      return new Response(JSON.stringify({ error: "Missing required fields." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    await connectToDB();

    // Create Razorpay Order
    const options = {
      amount: amount * 100, // Convert to paise
      currency: "INR",
      receipt: `receipt_${Math.random() * 10000}`,
    };

    const order = await razorpay.orders.create(options);

    // Save donation details
    const donation = new Donation({
      donationID: order.id,
      fundraiserID,
      donationTimestamp: new Date(),
      amount,
      name,
      email,
      pancardNumber: pancardNumber || "", // Optional
    });

    await donation.save();

    return new Response(
      JSON.stringify({ success: true, order, donationID: donation._id }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error creating donation:", error);
    return new Response(JSON.stringify({ error: "Something went wrong." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
