import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface EventCardProps {
  title: string;
  description: string;
  category: "Technical" | "Cultural" | "Literary";
  date: string;
  time: string;
  icon: LucideIcon;
}

const categoryColors = {
  Technical: "bg-primary/10 text-primary border-primary/20",
  Cultural: "bg-accent/10 text-accent border-accent/20",
  Literary: "bg-chart-2/10 text-chart-2 border-chart-2/20",
};

export default function EventCard({ title, description, category, date, time, icon: Icon }: EventCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover-elevate">
      <CardHeader>
        <div className="flex items-start justify-between gap-4 mb-2">
          <div className="p-3 rounded-lg bg-primary/10">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <Badge className={categoryColors[category]} data-testid={`badge-category-${category.toLowerCase()}`}>
            {category}
          </Badge>
        </div>
        <CardTitle className="text-xl" data-testid="text-event-title">{title}</CardTitle>
        <CardDescription data-testid="text-event-description">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{time}</span>
          </div>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full" variant="outline" data-testid="button-learn-more">
              Learn More
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-4 rounded-lg bg-primary/10">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1">
                  <DialogTitle className="text-2xl mb-1">{title}</DialogTitle>
                  <Badge className={categoryColors[category]}>{category}</Badge>
                </div>
              </div>
            </DialogHeader>
            
            <DialogDescription className="text-base space-y-4">
              <p className="text-foreground">{description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-card border">
                  <Calendar className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Date</p>
                    <p className="font-medium text-foreground">{date}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 rounded-lg bg-card border">
                  <Clock className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Time</p>
                    <p className="font-medium text-foreground">{time}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 rounded-lg bg-card border">
                  <MapPin className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Venue</p>
                    <p className="font-medium text-foreground">PSIT Campus</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 rounded-lg bg-card border">
                  <Users className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Team Size</p>
                    <p className="font-medium text-foreground">1-4 members</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 space-y-3">
                <h4 className="font-semibold text-foreground">Event Details</h4>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Open to all college students</li>
                  <li>Registration required before the event</li>
                  <li>Exciting prizes for winners</li>
                  <li>Certificates for all participants</li>
                </ul>
              </div>
              
              <div className="pt-4">
                <Button className="w-full" data-testid="button-register">
                  Register Now
                </Button>
              </div>
            </DialogDescription>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
