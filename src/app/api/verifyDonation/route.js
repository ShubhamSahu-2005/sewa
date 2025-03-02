import Razorpay from "razorpay";
import crypto from "crypto";
import mongoose from "mongoose";
import { connectToDB } from "@/utils/database";
import Donation from "@/models/donations";
import verifiedCamp from "@/models/verifiedFundCamp";

const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

export async function POST(req) {
  try {
    console.log("🚀 Verifying Payment...");
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

    // ✅ Connect to Database
    await connectToDB();

    // ✅ Verify Razorpay Signature
    const expectedSignature = crypto
      .createHmac("sha256", RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      console.error("❌ Signature verification failed");
      return new Response(JSON.stringify({ success: false, message: "Payment verification failed" }), { status: 400 });
    }
    


    // ✅ Fetch Donation
    const donation = await Donation.findOne({ donationID: razorpay_order_id });
    if (!donation) {
      console.error("❌ Donation record not found");
      return new Response(JSON.stringify({ success: false, message: "Donation record not found" }), { status: 404 });
    }

    // ✅ Update Donation Status
    donation.paymentStatus = "success";
    donation.razorpay_payment_id = razorpay_payment_id;
    donation.donationTimestamp = new Date();
    await donation.save();
    const fundraiser = await mongoose.connection.db
  .collection('verifiedCamp')
  .findOne({ fundraiserID: donation.fundraiserID });

console.log("🔍 Found fundraiser (raw query):", fundraiser);
console.log("🔍 Type of fundraiserID:", typeof donation.fundraiserID, donation.fundraiserID);

const fundraiserID = String(donation.fundraiserID).trim();

console.log("🔍 Found fundraiser:", fundraiser);

// ✅ Update Fundraiser Raised Amount
if (!fundraiser) {
  console.error("⚠️ Fundraiser not found for ID:", donation.fundraiserID);
  return new Response(
    JSON.stringify({
      success: true,
      message: "Payment verified but fundraiser not found",
      donation: donation.toObject(),
    }),
    { status: 200 }
  );
}

// 🔄 Update raisedAmount in the database
const updatedFundraiser = await mongoose.connection.db
  .collection('verifiedCamp')
  .updateOne(
    { fundraiserID: fundraiserID }, 
    { $inc: { raisedAmount: donation.amount } } // Increment raisedAmount
  );

console.log("✅ Fundraiser updated successfully:", updatedFundraiser);

return new Response(
  JSON.stringify({
    success: true,
    message: "Payment verified and fundraiser updated",
    updatedFundraiser,
  }),
  { status: 200 }
);


    console.log(`✅ Fundraiser updated: ${fundraiser.title} | Raised: ₹${fundraiser.raisedAmount}`);

    return new Response(JSON.stringify({
      success: true,
      message: "Payment verified and fundraiser updated successfully",
      donation: donation.toObject(),
      fundraiser: { id: fundraiser._id.toString(), raisedAmount: fundraiser.raisedAmount }
    }), { status: 200 });

  } catch (error) {
    console.error("❌ Error in verification process:", error);
    return new Response(JSON.stringify({ success: false, message: "Internal server error", error: error.message }), { status: 500 });
  }
}



