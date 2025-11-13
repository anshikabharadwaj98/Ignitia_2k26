import EventCard from '../EventCard'
import { Code } from 'lucide-react'

export default function EventCardExample() {
  return (
    <div className="p-6 max-w-sm">
      <EventCard
        title="Hackathon 2025"
        description="24-hour coding marathon to build innovative solutions"
        category="Technical"
        date="February 24, 2025"
        time="9:00 AM - 9:00 AM (Next Day)"
        icon={Code}
      />
    </div>
  )
}
