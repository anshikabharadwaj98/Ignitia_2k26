import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Users, Calendar, Star } from "lucide-react";

const stats = [
  { icon: Trophy, label: "Events", value: "50+", color: "text-primary" },
  { icon: Users, label: "Participants", value: "5000+", color: "text-accent" },
  { icon: Calendar, label: "Days", value: "2", color: "text-primary" },
  { icon: Star, label: "Years", value: "10+", color: "text-accent" },
];

export default function About() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            About <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Ignitia</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The flagship techno-cultural festival of PSIT Kanpur
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="text-center hover-elevate">
                <CardContent className="pt-6">
                  <Icon className={`w-12 h-12 mx-auto mb-4 ${stat.color}`} />
                  <p className="text-3xl font-bold mb-2">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
              What is Ignitia?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              Ignitia is the annual techno-cultural extravaganza of Pranveer Singh Institute of Technology (PSIT), Kanpur. 
              For over a decade, Ignitia has been the highlight of the academic calendar, bringing together students from 
              across the nation to celebrate innovation, creativity, and talent.
            </p>
            <p>
              The festival spans two electrifying days filled with technical competitions, cultural performances, literary 
              events, and celebrity appearances. From hackathons and coding challenges to music festivals and dance battles, 
              Ignitia offers a platform for students to showcase their skills and passion.
            </p>
            <p>
              With participation from thousands of students, renowned industry speakers, and exciting prize pools, Ignitia 
              has established itself as one of the premier college festivals in North India. The event not only celebrates 
              student talent but also fosters learning, networking, and unforgettable experiences.
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover-elevate">
            <CardHeader>
              <CardTitle>Technical Excellence</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              Cutting-edge competitions including hackathons, coding challenges, robotics events, and tech talks 
              featuring industry leaders.
            </CardContent>
          </Card>

          <Card className="hover-elevate">
            <CardHeader>
              <CardTitle>Cultural Vibrancy</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              A spectacular array of cultural events including dance, music, drama, fashion shows, and celebrity 
              performances that light up the nights.
            </CardContent>
          </Card>

          <Card className="hover-elevate">
            <CardHeader>
              <CardTitle>Literary Brilliance</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              Engaging competitions like debates, quizzes, creative writing, and poetry that celebrate the power 
              of words and ideas.
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
