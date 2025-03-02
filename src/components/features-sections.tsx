import { Heart, GraduationCap, Dog } from "lucide-react";
import Image from "next/image";

const colorMap = {
  blue: {
    bg: "bg-blue-200",
    text: "text-blue-700",
  },
  green: {
    bg: "bg-green-200",
    text: "text-green-700",
  },
  purple: {
    bg: "bg-purple-200",
    text: "text-purple-700",
  },
};

export function FeaturesSection() {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-100 to-green-200">
      <div className="container mx-auto px-8 lg:px-16">
        <div className="bg-white border border-gray-300 rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-12 sm:p-16 bg-gradient-to-r from-white to-green-100 ">
            <h2 className="text-5xl sm:text-5xl font-bold text-gray-900 mb-8 text-center">
              Transforming Lives Together
            </h2>
            

            <div className="grid lg:grid-cols-2 gap-10 items-start">
              <div className="space-y-8">
                <FeatureItem
                  icon={Heart}
                  title="Medical Support"
                  description="Delivering crucial medical aid to underprivileged areas."
                  color="blue"
                />
                <FeatureItem
                  icon={GraduationCap}
                  title="Educational Aid"
                  description="Empowering the next generation through access to education."
                  color="green"
                />
                <FeatureItem
                  icon={Dog}
                  title="Animal Welfare"
                  description="Providing care and protection for animals in need."
                  color="purple"
                />
              </div>

              <div className="lg:row-span-2">
                <div className="relative rounded-3xl overflow-hidden shadow-lg h-full min-h-[450px] border border-gray-400">
                  <Image
                    src="/image/founder.jpg"
                    alt="Founder"
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-6 left-8 right-8 text-white">
                    <p className="text-2xl font-bold">Our Founder</p>
                    <p className="text-lg opacity-90">A visionary leader dedicated to change</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureItem({ icon: Icon, title, description, color }) {
  const { bg, text } = colorMap[color];

  return (
    <div className="flex items-start space-x-5 p-6 border border-gray-300 rounded-2xl transition-all duration-300 hover:bg-gray-100 hover:shadow-lg">
      <div className={`${bg} p-5 rounded-full border border-gray-400`}>
        <Icon className={`w-8 h-8 ${text}`} />
      </div>
      <div>
        <h3 className="font-bold text-2xl text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-700 text-lg">{description}</p>
      </div>
    </div>
  );
}
