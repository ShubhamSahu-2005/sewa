import Razorpay from "razorpay";
import crypto from "crypto";
import { connectToDB } from "@/utils/database";
import Donation from "@/models/donations";
import VerifiedCamp from "@/models/verifiedFundCamp";

const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

export async function POST(req) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

    await connectToDB();

    // Verify the Razorpay signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return new Response(JSON.stringify({ success: false, message: "Payment verification failed" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Find the donation record
    const donation = await Donation.findOne({ donationID: razorpay_order_id });
    if (!donation) {
      return new Response(JSON.stringify({ success: false, message: "Donation record not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Update the donation record in the database
    donation.paymentStatus = "success";
    donation.razorpay_payment_id = razorpay_payment_id;
    donation.donationTimestamp = new Date();
    const updatedDonation = await donation.save();
    console.log("Updated Donation:", updatedDonation);

    // Update the fundraiser's raisedAmount
    await VerifiedCamp.findOneAndUpdate(
      { fundraiserID: donation.fundraiserID },
      { $inc: { raisedAmount: donation.amount } }
    );

    return new Response(
      JSON.stringify({
        success: true,
        message: "Payment verified and recorded successfully",
        donation,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error verifying payment:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Internal server error", error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
