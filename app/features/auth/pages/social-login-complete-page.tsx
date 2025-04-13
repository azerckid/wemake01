import type { Route } from "./+types/social-login-complete-page";
import { z } from "zod";
import { redirect } from "react-router";
import { makeSSRClient } from "~/supa-client";


const paramsSchema = z.object({
    provider: z.enum(["github", "kakao"]),
});

export const loader = async ({ params, request }: Route.LoaderArgs) => {

    console.log("===========>>>>>>>>>>>>>>", params);
    const { success, data } = paramsSchema.safeParse(params);
    console.log("===========>>>>>>>>>>>>>> 이까지 왔어요");
    console.log("===========>>>>>>>>>>>>>> success", success);
    console.log("===========>>>>>>>>>>>>>> data", data);
    if (!success) {
        return redirect("/auth/login");
    }
    const url = new URL(request.url);
    console.log("===========>>>>>>>>>>>>>> url", url);
    const code = url.searchParams.get("code");
    console.log("===========>>>>>>>>>>>>>> code", code);
    if (!code) {
        return redirect("/auth/login");
    }
    const { client, headers } = makeSSRClient(request);
    const { error } = await client.auth.exchangeCodeForSession(code);
    if (error) {
        throw error;
    }
    return redirect("/", { headers });
};