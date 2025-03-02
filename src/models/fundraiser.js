import mongoose from "mongoose";

const fundraiserSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    fundraiserID: { type: String, required: true, unique: true },
    userID:{type:String,required:true,unique:true}, // Corrected userID type
    goalAmount: { type: Number, required: true },
    mobileNumber: { type: String }, // Changed to String (as mobile numbers may have leading zeros)
    raisedAmount: { type: Number, default: 0 },
    patientImage: { type: String, required: true },
    medicalDocuments: [{ type: String, required: true }],
    
    bankDetails: {
      accountNumber: { type: String, required: true },
      ifscCode: { type: String, required: true },
      branchAddress: { type: String, required: true },
    }, // Changed bankDetails from String to an Object

    category: { type: String, required: true },
    beneficiary: { type: String, required: true },
    deadline: { type: Date, required: true },
    status: { type: String, enum: ["active", "closed", "completed"], default: "active" },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

const Fundraiser = mongoose.models.Fundraiser || mongoose.model("Fundraiser", fundraiserSchema);

export default Fundraiser;
