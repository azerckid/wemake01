import client from "~/supa-client";

export const getTeams = async ({ limit }: { limit: number }) => {
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

export const getTeamById = async (teamId: string) => {
    const { data, error } = await client
        .from("teams")
        .select(
            `
        *,
        team_leader:profiles!inner(
          username,
          avatar_url,
          role,
          name
        )
        `
        )
        .eq("team_id", parseInt(teamId))
        .single();
    if (error) throw error;
    return data;
};