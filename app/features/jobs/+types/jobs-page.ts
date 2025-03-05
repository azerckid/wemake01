export namespace Route {
    export interface LoaderArgs { }

    export interface ActionArgs { }

    export interface ComponentProps {
        loaderData: unknown;
        actionData?: unknown;
    }

    export type MetaFunction = () => Array<{
        title?: string;
        name?: string;
        content?: string;
    }>;
} 