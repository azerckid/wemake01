import { ChevronUpIcon, StarIcon } from "lucide-react";
import { Link, NavLink, Outlet } from "react-router";
import { Button, buttonVariants } from "~/common/components/ui/button";
import { cn } from "~/lib/utils";
import type { Route } from "./+types/product-overview-layout";
import { getProductById } from "../queries";

export function meta({ data }: Route.MetaArgs) {
    return [
        { title: `${data.product.name} Overview | wemake` },
        { name: "description", content: data.product.description },
    ];
}

export async function loader({ params }: Route.LoaderArgs & { params: { productId: string } }) {
    const product = await getProductById(params.productId);
    return {
        product
    };
}

export default function ProductOverviewLayout({ loaderData }: Route.ComponentProps) {
    if (!loaderData) return null;
    const { product } = loaderData;
    return (
        <div className="space-y-10">
            <div className="flex justify-between">
                <div className="flex gap-10">
                    <div className="size-40 rounded-xl shadow-xl bg-primary/50">
                    </div>
                    <div>
                        <h1 className="text-5xl font-bold">{product.name}</h1>
                        <p>Product ID: 1</p>
                        <p className="text-2xl font-light text-muted-foreground">{product.description}</p>
                        <div className="mt-5 flex items-center gap-5">
                            <div className="flex gap-2">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <StarIcon
                                        key={i}
                                        className="size-4 text-yellow-500"
                                        fill={
                                            i < Math.floor(product.average_rating)
                                                ? "currentColor"
                                                : "none"
                                        }
                                    />
                                ))}
                            </div>
                            <span className="text-muted-foreground">{product.reviews} reviews</span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" size="lg" className="text-lg h-14 px-10" asChild>
                        <Link to={`/products/${loaderData.product.product_id}/visit`}>
                            Visit Website
                        </Link>
                    </Button>
                    <Button variant="outline" size="lg" className="text-lg h-14 px-10">
                        <ChevronUpIcon className="w-4 h-4" />
                        Upvote ({product.upvotes})
                    </Button>
                </div>
            </div>
            <div className="flex gap-2">
                <Button variant="outline" >
                    <NavLink to={`/products/${product.product_id}/overview`} className={({ isActive }) => isActive ? cn(buttonVariants({ variant: "ghost" }), "text-pink-500 font-bold") : ""}>Overview</NavLink>
                </Button>
                <Button variant="outline" >
                    <NavLink to={`/products/${product.product_id}/reviews`} className={({ isActive }) => isActive ? cn(buttonVariants({ variant: "ghost" }), "text-pink-500 font-bold") : ""}>Reviews</NavLink>
                </Button>
            </div>
            <Outlet context={{
                productId: product.product_id,
                description: product.description,
                how_it_works: product.how_it_works,
                review_count: product.reviews,
            }} />
        </div>
    );
}