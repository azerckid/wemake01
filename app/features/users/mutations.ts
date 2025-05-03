import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/supa-client";

export const updateUser = async (
    client: SupabaseClient<Database>,
    {
        id,
        name,
        role,
        headline,
        bio,
    }: {
        id: string;
        name: string;
        role: "developer" | "designer" | "product-manager" | "founder" | "other";
        headline: string;
        bio: string;
    }
) => {
    const { error } = await client
        .from("profiles")
        .update({ name, role, headline, bio })
        .eq("profile_id", id);
    if (error) {
        throw error;
    }
};

export const updateUserAvatar = async (
    client: SupabaseClient<Database>,
    {
        id,
        avatarUrl,
    }: {
        id: string;
        avatarUrl: string;
    }
) => {
    // Update profiles table
    const { error: profileError } = await client
        .from("profiles")
        .update({ avatar_url: avatarUrl })
        .eq("profile_id", id);
    if (profileError) {
        throw profileError;
    }

    // Update user metadata
    const { error: userError } = await client.auth.updateUser({
        data: { avatar_url: avatarUrl }
    });
    if (userError) {
        throw userError;
    }
};

export const seeNotification = async (
    client: SupabaseClient<Database>,
    { userId, notificationId }: { userId: string; notificationId: string }
) => {
    const { error } = await client
        .from("notifications")
        .update({ seen: true })
        .eq("notification_id", +notificationId)
        .eq("target_id", userId);
    if (error) {
        throw error;
    }
};