import { Card, CardContent } from "@/components/ui/card";

interface SponsorCardProps {
  name: string;
  logo?: string;
  tier: "Title" | "Platinum" | "Gold" | "Silver";
}

const tierStyles = {
  Title: "h-32",
  Platinum: "h-24",
  Gold: "h-20",
  Silver: "h-16",
};

export default function SponsorCard({ name, logo, tier }: SponsorCardProps) {
  return (
    <Card className="hover:shadow-lg transition-all duration-300 hover-elevate">
      <CardContent className={`p-6 flex items-center justify-center ${tierStyles[tier]}`}>
        {logo ? (
          <img src={logo} alt={name} className="max-h-full max-w-full object-contain" />
        ) : (
          <div className="text-center">
            <p className="font-semibold text-lg text-muted-foreground" data-testid="text-sponsor-name">{name}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
