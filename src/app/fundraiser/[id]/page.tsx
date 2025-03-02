'use client';

import { useState,useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Heart, User, Timer, ChevronLeft, ChevronRight } from 'lucide-react';
import { fundraisersData , Fundraiser } from '../../data/fundraisersData';
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import Link from 'next/link';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
export default function FundraiserDetailsPage() {
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
  const { id } = useParams();
  const fundraiser = fundraisers.find((f) => f.userID === id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!fundraiser) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-gray-500">Fundraiser not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const percentageRaised = Math.min(
    Math.round((fundraiser.raisedAmount / fundraiser.goalAmount) * 100),
    100
  );

  const formatNumber = (number: number) =>
    new Intl.NumberFormat('en-US').format(number);

  const handleDonate = () => {
   // alert(`Donate clicked for fundraiser: ${fundraiser.title} (ID: ${fundraiser.userID})`);
   console.log(fundraiser.userID);
  };

  const images = [
    fundraiser.
    patientImage,
    'https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&height=200&width=300',
    'https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&height=200&width=300',
    'https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&height=200&width=300',
    'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&height=200&width=300',
  ];

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };
  const deadline = fundraiser.deadline
    ? Math.max(0, Math.ceil((new Date(fundraiser.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : 0;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">{fundraiser.title}</CardTitle>
          <CardDescription>{fundraiser.category}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="relative h-96 rounded-lg overflow-hidden">
                <Image
                  src={images[currentImageIndex] || "/placeholder.svg"}
                  alt={`Image ${currentImageIndex + 1} for ${fundraiser.title}`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
                <div className="absolute inset-0 flex items-center justify-between p-4">
                  <Button variant="outline" size="icon" onClick={prevImage} className="rounded-full bg-white/70 hover:bg-white/90">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={nextImage} className="rounded-full bg-white/70 hover:bg-white/90">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex justify-center gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full ${
                      index === currentImageIndex ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-2">About this fundraiser</h2>
                <p className="text-gray-600">{fundraiser.description}</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Raised: ${formatNumber(fundraiser.raisedAmount)}</span>
                  <span className="font-medium">Goal: ${formatNumber(fundraiser.goalAmount)}</span>
                </div>
                <Progress value={percentageRaised} className="h-2" />
                <div className="flex justify-between text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Timer className="h-4 w-4" /> {deadline
                    } days left
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="h-4 w-4" /> {fundraiser.donors} donors
                  </span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">More details</h3>
                <p className="text-gray-600">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi voluptas quisquam expedita molestias repudiandae amet, doloribus praesentium, commodi odio, officia provident ipsam. Earum a veritatis, dolore cupiditate suscipit velit quasi!
                </p>
                <p className="text-gray-600 mt-2">
                  Dolore velit maxime nobis, id nulla praesentium excepturi sequi veniam harum saepe sit dolorem sed! Alias tempore laboriosam quisquam obcaecati, maxime cumque molestiae illo! Repellendus tempore dolorum numquam veniam sed.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
        <Button
  onClick={handleDonate}
  className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
>

  <Link
   href={`/donate/${fundraiser.fundraiserID}`}
    className="flex items-center gap-2 hover:underline"
  >
    <Heart className="h-4 w-4" aria-hidden="true" />
    <span>Donate Now</span>
  </Link>
</Button>

        </CardFooter>
      </Card>
    </div>
  );
}

