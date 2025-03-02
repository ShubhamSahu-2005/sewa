import mongoose from "mongoose";

const DonationSchema = new mongoose.Schema({
  donationID: { type: String, required: true, unique: true },
  amount: { type: Number, required: true },
  paymentStatus: { type: String, default: "pending" },
  name: { type: String, required: true },
  email: { type: String, required: true },
  pancardNumber: { type: String },
  fundraiserID: { type: String, required: true },
  razorpay_payment_id: { type: String },
  createdAt: { type: Date, default: Date.now }, // Already exists
  updatedAt: { type: Date, default: Date.now }, // Already exists
  donationTimestamp: { type: Date, default: Date.now } // 🔥 New field for exact donation time
}, { timestamps: true });

export default mongoose.models.Donation || mongoose.model("Donation", DonationSchema);
