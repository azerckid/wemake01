import type { Database } from "~/supa-client";
import type { SupabaseClient as SupabaseClientType } from '@supabase/supabase-js';

export const createPost = async (
    client: SupabaseClientType<Database>,
    {
        title,
        category,
        content,
        userId,
    }: {
        title: string;
        category: string;
        content: string;
        userId: string;
    }
) => {
    const { data: categoryData, error: categoryError } = await client
        .from("topics")
        .select("topic_id")
        .eq("slug", category)
        .single();
    if (categoryError) {
        throw categoryError;
    }
    const { data, error } = await client
        .from("posts")
        .insert({
            title,
            content,
            profile_id: userId,
            topic_id: categoryData.topic_id,
        })
        .select()
        .single();
    if (error) {
        throw error;
    }
    return data;
};