import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/supa-client";

export const getTeams = async (
    client: SupabaseClient<Database>,
    { limit }: { limit: number }
) => {
    const { data, error } = await client
        .from("teams")
        .select(
            `
     team_id,
     roles,
     product_description,
     team_leader:profiles!inner(
       username,
       avatar_url
     )
     `
        )
        .limit(limit);

    if (error) {
        throw error;
    }

    return data;
};

export const getTeamById = async (
    client: SupabaseClient<Database>,
    { teamId }: { teamId: string }
) => {
    const { data, error } = await client
        .from("teams")
        .select(
            `
          team_id,
          product_name,
          product_description,
          product_stage,
          team_size,
          equity_split,
          roles,
          created_at,
          updated_at,
          team_leader:profiles!inner (
            profile_id,
            username,
            avatar_url,
            role,
            name
          )
        `
        )
        .eq("team_id", parseInt(teamId))
        .maybeSingle();
    if (error) throw error;
    return data;
};