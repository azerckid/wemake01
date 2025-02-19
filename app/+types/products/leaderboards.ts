import type { MetaFunction as RouterMetaFunction } from "react-router";

export namespace Route {
    export type MetaFunction = RouterMetaFunction;
    export interface LoaderArgs {
        params: {
            year: string;
            month: string;
            day: string;
        };
    }
    export interface ErrorBoundaryProps {
        error: Error;
    }
    export interface ComponentProps<T extends (...args: any) => any> {
        loaderData: Awaited<ReturnType<T>>;
    }
    export interface MetaArgs {
        params: {
            year: string;
            month: string;
            day: string;
        };
    }
} 