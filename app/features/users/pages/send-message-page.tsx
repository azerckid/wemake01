import { makeSSRClient } from "~/supa-client";
import type { Route } from "./+types/send-message-page";
import { getLoggedInUserId, getUserProfile } from "../queries";
import { sendMessage } from "../mutations";
import { z } from "zod";
import { redirect } from "react-router";

const formSchema = z.object({
    content: z.string().min(1),
});
export const loader = async (_: Route.LoaderArgs) => {
    return {};
};

export const action = async ({ request, params }: Route.ActionArgs) => {
    if (request.method !== "POST") {
        return Response.json({ error: "Method not allowed" }, { status: 405 });
    }
    const formData = await request.formData();
    const { client } = makeSSRClient(request);
    const fromUserId = await getLoggedInUserId(client);
    const userProfile = await getUserProfile(client, { username: params.username });
    if (!userProfile) {
        // Handle the case where the user profile is not found
        return Response.json({ error: "User not found" }, { status: 404 });
    }
    const { profile_id: toUserId } = userProfile;
    const messageRoomId = await sendMessage(client, {
        fromUserId,
        toUserId,
        content: formData.get("content") as string,
    });
    return redirect(`/my/messages/${messageRoomId}`);
};