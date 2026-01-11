import { Battery, Bluetooth, Music, ShieldCheck } from "lucide-react";

const features = [
    {
        icon: Music,
        title: "Crystal Clear Audio",
        description: "Custom drivers deliver deep bass and crisp highs for an immersive listening experience."
    },
    {
        icon: Battery,
        title: "All-Day Power",
        description: "Up to 30 hours of battery life with the charging case keeps you moving."
    },
    {
        icon: Bluetooth,
        title: "Seamless Pairing",
        description: "Instant connection with Bluetooth 5.2 for stable, lag-free audio streaming."
    },
    {
        icon: ShieldCheck,
        title: "Built to Last",
        description: "Premium materials and IPX4 water resistance for durability you can trust."
    }
];

export default function WhyChooseMono() {
    return (
        <section className="py-24 border-t border-zinc-100">
            <div className="text-center max-w-2xl mx-auto mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 tracking-tight mb-4">
                    Why Choose Mono?
                </h2>
                <p className="text-zinc-500 text-lg">
                    Engineered for perfection, designed for you.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, i) => (
                    <div key={i} className="bg-zinc-50 rounded-[2rem] p-8 hover:bg-zinc-100 transition-colors">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
                            <feature.icon size={24} className="text-zinc-900" />
                        </div>
                        <h3 className="text-xl font-bold text-zinc-900 mb-3">{feature.title}</h3>
                        <p className="text-zinc-500 leading-relaxed">
                            {feature.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
