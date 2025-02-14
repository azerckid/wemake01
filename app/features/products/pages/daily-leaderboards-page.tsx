import { DateTime } from "luxon";
import { data, isRouteErrorResponse } from "react-router";
import type { Route } from "~/+types/products/leaderboards";
import { date, z } from "zod";

const paramSchema = z.object({
    year: z.coerce.number(),
    month: z.coerce.number(),
    day: z.coerce.number()
});

export const loader = async ({ params }: Route.LoaderArgs) => {
    const { success, data: parsedData } = paramSchema.safeParse(params);
    if (!success) {
        throw data(
            {
                message: "Invalid date",
                error_code: "INVALID_DATE"
            },
            { status: 400 }
        );
    }

    const date = DateTime.fromObject(parsedData).setZone("Asia/Seoul");
    const today = DateTime.now().setZone("Asia/Seoul").startOf("day");

    if (!date.isValid) {
        throw data(
            {
                message: "Invalid date",
                error_code: "INVALID_DATE"
            },
            { status: 400 }
        );
    }
    if (!success) {
        throw data(
            {
                message: "Invalid date",
                error_code: "INVALID_DATE"
            },
            { status: 400 }
        );
    }
    if (date > today) {
        throw data(
            {
                message: "Date is in the future",
                error_code: "FUTURE_DATE"
            },
            { status: 400 }
        );
    }
    return data(date);
}

export default function DailyLeaderboardsPage({ loaderData }: Route.ComponentProps<typeof loader>) {
    return (
        <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold">Daily Leaderboards</h1>
        </div>
    );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
    if (isRouteErrorResponse(error)) {
        return (
            <div>
                {error.data.message} /{error.data.error_code}
            </div>
        );
    }
    if (error instanceof Error) {
        return <div>{error.message}</div>;
    }
    return <div>Unknown error</div>;
}

export const meta: Route.MetaFunction = () => {
    return [
        { title: "Daily Leaderboards | Products | wemake" },
        { name: "description", content: "Top products of the day" }
    ];
}; 