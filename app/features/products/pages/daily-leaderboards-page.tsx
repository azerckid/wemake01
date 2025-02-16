import { DateTime } from "luxon";
import { data, isRouteErrorResponse } from "react-router";
import type { Route } from "~/+types/products/leaderboards";
import { date, z } from "zod";
import { Hero } from "~/common/components/hero";
import { ProductCard } from "../components/product-card";
import { Button } from "~/common/components/ui/button";
import { Link } from "react-router";
import ProductPagination from "~/common/components/product-pagination";
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
    return {
        ...parsedData,
    };
};

export default function DailyLeaderboardsPage({ loaderData }: Route.ComponentProps<typeof loader>) {
    const urlDate = DateTime.fromObject({
        year: loaderData.year,
        month: loaderData.month,
        day: loaderData.day
    }).setZone("Asia/Seoul");

    const previousDay = urlDate.minus({ day: 1 });
    const nextDay = urlDate.plus({ day: 1 });
    const isToday = urlDate.equals(DateTime.now().startOf("day"));

    return (
        <div className="container mx-auto px-4">
            <Hero
                title="Daily Leaderboards"
                description={`Top products of ${urlDate.toLocaleString(DateTime.DATETIME_MED)}`}
            />
            <div className="flex items-center justify-center gap-2 mb-4">
                <Button variant="outline" asChild>
                    <Link to={`/products/leaderboards/daily/${previousDay.year}/${previousDay.month}/${previousDay.day}`}>
                        &larr; {previousDay.toLocaleString(DateTime.DATE_MED)}
                    </Link>
                </Button>
                {!isToday ? (
                    <Button variant="outline" asChild>
                        <Link to={`/products/leaderboards/daily/${nextDay.year}/${nextDay.month}/${nextDay.day}`}>
                            {nextDay.toLocaleString(DateTime.DATE_MED)} &rarr;
                        </Link>
                    </Button>
                ) : null}
            </div>
            <div className="space-y-4 w-full max-w-screen-md mx-auto grid">
                {Array.from({ length: 10 }).map((_, index) => (
                    <ProductCard
                        key={index}
                        id={`product-${index}`}
                        name="Product Name"
                        description="Product Description"
                        commentCount={1000}
                        viewCount={1000}
                        upvoteCount={1000}
                    />
                ))}
            </div>
            <ProductPagination totalPages={10} />
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