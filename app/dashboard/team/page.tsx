import { getTeamMembers } from "@/app/actions/teams";
import TeamTable from "@/components/dashboard/team/team-table";
import { TeamMember } from "@/lib/types/team";

export default async function TeamPage() {
  const teamMembers: TeamMember[] = await getTeamMembers();
  console.log(teamMembers);

  return (
    <div className="space-y-8">
      <TeamTable teamMembers={teamMembers} />
    </div>
  );
}
