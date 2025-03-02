import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * "use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart ,Timer,User} from "lucide-react";
export interface Fundraiser {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  goalAmount: number;
  raisedAmount: number;
  daysLeft: number;
  donors: number;
}

const formatNumber = (number: number) =>
  new Intl.NumberFormat("en-US").format(number);

const topFundraisers: Fundraiser[] = [
  {
    id: "1",
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
  },
  {
    id: "2",
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
  },
  {
    id: "3",
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
  },
];

interface FundraiserCardProps {
  fundraiser: Fundraiser;
  onDonate: (id: string) => void;
}

function FundraiserCard({ fundraiser, onDonate }: FundraiserCardProps) {
  const percentage = Math.min(
    Math.round((fundraiser.raisedAmount / fundraiser.goalAmount) * 100),
    100
  );

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden w-[350px] mx-auto transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
      <div className="relative">
        <Image
          src={fundraiser.imageUrl}
          alt={fundraiser.title}
          width={350}
          height={200}
          className="w-full h-[200px] object-cover"
          priority
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {fundraiser.title}
        </h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {fundraiser.description}
        </p>

        <div className="space-y-3">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-emerald-600 h-2 rounded-full"
              style={{ width: `${percentage}%` }}
            />
          </div>

          <div className="flex justify-between text-sm">
            <div>
              <p className="text-gray-500">Raised</p>
              <p className="font-bold text-gray-900">
                ${formatNumber(fundraiser.raisedAmount)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-gray-500">Goal</p>
              <p className="font-bold text-gray-900">
                ${formatNumber(fundraiser.goalAmount)}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-500">
  <span className="flex items-center gap-1">
  <Timer size={16} /> {fundraiser.daysLeft }
       days left
  </span>
  <span className="flex items-center gap-1">
    {fundraiser.donors} donors
    <User size={16} />
  </span>
</div>

          <button
            onClick={() => onDonate(fundraiser.id)}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded-md font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <Heart size={16} />
            Donate Now
          </button>
        </div>
      </div>
    </div>
  );
}


export default function TopFundraisers() {
  const handleDonate = (id: string) => {
    alert(`Donate clicked for fundraiser ID: ${id}`);
  };

  return (
    <section className="bg-gradient-to-r from-blue-100 to-green-200 py-12">
      <div className="container mx-auto">
        <h2 className="mb-8 text-center text-4xl font-extrabold">
          Our Top Fundraisers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topFundraisers.map((fundraiser) => (
            <FundraiserCard
              key={fundraiser.id}
              fundraiser={fundraiser}
              onDonate={handleDonate}
            />
          ))}
        </div>

        <div className="mt-8 text-center">
     
          <Button
            asChild
            variant="outline"
            className="bg-green-600 hover:bg-green-700 text-white border-transparent shadow-md"
          >
             <Link href="/fundraisers">  See More Fundraisers</Link>
          </Button>
          
        </div>
      </div>
    </section>
  );
}

 */