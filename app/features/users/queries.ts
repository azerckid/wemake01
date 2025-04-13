import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from "~/supa-client";
import { productListSelect } from "../products/queries";

export const getUserProfile = async (
    client: SupabaseClient<Database>,
    { username }: { username: string }
) => {
    const { data, error } = await client
        .from("profiles")
        .select(
            `
         profile_id,
         name,
         username,
         avatar_url,
         role,
         headline,
         bio
         `
        )
        .eq("username", username)
        .maybeSingle();
    if (error) {
        throw error;
    }
    return data;
};

export const getUserById = async (
    client: SupabaseClient<Database>,
    { id }: { id: string }
) => {
    const { data, error } = await client
        .from("profiles")
        .select(
            `
          profile_id,
          username,
          avatar_url,
          name
          `
        )
        .eq("profile_id", id)
        .maybeSingle();
    if (error) {
        throw error;
    }
    return data;
};

export const getUserProducts = async (
    client: SupabaseClient<Database>,
    { username }: { username: string }
) => {
    const { data, error } = await client
        .from("product")
        .select(
            `
         ${productListSelect},
         profiles!product_to_profiles!inner (
             profile_id
         )
     `
        )
        .eq("profiles.username", username);
    if (error) {
        throw error;
    }
    return data;
};

export const getUserPosts = async (
    client: SupabaseClient<Database>,
    { username }: { username: string }
) => {
    const { data, error } = await client
        .from("community_post_list_view")
        .select("*")
        .eq("author_username", username);
    if (error) {
        throw error;
    }
    return data;
};