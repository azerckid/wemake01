import { makeSSRClient } from "~/supa-client";

export const checkUsernameExists = async (
    request: Request,
    { username }: { username: string }
) => {
    const { client } = makeSSRClient(request);
    const { data, error } = await client
        .from("profiles")
        .select("profile_id")
        .eq("username", username)
        .maybeSingle();
    if (error) {
        return false;
    }
    return !!data;
};