import { ProductCard } from "../components/product-card";
import { Button } from "~/common/components/ui/button";
import { Link, useParams } from "react-router";
import { Hero } from "~/common/components/hero";
import ProductPagination from "~/common/components/product-pagination";
import type { Route } from "./+types/category-page";
import { z } from "zod";
import {
    getCategory,
    getCategoryPages,
    getProductsByCategory,
} from "../queries";

export const meta: Route.MetaFunction = ({ params }) => {
    return [
        { title: `Category ${params.category} | ProductHunt Clone` },
        { name: "description", content: `Products in the ${params.category} category` }
    ];
};

const paramsSchema = z.object({
    category: z.coerce.number(),
});

export const loader = async ({ params, request }: Route.LoaderArgs) => {
    const url = new URL(request.url);
    const page = url.searchParams.get("page") || 1;
    const { data, success } = paramsSchema.safeParse(params);
    if (!success) {
        throw new Response("Invalid category", { status: 400 });
    }
    const category = await getCategory(data.category);
    const products = await getProductsByCategory({
        categoryId: data.category,
        page: Number(page),
    });
    const totalPages = await getCategoryPages(data.category);
    return { category, products, totalPages };
};

export default function CategoryPage({ loaderData }: Route.ComponentProps) {
    const { category } = loaderData;
    return (
        <div className="space-y-10">
            <Hero title={`Category ${category.name}`} description={`Products in the ${category.name} category`} />
            <Button asChild variant="outline">
                <Link to="/products/categories">Back to Categories</Link>
            </Button>

            <div className="space-y-5 w-full max-w-screen-lg mx-auto">
                {(loaderData?.products ?? []).map((product) => (
                    <ProductCard
                        key={product.product_id}
                        id={`product-${product.product_id}`}
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

