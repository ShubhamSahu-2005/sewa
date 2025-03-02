"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart ,Timer,User} from "lucide-react";
export interface Fundraiser {  
  userID: string;
    title: string;
    description: string;
    category: string;
    imageUrl: string;
    goalAmount: number;
    raisedAmount: number;
    daysLeft: number;
    donors: number;
    document?: string[]; 
}

const formatNumber = (number: number) =>
  new Intl.NumberFormat("en-US").format(number);

const topFundraisers: Fundraiser[] = [
  {
    userID: "1",
    title: "Kidney Transplant Fund",
    description:
      "Support John Doe, a father of two, in his journey to receive a life-saving kidney transplant. Every contribution brings hope.",
    category: "Health",
    imageUrl:
      "https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&height=200&width=300",
    goalAmount: 75000,
    raisedAmount: 25000,
    daysLeft: 30,
    donors: 200,
    document: [
      "https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&height=200&width=300",
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&height=200&width=300",
    ],
  },
  {
    userID: "2",
    title: "Heart Surgery for Jane",
    description:
      "Help Jane Smith undergo urgent heart surgery to treat her critical condition. Your donation will save a life.",
    category: "Health",
    imageUrl:
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&height=200&width=300",
    goalAmount: 100000,
    raisedAmount: 45000,
    daysLeft: 20,
    donors: 350,
    document: [
      "https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&height=200&width=300",
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&height=200&width=300",
    ],
  },
  {
    userID: "3",
    title: "Cancer Treatment for Emily",
    description:
      "Emily is battling cancer and needs funds for her chemotherapy sessions. Let’s come together to support her fight.",
    category: "Health",
    imageUrl:
      "https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&height=200&width=300",
    goalAmount: 60000,
    raisedAmount: 32000,
    daysLeft: 15,
    donors: 180,
    document: [
      "https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&height=200&width=300",
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&height=200&width=300",
    ],
  }
];

interface FundraiserCardProps {
  fundraiser: Fundraiser;
  onDonate: (userID: string) => void;
}

function FundraiserCard({ fundraiser, onDonate }: FundraiserCardProps) {
  const percentageRaised = Math.min(
    Math.round((fundraiser.raisedAmount / fundraiser.goalAmount) * 100),
    100
  );

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 m-2 p-4 w-[360px]">
      <img
        src={fundraiser.imageUrl}
        alt={`Image for ${fundraiser.title}`}
        className="w-full h-48 object-cover rounded-md"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">
          <Link href={`/fundraiser/${fundraiser.userID}`} className="hover:underline">
            {fundraiser.title}
          </Link>
        </h3>
        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
          {fundraiser.description}
        </p>
        <div className="mt-4 space-y-3">
          <div className="relative w-full bg-gray-200 h-2 rounded-full">
            <div
              className="absolute top-0 left-0 bg-green-500 h-2 rounded-full"
              style={{ width: `${percentageRaised}%` }}
            />
          </div>
          <div className="flex justify-between text-sm text-gray-700">
            <div>
              <p className="text-gray-500">Raised</p>
              <p className="font-bold">${formatNumber(fundraiser.raisedAmount)}</p>
            </div>
            <div>
              <p className="text-gray-500">Goal</p>
              <p className="font-bold">${formatNumber(fundraiser.goalAmount)}</p>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Timer size={16} /> {fundraiser.daysLeft} days left
            </span>
            <span className="flex items-center gap-1">
              {fundraiser.donors} donors <User size={16} />
            </span>
          </div>
          <button
            onClick={() => onDonate(fundraiser.userID)}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors"
            aria-label={`Donate to ${fundraiser.title}`}
          >
            <Heart size={18} />
            <Link href={`/donate/${fundraiser.userID}`} className="hover:underline">
            Donate Now
          </Link>
          </button>
        </div>
      </div>
    </div>
  );
}


export default function TopFundraisers() {
  const handleDonate = (userID: string) => {
    alert(`Donate clicked for fundraiser ID: ${userID}`);
  };

  return (
    <section className="bg-gradient-to-r from-blue-100 to-green-200 py-12">
  <div className="container mx-auto px-4 md:px-8 lg:px-16">
    <h2 className="mb-8 text-center text-4xl font-extrabold">
      Our Top Fundraisers
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {topFundraisers.map((fundraiser) => (
        <FundraiserCard
          key={fundraiser.userID}
          fundraiser={fundraiser}
          onDonate={handleDonate}
        />
      ))}
    </div>
    <div className="mt-12 text-center">
      <Button
        asChild
        variant="outline"
        className="bg-green-600 hover:bg-green-700 text-white border-transparent shadow-md px-8 py-3"
      >
        <Link href="/fundraisers">See More Fundraisers</Link>
      </Button>
    </div>
  </div>
</section>

  );
}
