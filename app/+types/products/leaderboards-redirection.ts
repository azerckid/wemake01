import type { MetaFunction as RouterMetaFunction } from "react-router";

export namespace Route {
    export type MetaFunction = RouterMetaFunction;
    export interface LoaderArgs {
        params: {
            period: string;
        };
    }
} 