import type { ActionFunctionArgs } from "react-router";

export namespace Route {
    export interface ActionArgs {
        request: Request;
        params: {
            notificationId: string;
        };
    }
} 