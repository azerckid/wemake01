import type { MetaFunction as RouterMetaFunction } from "react-router";

export namespace Route {
    export type MetaFunction = RouterMetaFunction;
    export interface LoaderArgs {
        request: Request;
    }
    export interface ComponentProps<T extends (...args: any) => any> {
        loaderData: Awaited<ReturnType<T>>;
    }
    export interface LinksFunction {
        (): { rel: string; href: string; crossOrigin?: string; }[];
    }
    export interface ErrorBoundaryProps {
        error: Error;
    }
}