import type { LoaderFunctionArgs, MetaFunction as RouterMetaFunction } from "react-router";

export namespace Route {
    export interface LoaderArgs extends LoaderFunctionArgs {
        params: {
            productId: string;
        }
    }
    export type MetaFunction = RouterMetaFunction;
    export interface ComponentProps {
        loaderData: void; // redirect는 실제로 데이터를 반환하지 않습니다
        actionData?: unknown;
    }
} 