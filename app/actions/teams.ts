"use server"
import { getDataFromSupabase, insertDataToSupabase, updateDataInSupabase } from "@/hooks/database-actions"
import { TeamMember } from "@/lib/types/team"

export async function getTeamMembers() {

    try {
        const data = await getDataFromSupabase('teams', true)
        return  (data || [] as TeamMember[]).sort((a: TeamMember, b: TeamMember) => a.grade -b.grade)
    } catch (error) {
        throw error
    }
}

export async function getTeamMemberById() {

    try {
      await getDataFromSupabase('teams', true)

    } catch (error) {
        console.error('Error fetching data:', error)
        throw error
    }
}


export async function createTeamMember(data: TeamMember) {
    try {
        console.log('data', data)
        const { id } = data
        console.log(id ? 'updating' : 'creating')
        const teams = id ? await  updateDataInSupabase(id, data, 'teams', true) :  await insertDataToSupabase(data, 'teams', true)
        return teams
    } catch (error) {
        console.error('Error creating team member:', error)
        throw error
    }

}