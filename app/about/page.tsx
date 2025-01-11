

import  TeamMembers  from '@/components/about/team' 
import { getTeamMembers } from '../actions/teams'


export default async function AboutPage() {
  const team = await getTeamMembers()
  console.log(team)
  return (
   <TeamMembers teamMembers={team} />
  )
}