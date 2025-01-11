"use server"
import { createClient } from "@/lib/supabase/server"

export async function getDataFromSupabase(table: string, requiredAuth: boolean = true) {
    const supabase = await createClient()
    try {

        if (requiredAuth) {
            const session = await supabase.auth.getSession()
            if (!session) {
                throw new Error('User is not authenticated')
            }
        }
        const { data, error } = await supabase
            .from(table)
            .select('*')


        if (error) throw error
        return data
    } catch (error) {
        console.error('Error fetching data:', error)
        return null
    }
}

export async function insertDataToSupabase(payload: any, table: string, requiredAuth: boolean = true) {
    const supabase = await createClient()
    try {
        if (requiredAuth) {
            const session = await supabase.auth.getSession()
            if (!session) {
                throw new Error('User is not authenticated')
            }
        }
        const { data, error } = await supabase
            .from(table)
            .insert(payload)
        if (error) throw error
        return data
    } catch (error: any) {
       throw error?.message

    }
}

export async function updateDataInSupabase(id: string, updates: any, table: string, requiredAuth: boolean = true) {
    const supabase = await createClient()
    if (requiredAuth) {
        const session = await supabase.auth.getSession()
        if (!session) {
            throw new Error('User is not authenticated')
        }
    }

    try {
        const { data, error } = await supabase
            .from(table)
            .update(updates)
            .match({ id })
        console.log(data)
        if (error) throw error

        return data
    } catch (error) {
        console.error('Error updating data:', error)
        return null
    }
}

export async function deleteDataFromSupabase(id: number, table: string, requiredAuth: boolean = true) {
    const supabase = await createClient()

    if (requiredAuth) {
        const session = await supabase.auth.getSession()
        if (!session) {
            throw new Error('User is not authenticated')
        }
    }

    try {
        const { data, error } = await supabase
            .from(table)
            .delete()
            .match({ id })

        if (error) throw error
        return data
    } catch (error) {
        console.error('Error deleting data:', error)
        return null
    }

}

export async function getSingleDataFromSupabase(id: string, table: string, requiredAuth: boolean = true) {

    try {
        
    } catch (error) {
        
    }
}