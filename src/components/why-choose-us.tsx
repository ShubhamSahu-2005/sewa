import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Heart, Zap } from "lucide-react";

const reasons = [
  {
    icon: Zap,
    title: "Quick Funds Disbursal",
    description: "Get funds disbursed directly to the hospital or beneficiary quickly and securely.",
  },
  {
    icon: Check,
    title: "0% Platform Fee",
    description: "We don't charge any platform fees. 100% of your donation goes to the cause.",
  },
  {
    icon: Heart,
    title: "1000+ People Supported",
    description: "Join our growing community of changemakers and help those in need.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="bg-gradient-to-r from-blue-100 to-green-200 py-16">
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="mb-10 text-center text-4xl font-extrabold text-gray-800">
          Why Fundraising With <span className="text-green-600">SacchiSewa</span>?
        </h2>
        <div className="grid gap-10 md:grid-cols-3">
          {reasons.map((reason, index) => (
            <Card
              key={index}
              className="bg-white border rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <CardHeader className="flex items-center gap-4 p-6 bg-gradient-to-r from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 transition-colors duration-300">
                <reason.icon className="h-12 w-12 text-green-600 transition-transform duration-300 hover:scale-110" />
                <CardTitle className="text-2xl font-semibold text-green-800">{reason.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-gray-700 text-base leading-relaxed">{reason.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
