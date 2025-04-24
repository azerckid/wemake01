import type { MetaFunction as ReactRouterMetaFunction } from "react-router";

export namespace Route {
    export type ActionArgs = {
        request: Request;
        params: Record<string, string>;
    };

    export type ComponentProps = {
        loaderData: any;
        actionData: any;
    };

    export type MetaFunction = ReactRouterMetaFunction;
} 