import { DateTime } from "luxon";
import { data, isRouteErrorResponse } from "react-router";
import type { Route } from "./+types/yearly-leaderboards-page";
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
    year: z.coerce.number().int().min(2000).max(2100)
});

export const meta: Route.MetaFunction = () => {
    return [
        { title: "Yearly Leaderboards | wemake" },
        { name: "description", content: "Top products of the year" },
    ];
};

export const loader = async ({ params, request }: Route.LoaderArgs) => {
    const { client } = makeSSRClient(request);

    // 연도 파라미터 확인
    const year = params.year ? Number(params.year) : new Date().getFullYear();

    // 해당 연도의 시작일과 종료일 계산
    const startDate = DateTime.fromObject({ year, month: 1, day: 1 });
    const endDate = DateTime.fromObject({ year, month: 12, day: 31 });

    // 페이지 번호 가져오기
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page") || 1);

    // 올바른 형식으로 함수 호출
    const products = await getProductsByDateRange(client, {
        startDate,
        endDate,
        limit: PAGE_SIZE,
        page
    });

    // 총 페이지 수 계산
    const totalPages = await getProductPagesByDateRange(client, {
        startDate,
        endDate
    });

    return { products, year, totalPages };
};

export default function YearlyLeaderboardsPage({ loaderData }: Route.ComponentProps) {
    const urlDate = DateTime.fromObject({
        year: loaderData.year
    }).setZone("Asia/Seoul");

    const previousYear = urlDate.minus({ years: 1 });
    const nextYear = urlDate.plus({ years: 1 });
    const isCurrentYear = urlDate.year === DateTime.now().year;

    return (
        <div className="container mx-auto px-4">
            <Hero
                title="Yearly Leaderboards"
                description={`Top products of ${urlDate.toLocaleString({ year: 'numeric' })}`}
            />
            <div className="flex items-center justify-center gap-2 mb-4">
                <Button variant="outline" asChild>
                    <Link to={`/products/leaderboards/yearly/${previousYear.year}`}>
                        &larr; {previousYear.toLocaleString({ year: 'numeric' })}
                    </Link>
                </Button>
                {!isCurrentYear ? (
                    <Button variant="outline" asChild>
                        <Link to={`/products/leaderboards/yearly/${nextYear.year}`}>
                            {nextYear.toLocaleString({ year: 'numeric' })} &rarr;
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
                        upvoteCount={Number(product.upvotes)}
                        viewsCount={Number(product.views)}
                        reviewsCount={Number(product.reviews)}
                        votesCount={Number(product.upvotes)}
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