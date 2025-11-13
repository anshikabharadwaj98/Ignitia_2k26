import TeamCard from '../TeamCard'
import teamMemberImage from '@assets/generated_images/Team_member_male_photo_b1563a63.png'

export default function TeamCardExample() {
  return (
    <div className="p-6 max-w-xs">
      <TeamCard
        name="Rahul Sharma"
        role="Festival Coordinator"
        image={teamMemberImage}
        department="Computer Science"
      />
    </div>
  )
}
