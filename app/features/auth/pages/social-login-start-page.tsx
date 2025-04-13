import { z } from "zod";
import type { Route } from "../+types/social-start-page.ts";
import { redirect } from "react-router";
import { makeSSRClient } from "~/supa-client";

const paramsSchema = z.object({
    provider: z.enum(["github", "kakao"]),
});

export const loader = async ({ params, request }: Route.LoaderArgs) => {
    console.log("Social login start page loaded", { params });

    const { success, data } = paramsSchema.safeParse(params);
    console.log("===========", success, data);

    if (!success) {
        console.error("Invalid provider parameter", params);
        return redirect("/auth/login");
    }
    const { provider } = data;

    // 현재 URL에서 도메인을 가져와 리다이렉트 URL 구성
    const url = new URL(request.url);
    const redirectTo = `${url.protocol}//${url.host}/auth/social/${provider}/complete`;
    console.log("Redirect URL:", redirectTo);

    try {
        const { client, headers } = makeSSRClient(request);
        console.log("Initiating OAuth flow for provider:", provider);

        const {
            data: { url: authUrl },
            error,
        } = await client.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo,
                queryParams: {
                    // 카카오 로그인을 위한 추가 파라미터
                    ...(provider === "kakao" ? { prompt: "login" } : {}),
                },
            },
        });

        console.log("===========>>>>>>>", authUrl);

        if (error) {
            console.error("OAuth error:", error);
            return redirect("/auth/login?error=oauth_failed");
        }

        if (authUrl) {
            console.log("Redirecting to auth URL:", authUrl);
            return redirect(authUrl, { headers });
        }

        console.error("No auth URL returned");
        return redirect("/auth/login?error=no_auth_url");
    } catch (err) {
        console.error("Unexpected error during OAuth initiation:", err);
        return redirect("/auth/login?error=unexpected_error");
    }
};