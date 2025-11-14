// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Trophy, Users, Calendar, Star } from "lucide-react";

// const stats = [
//   { icon: Trophy, label: "Events", value: "50+", color: "text-primary" },
//   { icon: Users, label: "Participants", value: "5000+", color: "text-accent" },
//   { icon: Calendar, label: "Days", value: "2", color: "text-primary" },
//   { icon: Star, label: "Years", value: "10+", color: "text-accent" },
// ];

// export default function About() {
//   return (
//     <div className="min-h-screen pt-24 pb-16">
//       <div className="max-w-7xl mx-auto px-4 md:px-8">
//         <div className="text-center mb-12">
//           <h1 className="text-4xl md:text-6xl font-bold mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
//             About <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Ignitia</span>
//           </h1>
//           <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//             The flagship techno-cultural festival of PSIT Kanpur
//           </p>
//         </div>

//         <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
//           {stats.map((stat) => {
//             const Icon = stat.icon;
//             return (
//               <Card key={stat.label} className="text-center hover-elevate">
//                 <CardContent className="pt-6">
//                   <Icon className={`w-12 h-12 mx-auto mb-4 ${stat.color}`} />
//                   <p className="text-3xl font-bold mb-2">{stat.value}</p>
//                   <p className="text-sm text-muted-foreground">{stat.label}</p>
//                 </CardContent>
//               </Card>
//             );
//           })}
//         </div>

//         <Card className="mb-12">
//           <CardHeader>
//             <CardTitle className="text-2xl" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
//               What is Ignitia?
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4 text-muted-foreground">
//             <p>
//               Ignitia is the annual techno-cultural extravaganza of Pranveer Singh Institute of Technology (PSIT), Kanpur. 
//               For over a decade, Ignitia has been the highlight of the academic calendar, bringing together students from 
//               across the nation to celebrate innovation, creativity, and talent.
//             </p>
//             <p>
//               The festival spans two electrifying days filled with technical competitions, cultural performances, literary 
//               events, and celebrity appearances. From hackathons and coding challenges to music festivals and dance battles, 
//               Ignitia offers a platform for students to showcase their skills and passion.
//             </p>
//             <p>
//               With participation from thousands of students, renowned industry speakers, and exciting prize pools, Ignitia 
//               has established itself as one of the premier college festivals in North India. The event not only celebrates 
//               student talent but also fosters learning, networking, and unforgettable experiences.
//             </p>
//           </CardContent>
//         </Card>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <Card className="hover-elevate">
//             <CardHeader>
//               <CardTitle>Technical Excellence</CardTitle>
//             </CardHeader>
//             <CardContent className="text-muted-foreground">
//               Cutting-edge competitions including hackathons, coding challenges, robotics events, and tech talks 
//               featuring industry leaders.
//             </CardContent>
//           </Card>

//           <Card className="hover-elevate">
//             <CardHeader>
//               <CardTitle>Cultural Vibrancy</CardTitle>
//             </CardHeader>
//             <CardContent className="text-muted-foreground">
//               A spectacular array of cultural events including dance, music, drama, fashion shows, and celebrity 
//               performances that light up the nights.
//             </CardContent>
//           </Card>

//           <Card className="hover-elevate">
//             <CardHeader>
//               <CardTitle>Literary Brilliance</CardTitle>
//             </CardHeader>
//             <CardContent className="text-muted-foreground">
//               Engaging competitions like debates, quizzes, creative writing, and poetry that celebrate the power 
//               of words and ideas.
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Users, Calendar, Star, Sparkles, Zap, Music, Code, BookOpen, Award, Rocket, Target, Heart, Flame } from "lucide-react";
import { useState, useEffect } from "react";

const stats = [
  { icon: Trophy, label: "Events", value: "50+", color: "text-primary", gradient: "from-primary to-accent" },
  { icon: Users, label: "Participants", value: "5000+", color: "text-accent", gradient: "from-accent to-primary" },
  { icon: Calendar, label: "Days", value: "2", color: "text-primary", gradient: "from-primary to-purple-400" },
  { icon: Star, label: "Years", value: "10+", color: "text-accent", gradient: "from-accent to-pink-400" },
];

