import type { Route } from "~/+types/products/categories";
import { ProductCard } from "../components/product-card";
import { Button } from "~/common/components/ui/button";
import { Link } from "react-router";

export default function CategoryPage() {
    return (
        <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Category Products</h1>
                    <p className="text-muted-foreground">Browse products in this category</p>
                </div>
                <Button asChild variant="outline">
                    <Link to="/products/categories">Back to Categories</Link>
                </Button>
            </div>

            <div className="grid grid-cols-3 gap-4">
                {Array.from({ length: 10 }).map((_, index) => (
                    <ProductCard
                        key={index}
                        id={`product-${index}`}
                        name="Product Name"
                        description="Product in this category"
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
        { title: "Category | Products | wemake" },
        { name: "description", content: "Products in this category" }
    ];
}; 