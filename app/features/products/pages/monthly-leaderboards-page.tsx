import { DateTime } from "luxon";
import { data, isRouteErrorResponse } from "react-router";
import type { Route } from "~/+types/products/leaderboards";
import { z } from "zod";
import { Hero } from "~/common/components/hero";
import { ProductCard } from "../components/product-card";
import { Button } from "~/common/components/ui/button";
import { Link } from "react-router";
import ProductPagination from "~/common/components/product-pagination";
import { getProductPagesByDateRange, getProductsByDateRange } from "../queries";
import { PAGE_SIZE } from "../contants";
import { makeSSRClient } from "~/supa-client";

const paramSchema = z.object({
    year: z.coerce.number(),
    month: z.coerce.number()
});

export const loader = async ({ params, request }: Route.LoaderArgs) => {
    const { success, data: parsedData } = paramSchema.safeParse(params);
    if (!success) {
        throw data(
            {
                message: "Invalid month",
                error_code: "INVALID_MONTH"
            },
            { status: 400 }
        );
    }

    const date = DateTime.fromObject({
        year: parsedData.year,
        month: parsedData.month
    }).setZone("Asia/Seoul");

    const today = DateTime.now().setZone("Asia/Seoul").startOf("month");

    if (!date.isValid) {
        throw data(
            {
                message: "Invalid month",
                error_code: "INVALID_MONTH"
            },
            { status: 400 }
        );
    }
    if (date > today) {
        throw data(
            {
                message: "Month is in the future",
                error_code: "FUTURE_MONTH"
            },
            { status: 400 }
        );
    }

    const { client } = makeSSRClient(request);
    const url = new URL(request.url);

    const products = await getProductsByDateRange(
        client,
        {
            startDate: date.startOf("month"),
            endDate: date.endOf("month"),
            limit: PAGE_SIZE,
            page: Number(url.searchParams.get("page") || 1),
        }
    );

    const totalPages = await getProductPagesByDateRange(
        client,
        {
            startDate: date.startOf("month"),
            endDate: date.endOf("month"),
        }
    );

    return {
        ...parsedData,
        products,
        totalPages
    };
};

export default function MonthlyLeaderboardsPage({ loaderData }: Route.ComponentProps<typeof loader>) {
    const urlDate = DateTime.fromObject({
        year: loaderData.year,
        month: loaderData.month
    }).setZone("Asia/Seoul");

    const previousMonth = urlDate.minus({ months: 1 });
    const nextMonth = urlDate.plus({ months: 1 });
    const isCurrentMonth = urlDate.month === DateTime.now().month;

    return (
        <div className="container mx-auto px-4">
            <Hero
                title="Monthly Leaderboards"
                description={`The best of month ${urlDate.startOf("month").toLocaleString(DateTime.DATE_MED)}-${urlDate.endOf("month").toLocaleString(DateTime.DATE_MED)}`}
            />
            <div className="flex items-center justify-center gap-2 mb-4">
                <Button variant="outline" asChild>
                    <Link to={`/products/leaderboards/monthly/${previousMonth.year}/${previousMonth.month}`}>
                        &larr; {previousMonth.toLocaleString({
                            month: "long",
                            year: "2-digit"
                        })}
                    </Link>
                </Button>
                {!isCurrentMonth ? (
                    <Button variant="outline" asChild>
                        <Link to={`/products/leaderboards/monthly/${nextMonth.year}/${nextMonth.month}`}>
                            {nextMonth.toLocaleString({
                                month: "long",
                                year: "2-digit"
                            })} &rarr;
                        </Link>
                    </Button>
                ) : null}
            </div>
            <div className="space-y-4 w-full max-w-screen-md mx-auto grid">
                {loaderData.products.map((product, index) => (
                    <ProductCard
                        key={product.product_id}
                        id={product.product_id}
                        name={product.name}
                        description={product.tagline}
                        reviewsCount={Number(product.reviews)}
                        viewsCount={Number(product.views)}
                        votesCount={Number(product.upvotes)}
                        upvoteCount={Number(product.upvotes)}
                    />
                ))}
            </div>

            <ProductPagination totalPages={loaderData.totalPages} />
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
        year: Number(params.year),
        month: Number(params.month)
    }).setZone("Asia/Seoul").setLocale("ko");

    console.log(data);

    return [
        {
            title: `best of month ${urlDate.toLocaleString({
                month: "long",
                year: "2-digit"
            })} | wemake`
        },
    ];
}; 