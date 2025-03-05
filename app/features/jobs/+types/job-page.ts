export namespace Route {
    export interface LoaderArgs {
        params: {
            jobId: string;
        };
    }

    export interface ActionArgs {
        params: {
            jobId: string;
        };
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