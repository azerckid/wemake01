import { DateTime } from "luxon";
import { data, isRouteErrorResponse } from "react-router";
import type { Route } from "~/+types/products/leaderboards";
import { z } from "zod";
import { Hero } from "~/common/components/hero";
import { ProductCard } from "../components/product-card";
import { Button } from "~/common/components/ui/button";
import { Link } from "react-router";
import ProductPagination from "~/common/components/product-pagination";

const paramSchema = z.object({
    year: z.coerce.number(),
    week: z.coerce.number()
});

export const loader = async ({ params }: Route.LoaderArgs) => {
    const { success, data: parsedData } = paramSchema.safeParse(params);
    if (!success) {
        throw data(
            {
                message: "Invalid week",
                error_code: "INVALID_WEEK"
            },
            { status: 400 }
        );
    }

    const date = DateTime.fromObject({
        weekYear: parsedData.year,
        weekNumber: parsedData.week
    }).setZone("Asia/Seoul");

    const today = DateTime.now().setZone("Asia/Seoul").startOf("day");

    if (!date.isValid) {
        throw data(
            {
                message: "Invalid week",
                error_code: "INVALID_WEEK"
            },
            { status: 400 }
        );
    }
    if (!success) {
        throw data(
            {
                message: "Week is in the future",
                error_code: "FUTURE_WEEK"
            },
            { status: 400 }
        );
    }
    if (date > today) {
        throw data(
            {
                message: "Week is in the future",
                error_code: "FUTURE_WEEK"
            },
            { status: 400 }
        );
    }
    return {
        ...parsedData,
    };
};

export default function WeeklyLeaderboardsPage({ loaderData }: Route.ComponentProps<typeof loader>) {
    const urlDate = DateTime.fromObject({
        weekYear: loaderData.year,
        weekNumber: loaderData.week
    }).setZone("Asia/Seoul");

    const previousWeek = urlDate.minus({ weeks: 1 });
    const nextWeek = urlDate.plus({ weeks: 1 });
    const isCurrentWeek = urlDate.weekNumber === DateTime.now().weekNumber;

    return (
        <div className="container mx-auto px-4">
            <Hero
                title="Weekly Leaderboards"
                description={`The best of week ${urlDate.startOf("week").toLocaleString(DateTime.DATE_SHORT)}-${urlDate.endOf("week").toLocaleString(DateTime.DATE_SHORT)}`}
            />
            <div className="flex items-center justify-center gap-2 mb-4">
                <Button variant="outline" asChild>
                    <Link to={`/products/leaderboards/weekly/${previousWeek.year}/${previousWeek.weekNumber}`}>
                        &larr; {previousWeek.toLocaleString(DateTime.DATE_MED)}
                    </Link>
                </Button>
                {!isCurrentWeek ? (
                    <Button variant="outline" asChild>
                        <Link to={`/products/leaderboards/weekly/${nextWeek.year}/${nextWeek.weekNumber}`}>
                            {nextWeek.toLocaleString(DateTime.DATE_MED)} &rarr;
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

export const meta: Route.MetaFunction = ({ params, data }) => {
    const urlDate = DateTime.fromObject({
        weekYear: Number(params.year),
        weekNumber: Number(params.week)
    }).setZone("Asia/Seoul").setLocale("ko");
    console.log(data);

    return [
        { title: `best of week ${urlDate.startOf("week").toLocaleString(DateTime.DATE_SHORT)}-${urlDate.endOf("week").toLocaleString(DateTime.DATE_SHORT)}| wemake` },
    ];
}; 