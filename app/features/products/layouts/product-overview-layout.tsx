import { StarIcon } from "lucide-react";
import { ChevronUpIcon } from "lucide-react";
import { Link, NavLink, Outlet } from "react-router";
import { Button, buttonVariants } from "~/common/components/ui/button";
import { cn } from "~/lib/utils";
import type { Route } from "./+types/product-overview-layout";
import { getProductById } from "../queries";
import { makeSSRClient } from "~/supa-client";
import { useEffect, useState } from "react";

export function meta({ data }: Route.MetaArgs) {
    if (!data?.product) {
        return [{ title: "Product Not Found | wemake" }];
    }
    return [
        { title: `${data.product.name} Overview | wemake` },
        { name: "description", content: "View product details and information" },
    ];
}

export const loader = async ({ params, request }: Route.LoaderArgs) => {
    const { client } = makeSSRClient(request);
    const productId = Number(params.productId);

    if (isNaN(productId)) {
        throw new Error("Invalid product ID");
    }

    const product = await getProductById(client, { productId });

    if (!product) {
        throw new Error("Product not found");
    }

    return {
        product,
        review_count: product.reviews || "0"
    };
};

export default function ProductOverviewLayout({ loaderData }: Route.ComponentProps) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!loaderData?.product) {
        return (
            <div className="container py-10">
                <h1 className="text-2xl font-bold">Product Not Found</h1>
                <p>The requested product could not be found.</p>
            </div>
        );
    }

    return (
        <div className="space-y-10">
            <div className="flex justify-between">
                <div className="flex gap-10">
                    <div className="size-40 overflow-hidden rounded-xl shadow-xl bg-primary/50 flex items-center justify-center text-4xl">
                        {loaderData.product.icon?.startsWith('http') ? (
                            <img
                                src={loaderData.product.icon}
                                alt={loaderData.product.name}
                                className="size-full object-cover"
                            />
                        ) : (
                            <span>{loaderData.product.icon || '?'}</span>
                        )}
                    </div>
                    <div>
                        <h1 className="text-5xl font-bold">{loaderData.product.name}</h1>
                        <p className="text-2xl font-light">{loaderData.product.tagline}</p>
                        <div className="mt-5 flex items-center gap-2">
                            <div className="flex text-yellow-400">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <StarIcon
                                        key={i}
                                        className="size-4"
                                        fill={
                                            i < Math.floor(loaderData.product.average_rating)
                                                ? "currentColor"
                                                : "none"
                                        }
                                    />
                                ))}
                            </div>
                            <span className="text-muted-foreground">
                                {loaderData.product.reviews} reviews
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-5">
                    <Button
                        variant="secondary"
                        size="lg"
                        className="text-lg h-14 px-10"
                    >
                        Visit Website
                    </Button>
                    <Button size="lg" className="text-lg h-14 px-10">
                        <ChevronUpIcon className="size-4" />
                        Upvote ({loaderData.product.upvotes})
                    </Button>
                </div>
            </div>
            <div className="flex gap-2.5">
                <NavLink
                    end
                    className={({ isActive }) =>
                        cn(
                            buttonVariants({ variant: "outline" }),
                            isActive && "bg-accent text-foreground"
                        )
                    }
                    to={`/products/${loaderData.product.product_id}/overview`}
                >
                    Overview
                </NavLink>
                <NavLink
                    className={({ isActive }) =>
                        cn(
                            buttonVariants({ variant: "outline" }),
                            isActive && "bg-accent text-foreground"
                        )
                    }
                    to={`/products/${loaderData.product.product_id}/reviews`}
                >
                    Reviews
                </NavLink>
            </div>
            <div>
                <Outlet
                    context={{
                        product_id: loaderData.product.product_id,
                        description: loaderData.product.description,
                        how_it_works: loaderData.product.how_it_works,
                        review_count: loaderData.review_count
                    }}
                />
            </div>
        </div>
    );
}