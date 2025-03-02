import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HowItWorks() {
  return (
    <div className="bg-gradient-to-b from-green-100 via-white to-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <h1 className="text-5xl font-extrabold text-center text-green-600 mb-12">
          How It Works
        </h1>

      
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-green-300 pb-2 inline-block">
            For Fundraisers
          </h2>
          <ol className="list-decimal pl-8 text-gray-700 space-y-5">
            <li>
              <strong className="text-gray-900">Sign Up:</strong> Create an account by clicking the 
              <Link href="/signup" className="text-green-500 hover:underline font-medium">
                Sign Up
              </Link> button on the top right.
            </li>
            <li>
              <strong className="text-gray-900">Start a Fundraiser:</strong> Once signed up, click on the 
              <Link href="/start-fundraiser" className="text-green-500 hover:underline font-medium">
                Start a Fundraiser
              </Link> button to begin.
            </li>
            <li>
              <strong className="text-gray-900">Enter Details:</strong> Provide the required information:
              <ul className="list-disc pl-8 mt-3 space-y-2 text-gray-600">
                <li>Fundraiser Name</li>
                <li>Contact Details</li>
                <li>Deadline (till date)</li>
                <li>Account Details</li>
                <li>Required Documents</li>
              </ul>
            </li>
            <li>
              <strong className="text-gray-900">Verification:</strong> Our team will contact you to verify the information provided and approve your fundraiser.
            </li>
          </ol>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-blue-300 pb-2 inline-block">
            For Donors
          </h2>
          <ol className="list-decimal pl-8 text-gray-700 space-y-5">
            <li>
              <strong className="text-gray-900">Donate Directly:</strong> Click on the <strong className="text-gray-800">Donate</strong> button on the homepage to contribute instantly.
            </li>
            <li>
              <strong className="text-gray-900">Explore Fundraisers:</strong> Click on the title of a fundraiser to learn more about it before donating.
            </li>
            <li>
              <strong className="text-gray-900">Donation Details:</strong> After your donation, our team will send you an email with your donation ID and other relevant information.
            </li>
          </ol>
        </div>

        
        <div className="text-center">
          <Link href="/">
            <Button className="bg-green-600 text-white hover:bg-green-500 transition-all shadow-xl rounded-full px-8 py-4 text-lg font-semibold">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
