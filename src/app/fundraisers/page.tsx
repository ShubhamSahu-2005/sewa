"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Heart, User, Timer } from "lucide-react";
import Link from "next/link";
import { fundraisersData, Fundraiser } from "../data/fundraisersData";
const formatNumber = (number: number) =>
  new Intl.NumberFormat("en-US").format(number);

export default function FundraiserList() {
  const [fundraisers, setFundraisers] = useState<Fundraiser[]>([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fundraisersData(); 
        setFundraisers(data); 
      } catch (error) {
        console.error("Error fetching fundraisers:", error);
      }
    }
    fetchData();
  }, []);

  const handleDonate = () => {
   // alert(`Donate clicked for fundraiser ID: ${userID}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-8 py-8">
      {fundraisers.map((fundraiser) => (
        <FundraiserCard
          key={fundraiser.userID}
          fundraiser={fundraiser}
          onDonate={handleDonate}
        />
      ))}
    </div>
  );
}
interface FundraiserCardProps {
  fundraiser: Fundraiser;
  onDonate: (id: string) => void;
}

function FundraiserCard({ fundraiser, onDonate }: FundraiserCardProps) {
  const percentageRaised = Math.min(
    Math.round((fundraiser.raisedAmount / fundraiser.goalAmount) * 100),
    100
  );
  const router = useRouter();
  const handleDonateClick = () => {
    router.push(`/donate/${fundraiser.fundraiserID}`);
  };
  const deadline = fundraiser.deadline
    ? Math.max(0, Math.ceil((new Date(fundraiser.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : 0;
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 m-2 p-4 w-[360px]">
      <img
        src={fundraiser.patientImage}
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
              <Timer size={16} /> {deadline} days left
            </span>
            <span className="flex items-center gap-1">
              {fundraiser.donors} donors <User size={16} />
            </span>
          </div>

          <button
            onClick={handleDonateClick}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors"
            aria-label={`Donate to ${fundraiser.title}`}
          >
            <Heart size={18} />
            Donate Now
          </button>
        </div>
      </div>
    </div>
  );
}
