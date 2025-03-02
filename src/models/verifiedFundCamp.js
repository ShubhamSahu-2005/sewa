import mongoose from 'mongoose';

const verifiedCampSchema = new mongoose.Schema({
    title: { type: String, required: true },
    fundraiserID: { type: String, required: true, unique: true },
    userID: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    urgent: { type: Boolean, default: false },
    goalAmount: { type: Number, required: true },
    mobileNumber: { type: Number, required: true },
    raisedAmount: { type: Number, default: 0 },
    patientImage: { type: String, required: true },
    patientName: { type: String, required: true },
    medicalDocuments: [{ type: String, required: true }], 
    bankDetails: {
        accountNumber: { type: String, required: true },
        ifscCode: { type: String, required: true },
        branchAddress: { type: String, required: true },
      },
    category: { type: String, required: true },
    story: { type: String, required: true },
    beneficiary: { type: String, required: true },
    deadline: { type: Date, required: true },
    status: { type: String, enum: ['active', 'closed', 'completed'], default: 'active' },
    createdAt: { type: Date },
    verifiedAt: { type: Date },
    updatedAt: { type: Date, default: Date.now },
    
},{strict:false});

const VerifiedCamp = mongoose.models.VerifiedCamp || mongoose.model('VerifiedCamp', verifiedCampSchema, 'VerifiedCamp'); // Replace 'VerifiedCamp' with your actual collection name

export default VerifiedCamp;