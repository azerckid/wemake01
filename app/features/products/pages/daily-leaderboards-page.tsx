import type { Route } from "~/+types/products/leaderboards";
import { Link } from "react-router";
import { data, isRouteErrorResponse } from "react-router";
import { DateTime } from "luxon";
import { date, z } from "zod";
import { Hero } from "~/common/components/hero";
import { ProductCard } from "../components/product-card";
import { Button } from "~/common/components/ui/button";
import ProductPagination from "~/common/components/product-pagination";
import { getProductPagesByDateRange, getProductsByDateRange } from "../queries";
import { PAGE_SIZE } from "../contants";
import { makeSSRClient } from "~/supa-client";

const paramSchema = z.object({
    year: z.coerce.number(),
    month: z.coerce.number(),
    day: z.coerce.number()
});

export const meta: Route.MetaFunction = ({ params, data }) => {
    const urlDate = DateTime.fromObject({
        year: Number(params.year),
        month: Number(params.month),
        day: Number(params.day)
    }).setZone("Asia/Seoul").setLocale("ko");
    console.log(data);

    return [
        { title: `best of ${urlDate.toLocaleString(DateTime.DATE_MED)}` },
    ];
};

export const loader = async ({ params, request }: Route.LoaderArgs) => {
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

    const { client } = makeSSRClient(request);
    const url = new URL(request.url);

    const products = await getProductsByDateRange(
        client,
        {
            startDate: date.startOf("day"),
            endDate: date.endOf("day"),
            limit: PAGE_SIZE,
            page: Number(url.searchParams.get("page") || 1),
        }
    );

    const totalPages = await getProductPagesByDateRange(
        client,
        {
            startDate: date.startOf("day"),
            endDate: date.endOf("day"),
        }
    );

    return {
        ...parsedData,
        products,
        totalPages
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

