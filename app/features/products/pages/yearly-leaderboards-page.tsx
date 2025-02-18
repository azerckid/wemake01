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
    year: z.coerce.number()
});

export const loader = async ({ params }: Route.LoaderArgs) => {
    const { success, data: parsedData } = paramSchema.safeParse(params);
    if (!success) {
        throw data(
            {
                message: "Invalid year",
                error_code: "INVALID_YEAR"
            },
            { status: 400 }
        );
    }

    const date = DateTime.fromObject({
        year: parsedData.year
    }).setZone("Asia/Seoul");

    const today = DateTime.now().setZone("Asia/Seoul").startOf("year");

    if (!date.isValid) {
        throw data(
            {
                message: "Invalid year",
                error_code: "INVALID_YEAR"
            },
            { status: 400 }
        );
    }
    if (date > today) {
        throw data(
            {
                message: "Year is in the future",
                error_code: "FUTURE_YEAR"
            },
            { status: 400 }
        );
    }
    return {
        ...parsedData,
    };
};

export default function YearlyLeaderboardsPage({ loaderData }: Route.ComponentProps<typeof loader>) {
    const urlDate = DateTime.fromObject({
        year: loaderData.year
    }).setZone("Asia/Seoul");

    const previousYear = urlDate.minus({ years: 1 });
    const nextYear = urlDate.plus({ years: 1 });
    const isCurrentYear = urlDate.year === DateTime.now().year;

    return (
        <div className="container mx-auto px-4">
            <Hero
                title="The best of year Leaderboards "
                description={`${urlDate.startOf("year").toLocaleString(DateTime.DATE_MED)}-${urlDate.endOf("year").toLocaleString(DateTime.DATE_MED)}`}
            />
            <div className="flex items-center justify-center gap-2 mb-4">
                <Button variant="outline" asChild>
                    <Link to={`/products/leaderboards/yearly/${previousYear.year}`}>
                        &larr; {previousYear.toLocaleString({
                            year: "numeric"
                        })}
                    </Link>
                </Button>
                {!isCurrentYear ? (
                    <Button variant="outline" asChild>
                        <Link to={`/products/leaderboards/yearly/${nextYear.year}`}>
                            {nextYear.toLocaleString({
                                year: "numeric"
                            })} &rarr;
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
        { title: "Yearly Leaderboards | Products | wemake" },
        { name: "description", content: "Top products of the year" }
    ];
}; 