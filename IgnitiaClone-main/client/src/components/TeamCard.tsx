import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TeamCardProps {
  name: string;
  role: string;
  image: string;
  department?: string;
}

export default function TeamCard({ name, role, image, department }: TeamCardProps) {
  const initials = name.split(" ").map(n => n[0]).join("").toUpperCase();

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover-elevate">
      <CardContent className="p-6 text-center">
        <Avatar className="w-24 h-24 mx-auto mb-4 ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all">
          <AvatarImage src={image} alt={name} />
          <AvatarFallback className="bg-primary/10 text-primary text-xl font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>
        <h3 className="font-semibold text-lg mb-1" data-testid="text-member-name">{name}</h3>
        <p className="text-sm text-primary mb-1" data-testid="text-member-role">{role}</p>
        {department && (
          <p className="text-xs text-muted-foreground">{department}</p>
        )}
      </CardContent>
    </Card>
  );
}
