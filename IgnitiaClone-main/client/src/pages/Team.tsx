import TeamCard from "@/components/TeamCard";
import teamMale from "@assets/generated_images/Team_member_male_photo_b1563a63.png";
import teamFemale from "@assets/generated_images/Team_member_female_photo_b0df5488.png";

const teamMembers = [
  {
    name: "Rahul Sharma",
    role: "Festival Coordinator",
    department: "Computer Science",
    image: teamMale,
  },
  {
    name: "Priya Patel",
    role: "Technical Head",
    department: "Information Technology",
    image: teamFemale,
  },
  {
    name: "Arjun Kumar",
    role: "Cultural Secretary",
    department: "Electronics",
    image: teamMale,
  },
  {
    name: "Sneha Reddy",
    role: "Sponsorship Lead",
    department: "Computer Science",
    image: teamFemale,
  },
  {
    name: "Vikram Singh",
    role: "Event Manager",
    department: "Mechanical",
    image: teamMale,
  },
  {
    name: "Ananya Gupta",
    role: "Marketing Head",
    department: "MBA",
    image: teamFemale,
  },
  {
    name: "Karan Verma",
    role: "Logistics Coordinator",
    department: "Civil",
    image: teamMale,
  },
  {
    name: "Ishita Jain",
    role: "Design Lead",
    department: "Computer Science",
    image: teamFemale,
  },
];

const departments = [
  { title: "Core Team", members: teamMembers.slice(0, 4) },
  { title: "Operations", members: teamMembers.slice(4) },
];

export default function Team() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            Our <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Team</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Meet the dedicated team bringing Ignitia 2K25 to life
          </p>
        </div>

        <div className="space-y-16">
          {departments.map((dept) => (
            <div key={dept.title}>
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-8" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                {dept.title}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {dept.members.map((member, idx) => (
                  <TeamCard key={idx} {...member} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
