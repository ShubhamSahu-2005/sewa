import { connectToDB } from "@/utils/database";
import Fundraiser from "@/models/fundraiser";
import { verifyToken } from "@/utils/jwt";
import { v4 as uuidv4 } from "uuid";
import cloudinary from "@/utils/cloudinary";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import mongoose from "mongoose";
// Upload a single file to Cloudinary
const uploadToCloudinary = async (file: File, folder: string): Promise<string | null> => {
  if (!file || !file.size) {
   // console.log(`⚠️ Skipping upload: No valid file provided for ${folder}`);
    return null;
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise<string | null>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder },
        (error, result) => {
          if (error) {
         //   console.error(`❌ Cloudinary Upload Error [${folder}]:`, error);
            reject(error);
          } else if (result?.secure_url) {
        //    console.log(`✅ Uploaded ${folder} URL:`, result.secure_url);
            resolve(result.secure_url);
          } else {
            reject(new Error(`Unknown Cloudinary upload failure for ${folder}`));
          }
        }
      );

      uploadStream.end(buffer);
    });
  } catch (error) {
    console.error(`❌ Error uploading file to Cloudinary [${folder}]:`, error);
    return null;
  }
};

// Upload multiple files to Cloudinary
const uploadMultipleToCloudinary = async (files: File[], folder: string): Promise<string[]> => {
  if (!files || files.length === 0) {
    console.log(`⚠️ No files provided for ${folder}, skipping upload.`);
    return [];
  }

  const uploadPromises = files
    .filter(file => file && file.size > 0)
    .map(file => uploadToCloudinary(file, folder));

  const results = await Promise.all(uploadPromises);
  return results.filter(url => url !== null) as string[];
};

export async function POST(req: NextRequest) {
  try {
    console.log("📌 Received POST request to create fundraiser");

    // Authenticate user
    const token = req.cookies.get("authToken")?.value;
    console.log("📌 Extracted Token:", token);

    if (!token) {
      console.error("❌ No authentication token found");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let decoded;
    try {
      decoded = verifyToken(token);
      console.log("📌 Decoded Token:", decoded);
    } catch (err) {
      console.error("❌ Invalid or expired token:", err);
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
    }

    const userID = decoded.id;
    await connectToDB();
    console.log("📌 Connected to DB");

    // Parse form data
    const formData = await req.formData();
    console.log("📌 Received FormData:", formData);

    // Validate required fields
    const requiredFields = ["title", "email", "goalAmount", "phone", "category", "beneficiary", "deadline", "bankDetails"];
    for (const field of requiredFields) {
      if (!formData.get(field)) {
        console.error(`❌ Missing required field: ${field}`);
        return NextResponse.json({ error: `Field "${field}" is required` }, { status: 400 });
      }
    }

    // Parse bank details safely
    const bankDetailsArray = formData.getAll("bankDetails");

console.log("📌 Raw bankDetails from FormData:", bankDetailsArray);

let bankDetails;
try {
  // Get all bank details entries
  const bankDetailsEntries = Array.from(formData.entries())
    .filter(([key]) => key === "bankDetails")
    .map(([_, value]) => value);
  
  console.log("📌 Bank Details Entries:", bankDetailsEntries);
  
  // Try each entry until we find valid JSON
  let parsedObj = null;
  
  for (const entry of bankDetailsEntries) {
    try {
      if (typeof entry === "string") {
        // Skip entries that are clearly not valid JSON
        if (entry === "[object Object]" || entry === "[object FileList]") {
          continue;
        }
        
        parsedObj = JSON.parse(entry);
        break;
      } else if (typeof entry === "object" && entry !== null) {
        parsedObj = entry;
        break;
      }
    } catch (parseError) {
      console.log(`Failed to parse entry: ${entry}`, parseError);
      // Continue to the next entry
    }
  }
  
  if (!parsedObj) {
    throw new Error("No valid bank details format found");
  }
  
  // Use the object directly
  bankDetails = parsedObj;
  
  // Validate that required fields exist
  if (!bankDetails.accountNumber || !bankDetails.ifscCode || !bankDetails.branchAddress) {
    throw new Error("Missing required bank details fields");
  }
  
  console.log("✅ Parsed Bank Details:", bankDetails);
} catch (error) {
  console.error("❌ Error parsing bank details:", error);
  return NextResponse.json({ error: "Invalid bank details format" }, { status: 400 });
}



    // Check required files
    const patientImage = formData.get("patientImage") as File;
    if (!patientImage || !patientImage.size) {
      console.error("❌ Missing patient image");
      return NextResponse.json({ error: "Patient image is required" }, { status: 400 });
    }

    // Extract all keys related to medicalDocuments
const medicalFiles: File[] = [];
for (const [key, value] of formData.entries()) {
  if (key.startsWith("medicalDocuments")) {
    medicalFiles.push(value as File);
  }
}

console.log("📌 Extracted Medical Documents:", medicalFiles);

    console.log("📌 Medical Documents Found:", medicalFiles.length);

    // Upload patient image
    console.log("⏳ Uploading patient image...");
    const patientImageUrl = await uploadToCloudinary(patientImage, "patient_images");
    if (!patientImageUrl) {
      return NextResponse.json({ error: "Failed to upload patient image" }, { status: 500 });
    }

    // Upload medical documents
    console.log("⏳ Uploading medical documents...");
    const medicalDocumentsUrls = await uploadMultipleToCloudinary(medicalFiles, "medical_documents");

    // Create fundraiser document
    const newFundraiser = new Fundraiser({
      title: formData.get("title"),
      fundraiserID: uuidv4(),
      userID,
       email: formData.get("email"),
      goalAmount: parseFloat(formData.get("goalAmount") as string),
      mobileNumber: formData.get("phone"),
      patientImage: patientImageUrl,
      medicalDocuments: medicalDocumentsUrls,
      bankDetails,
      category: formData.get("category"),
      beneficiary: formData.get("beneficiary"),
      deadline: new Date(formData.get("deadline") as string),
    });

    console.log("📌 Saving Fundraiser to Database:", newFundraiser);
    await newFundraiser.save();
    console.log("✅ Fundraiser successfully saved!");

    return NextResponse.json({ message: "Fundraiser created successfully", fundraiserID: newFundraiser.fundraiserID }, { status: 201 });

  } catch (error) {
    console.error("❌ Error creating fundraiser:", error);
    return NextResponse.json({ error: "Failed to create fundraiser", details: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
  }
}