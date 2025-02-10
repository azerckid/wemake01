import type { Route } from "~/+types/products";
import { ProductCard } from "../components/product-card";
import { Button } from "~/common/components/ui/button";
import { Link } from "react-router";

export default function ProductsPage() {
    return (
        <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">All Products</h1>
                    <p className="text-muted-foreground">Discover amazing products built by our community</p>
                </div>
                <div className="flex gap-4">
                    <Button asChild variant="outline">
                        <Link to="/products/categories">Browse Categories</Link>
                    </Button>
                    <Button asChild>
                        <Link to="/products/submit">Submit Product</Link>
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
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
        </div>
    );
}

export const meta: Route.MetaFunction = () => {
    return [
        { title: "Products | wemake" },
        { name: "description", content: "Browse products made by our community" }
    ];
}; 