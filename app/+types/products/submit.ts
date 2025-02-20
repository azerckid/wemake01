import type { MetaFunction as RouterMetaFunction } from "react-router";

export namespace Route {
    export type MetaFunction = RouterMetaFunction;
    export interface ComponentProps<T extends (...args: any) => any> {
        actionData: Awaited<ReturnType<T>>;
    }
} 