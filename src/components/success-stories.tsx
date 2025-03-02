import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

const successStories = [
  {
    id: 1,
    name: "Aarav Patel",
    image: "/image/a2.jpg",
    story: "Thanks to the generous donations, I was able to undergo a life-saving heart surgery. I'm now back on my feet and living life to the fullest!",
    amountRaised: "₹5,00,000"
  },
  {
    id: 2,
    name: "Priya Sharma",
    image: "/image/a1.jpg",
    story: "The funds raised helped me complete my education when my family was going through a financial crisis. I'm now working as a software engineer and supporting my family.",
    amountRaised: "₹3,50,000"
  },
  {
    id: 3,
    name: "Rahul Verma",
    image: "/image/a2.jpg",
    story: "After losing everything in a natural disaster, the SacchiSewa community came together to help rebuild our home. We're forever grateful for the support.",
    amountRaised: "₹7,25,000"
  }
]

export function SuccessStories() {
  return (
    <section className="bg-gradient-to-r from-blue-100 to-green-200 py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-10 text-center text-4xl font-extrabold text-gray-800">Inspiring Success Stories</h2>
        <Carousel className="w-full max-w-4xl mx-auto">
          <CarouselContent>
            {successStories.map((story) => (
              <CarouselItem key={story.id}>
                <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="flex flex-col items-center p-8 text-center">
                    <div className="mb-6 overflow-hidden rounded-full border-4 border-white shadow-md">
                      <Image
                        src={story.image}
                        alt={story.name}
                        width={120}
                        height={120}
                        className="object-cover"
                      />
                    </div>
                    <h3 className="mb-3 text-2xl font-semibold text-gray-800">{story.name}</h3>
                    <p className="mb-6 text-gray-600 italic leading-relaxed">"{story.story}"</p>
                    <p className="font-semibold text-primary bg-white px-4 py-2 rounded-full shadow-sm">
                      Amount Raised: <span className="text-green-600">{story.amountRaised}</span>
                    </p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white" />
          <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white" />
        </Carousel>
      </div>
    </section>
  )
}