const highlights = [
  { 
    icon: Code, 
    title: "Technical Excellence", 
    description: "Cutting-edge competitions including hackathons, coding challenges, robotics events, and tech talks featuring industry leaders.",
    gradient: "from-primary/20 to-purple-500/20",
    iconColor: "text-primary"
  },
  { 
    icon: Music, 
    title: "Cultural Vibrancy", 
    description: "A spectacular array of cultural events including dance, music, drama, fashion shows, and celebrity performances that light up the nights.",
    gradient: "from-accent/20 to-pink-500/20",
    iconColor: "text-accent"
  },
  { 
    icon: BookOpen, 
    title: "Literary Brilliance", 
    description: "Engaging competitions like debates, quizzes, creative writing, and poetry that celebrate the power of words and ideas.",
    gradient: "from-cyan-500/20 to-blue-500/20",
    iconColor: "text-cyan-400"
  },
];

export default function About() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen pt-20 pb-24 bg-background">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fadeInUp 0.7s ease-out forwards; }
      `}</style>
      
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        
        <div className="relative max-w-7xl mx-auto px-4 md:px-8 pt-16 pb-12">
          <div className={`text-center mb-20 ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}>
            <div className="flex items-center justify-center gap-4 mb-6 flex-wrap">
              <Sparkles className="w-10 h-10 md:w-12 md:h-12 text-primary animate-pulse" />
              <h1 className="text-5xl md:text-8xl font-bold animate-glow" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                About <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">IGNITIA</span>
              </h1>
              <Zap className="w-10 h-10 md:w-12 md:h-12 text-accent animate-pulse" />
            </div>
            <p className="text-2xl md:text-3xl text-foreground max-w-4xl mx-auto font-semibold mb-2" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
              The flagship techno-cultural festival of <span className="text-primary">PSIT Kanpur</span>
            </p>
            <div className="flex items-center justify-center gap-3 text-lg text-muted-foreground">
              <Target className="w-5 h-5 text-accent" />
              <span>Innovation • Culture • Excellence</span>
              <Target className="w-5 h-5 text-accent" />
            </div>
          </div>

          <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-24 ${isVisible ? 'animate-slide-in' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card 
                  key={stat.label} 
                  className="group relative overflow-hidden border-primary/30 hover:border-primary transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20 bg-gradient-to-br from-background via-primary/5 to-background"
                  style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <CardContent className="relative pt-10 pb-8 text-center">
                    <div className="relative inline-block mb-5">
                      <Icon className={`w-16 h-16 md:w-20 md:h-20 ${stat.color} group-hover:scale-125 group-hover:rotate-12 transition-all duration-500`} />
                      <div className={`absolute inset-0 ${stat.color} blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500`} />
                    </div>
                    <p className={`text-5xl md:text-6xl font-bold mb-3 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-500`} style={{ fontFamily: 'Orbitron, sans-serif' }}>
                      {stat.value}
                    </p>
                    <p className="text-base md:text-lg text-foreground font-semibold group-hover:text-primary transition-colors duration-300" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                      {stat.label}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className={`mb-20 ${isVisible ? 'animate-slide-in' : 'opacity-0'}`} style={{ animationDelay: '0.8s' }}>
            <Card className="relative overflow-hidden border-2 border-primary/40 bg-gradient-to-br from-background via-primary/10 to-accent/10 shadow-2xl shadow-primary/10 animate-glow">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
              
              <CardHeader className="relative pb-6">
                <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                  <div className="relative">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-accent animate-pulse">
                      <Award className="w-8 h-8 md:w-10 md:h-10 text-white" />
                    </div>
                    <div className="absolute inset-0 bg-primary blur-xl opacity-50 animate-pulse" />
                  </div>
                  <CardTitle className="text-4xl md:text-6xl font-extrabold text-center md:text-left" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    What is <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">Ignitia?</span>
                  </CardTitle>
                </div>
              </CardHeader>
              
              <CardContent className="relative space-y-8 pb-10 px-6 md:px-10">
                <div className="space-y-6 text-lg md:text-xl leading-relaxed">
                  <div className="group">
                    <div className="flex items-start gap-4">
                      <Rocket className="w-7 h-7 text-primary flex-shrink-0 mt-1 group-hover:scale-125 transition-transform duration-300" />
                      <p className="text-foreground font-medium group-hover:text-primary transition-colors duration-300">
                        <span className="text-2xl md:text-3xl font-bold text-primary">Ignitia</span> is the annual <span className="text-accent font-semibold">techno-cultural extravaganza</span> of Pranveer Singh Institute of Technology (PSIT), Kanpur. 
                        For over a <span className="text-primary font-semibold">decade</span>, Ignitia has been the highlight of the academic calendar, bringing together students from 
                        across the nation to celebrate <span className="text-accent font-semibold">innovation, creativity, and talent</span>.
                      </p>
                    </div>
                  </div>

                  <div className="group">
                    <div className="flex items-start gap-4">
                      <Music className="w-7 h-7 text-accent flex-shrink-0 mt-1 group-hover:scale-125 transition-transform duration-300" />
                      <p className="text-foreground font-medium group-hover:text-accent transition-colors duration-300">
                        The festival spans <span className="text-primary font-bold text-2xl">two electrifying days</span> filled with technical competitions, cultural performances, literary 
                        events, and celebrity appearances. From <span className="text-primary font-semibold">hackathons and coding challenges</span> to <span className="text-accent font-semibold">music festivals and dance battles</span>, 
                        Ignitia offers a platform for students to showcase their skills and passion.
                      </p>
                    </div>
                  </div>

                  <div className="group">
                    <div className="flex items-start gap-4">
                      <Star className="w-7 h-7 text-yellow-400 flex-shrink-0 mt-1 group-hover:scale-125 group-hover:rotate-180 transition-all duration-300" />
                      <p className="text-foreground font-medium group-hover:text-yellow-400 transition-colors duration-300">
                        With participation from <span className="text-accent font-bold text-2xl">thousands of students</span>, renowned industry speakers, and exciting prize pools, Ignitia 
                        has established itself as one of the <span className="text-primary font-semibold">premier college festivals in North India</span>. The event not only celebrates 
                        student talent but also fosters <span className="text-accent font-semibold">learning, networking, and unforgettable experiences</span>.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-primary/20">
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors duration-300">
                    <Flame className="w-8 h-8 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Duration</p>
                      <p className="text-lg font-bold text-primary">2 Days</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-accent/10 hover:bg-accent/20 transition-colors duration-300">
                    <Trophy className="w-8 h-8 text-accent" />
                    <div>
                      <p className="text-sm text-muted-foreground">Categories</p>
                      <p className="text-lg font-bold text-accent">50+ Events</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 transition-colors duration-300">
                    <Users className="w-8 h-8 text-purple-400" />
                    <div>
                      <p className="text-sm text-muted-foreground">Reach</p>
                      <p className="text-lg font-bold text-purple-400">5000+ People</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 ${isVisible ? 'animate-slide-in' : 'opacity-0'}`} style={{ animationDelay: '1s' }}>
            {highlights.map((highlight, index) => {
              const Icon = highlight.icon;
              return (
                <Card 
                  key={highlight.title} 
                  className="group relative overflow-hidden border-2 border-primary/30 hover:border-primary hover:-translate-y-3 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/30 bg-gradient-to-br from-background to-primary/5"
                  style={{ animationDelay: `${1.1 + index * 0.15}s` }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${highlight.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(139,92,246,0.1),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <CardHeader className="relative pb-4">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative">
                        <div className={`p-4 rounded-2xl bg-gradient-to-br ${highlight.gradient} group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                          <Icon className={`w-8 h-8 md:w-10 md:h-10 ${highlight.iconColor}`} />
                        </div>
                        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${highlight.gradient} blur-lg opacity-0 group-hover:opacity-75 transition-opacity duration-500`} />
                      </div>
                    </div>
                    <CardTitle className="text-2xl md:text-3xl font-bold group-hover:text-primary transition-colors duration-300" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                      {highlight.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="relative text-base md:text-lg text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
                    {highlight.description}
                  </CardContent>
                  
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-tl-full" />
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
