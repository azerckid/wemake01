import {
    createBrowserClient,
    createServerClient,
    parseCookieHeader,
    serializeCookieHeader,
} from "@supabase/ssr";
import type { MergeDeep, SetNonNullable, SetFieldType } from "type-fest";
import type { Database as SupabaseDatabase } from "database.types";

export type Database = MergeDeep<
    SupabaseDatabase,
    {
        public: {
            Views: {
                community_post_list_view: {
                    Row: SetFieldType<
                        SetNonNullable<
                            SupabaseDatabase["public"]["Views"]["community_post_list_view"]["Row"]
                        >,
                        "authoravatarurl",
                        string | null
                    >;
                };
                product_overview_view: {
                    Row: SetNonNullable<
                        SupabaseDatabase["public"]["Views"]["product_overview_view"]["Row"]
                    >;
                };
                community_post_detail: {
                    Row: SetNonNullable<
                        SupabaseDatabase["public"]["Views"]["community_post_detail"]["Row"]
                    >;
                };
                gpt_ideas_view: {
                    Row: SetNonNullable<
                        SupabaseDatabase["public"]["Views"]["gpt_ideas_view"]["Row"]
                    >;
                };
            };
        };
    }
>;

export const browserClient = createBrowserClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
);

export const makeSSRClient = (request: Request) => {
    const headers = new Headers();

    // 캐싱을 위한 클라이언트 인스턴스 저장소
    const clientCache = new Map<string, any>();
    const cacheKey = request.url;

    // 캐시된 클라이언트가 있으면 재사용
    if (clientCache.has(cacheKey)) {
        return clientCache.get(cacheKey);
    }

    const serverSideClient = createServerClient<Database>(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_ANON_KEY!,
        {
            cookies: {
                async getAll() {
                    // 1. 브라우저가 보낸 모든 쿠키를 파싱
                    const cookies = parseCookieHeader(request.headers.get("Cookie") ?? "");
                    // 2. 쿠키들을 Supabase가 이해할 수 있는 형식으로 변환
                    return cookies.map(({ name, value }) => ({
                        name,
                        value: value ?? ""
                    }));
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => {
                        headers.append(
                            "Set-Cookie",
                            serializeCookieHeader(name, value, options)
                        );
                    });
                },
            },
        }
    );

    const result = {
        client: serverSideClient,
        headers,
    };

    // 결과를 캐시에 저장
    clientCache.set(cacheKey, result);

    return result;
};