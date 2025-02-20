import type { Route } from "~/+types/products/categories";
import { ProductCard } from "../components/product-card";
import { Button } from "~/common/components/ui/button";
import { Link, useParams } from "react-router";
import { Hero } from "~/common/components/hero";
import ProductPagination from "~/common/components/product-pagination";

export default function CategoryPage() {
    const { category } = useParams();
    return (
        <div className="space-y-10">
            <Hero title={`Category ${category}`} description={`Products in the ${category} category`} />
            <Button asChild variant="outline">
                <Link to="/products/categories">Back to Categories</Link>
            </Button>

            <div className="space-y-5 w-full max-w-screen-lg mx-auto">
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
            <ProductPagination totalPages={10} />
        </div>
    );
}

export const meta: Route.MetaFunction = ({ params }) => {
    return [
        { title: `Category ${params.category} | ProductHunt Clone` },
        { name: "description", content: `Products in the ${params.category} category` }
    ];
}; 