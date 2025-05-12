import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from "~/supa-client";
import { productListSelect } from "../products/queries";
import { redirect } from "react-router";

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
          name,
          headline,
          bio,
          role
        
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

export const getLoggedInUserId = async (client: SupabaseClient<Database>) => {
    const { data, error } = await client.auth.getUser();
    if (error || data.user === null) {
        throw redirect("/auth/login");
    }
    return data.user.id;
};

export const getProductsByUserId = async (
    client: SupabaseClient<Database>,
    { userId }: { userId: string }
) => {
    // 먼저 profiles 테이블에서 해당 사용자의 profile_id를 찾습니다.
    const { data: profileData, error: profileError } = await client
        .from("profiles")
        .select("profile_id")
        .eq("profile_id", userId)
        .single();

    if (profileError) {
        throw profileError;
    }

    if (!profileData) {
        return []; // 프로필이 없는 경우 빈 배열 반환
    }

    // 찾은 profile_id로 제품을 조회합니다.
    const { data, error } = await client
        .from("product")
        .select(`name, product_id`)
        .eq("profile_id", profileData.profile_id);

    if (error) {
        throw error;
    }

    return data;
};

export const getNotifications = async (
    client: SupabaseClient<Database>,
    { userId }: { userId: string }
) => {
    const { data, error } = await client
        .from("notifications")
        .select(
            `
        notification_id,
        type,
        source:profiles!source_id(
          profile_id,
          name,
          avatar_url
        ),
        product:product!product_id(
          product_id,
          name
        ),
        post:posts!post_id(
          post_id,
          title
        ),
        seen,
        created_at
        `
        )
        .eq("target_id", userId)
        .order("created_at", { ascending: false });
    if (error) {
        throw error;
    }
    return data;
};

export const countNotifications = async (
    client: SupabaseClient<Database>,
    { userId }: { userId: string }
) => {
    const { count, error } = await client
        .from("notifications")
        .select("*", { count: "exact", head: true })
        .eq("seen", false)
        .eq("target_id", userId);
    if (error) {
        throw error;
    }
    return count ?? 0;
};


export const getMessages = async (
    client: SupabaseClient<Database>,
    { userId }: { userId: string }
) => {
    const { data, error } = await client
        .from("messages_view")
        .select("*")
        .eq("profile_id", userId)
        .neq("other_profile_id", userId);
    if (error) {
        throw error;
    }
    return data;
};