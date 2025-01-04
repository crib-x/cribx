import { createClient } from "../supabase/server";

export async function useSupabaseAuth() {
    const supabase = await createClient();
    const user = supabase.auth.getUser();
    return user ;
}