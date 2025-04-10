export namespace Route {
    export interface LoaderArgs {
        request: Request;
    }

    export interface ActionArgs {
        request: Request;
    }

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