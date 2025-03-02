
export interface Fundraiser {
  userID: string;
  fundraiserID:string,
  title: string;
  description: string;
  category: string;
  patientImage: string;
  goalAmount: number;
  raisedAmount: number;
  deadline: Date;
  donors: number;
  document?: string[];
}
// Function to fetch fundraiser data from the API without transforming
export const fundraisersData = async (): Promise<Fundraiser[]> => {
  try {
    console.log("Fetching Fundraiser data...");

        const response = await fetch("/api/verifiedFundraiser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const fundData: Fundraiser[] = await response.json();
    console.log("Fetched Fundraiser Data:", fundData);

    return fundData; // Return raw data without transformation
  } catch (error) {
    console.error("Error fetching fundraiser data:", error);
    return []; // Return empty array on error
  }
};

